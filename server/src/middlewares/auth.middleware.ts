/** @format */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authService } from "@/services";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Authentication required!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    console.log("decoded_token", decoded);

    const user = await authService.getUser({ name: decoded.username });
    console.log(user);

    if (!user) throw "User Not Found!";
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};
