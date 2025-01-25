/** @format */

import { authService } from "../services";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { errorHandlerWrapper } from "../utils";

const signUpHandler = async (req: Request, res: Response) => {
  const { name, password, role } = req.body;

  if (!name || !password) {
    res.status(400).json({ ok: false, message: "Incomplete Credentials" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authService.createUser({
    name,
    hashedPassword,
    role,
  });

  if (newUser) {
    res.status(201).json({ ok: true, data: newUser });
  } else {
    res.status(409).json({ ok: false, message: "User already exists" });
  }
};

const signInHandler = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const user = await authService.getUser({ name });

  if (!user) {
    res.status(409).json({ ok: false, message: "User not found" });
    return;
  }

  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    res.status(401).json({ ok: false, message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({
    ok: true,
    token: token,
    isAdmin: user.role === "admin",
    name: user.name,
  });
};

export const signUp = errorHandlerWrapper(signUpHandler);
export const signIn = errorHandlerWrapper(signInHandler);
