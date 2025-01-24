/** @format */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authService } from "../services";
import { error } from "console";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    res.status(401).json({ error: "Authentication required!" });
    return;
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;

    const user = await authService.getUser({ name: decoded.username });

    if (!user) throw "User Not Found!";
    req.body.user = user;
    next();
  } catch (err: any) {
    res.status(401).json({ error: "Invalid token", message: err.message });
  }
};
