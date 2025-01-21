import { feedbackController } from "@/controllers";
import { Router } from "express";
import { authMiddleware } from "@/middlewares";

export const feedbackRouter = Router();

feedbackRouter.use(authMiddleware);

feedbackRouter.post("/feedback", feedbackController.createFeedback);
feedbackRouter.get("/feedback/:userUuid", feedbackController.getUserFeedback);
feedbackRouter.get("/feedback", feedbackController.getFeedback);
