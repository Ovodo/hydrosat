/** @format */
import { feedbackService, authService } from "@/services";
import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import jwt from "jsonwebtoken";

// Middleware to check if user is admin
const assertAdmin = async (req: Request, res: Response, next: Function) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
  const user = await authService.getUser({ name: decoded.username });

  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  next();
};

const createFeedbackHandler = async (req: Request, res: Response) => {
  const { text } = req.body;
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
  const user = await authService.getUser({ name: decoded.username });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  // Basic validation
  if (!text || text.length > 1000) {
    res
      .status(400)
      .json({ message: "Text must be between 1 and 1000 characters" });
    return;
  }

  const newFeedback = await feedbackService.createFeedback({
    text,
    userUuid: user.uuid,
  });

  if (newFeedback) {
    res.status(201).json(newFeedback);
  } else {
    res.status(500).json({ message: "Failed to create feedback" });
  }
};

const getFeedbackHandler = async (req: Request, res: Response) => {
  // Only admins can access this endpoint, already checked by assertAdmin middleware
  const allFeedback = await feedbackService.getAllFeedback();
  res.status(200).json(allFeedback);
};

// For users to get their own feedback
const getUserFeedbackHandler = async (req: Request, res: Response) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
  const user = await authService.getUser({ name: decoded.username });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  const feedbackList = await feedbackService.getFeedback({
    userUuid: user.uuid,
  });
  res.status(200).json(feedbackList);
};

export const createFeedback = errorHandlerWrapper(createFeedbackHandler);
export const getFeedback = [
  assertAdmin,
  errorHandlerWrapper(getFeedbackHandler),
];
export const getUserFeedback = errorHandlerWrapper(getUserFeedbackHandler);
