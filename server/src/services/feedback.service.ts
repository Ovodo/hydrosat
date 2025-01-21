/** @format */
import { FeedbackEntity } from "@/entities";
import { AppDataSource } from "@/setup/datasource";
import { CreateFeedbackRequestType } from "@/types";
import { analyzeSentiment } from "@/utils";

export const createFeedback = async ({
  text,
  userUuid,
}: CreateFeedbackRequestType): Promise<FeedbackEntity> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);

  // Analyze sentiment
  const { sentiment, score } = analyzeSentiment(text);

  const newFeedback = new FeedbackEntity();
  Object.assign(newFeedback, {
    text,
    userUuid,
    sentiment,
    score,
  });

  return await feedbackRepository.save(newFeedback);
};

export const getFeedback = async ({ userUuid }): Promise<FeedbackEntity[]> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
  return await feedbackRepository.find({
    where: { userUuid },
    relations: ["user"],
    order: { createdAt: "DESC" },
  });
};

export const getAllFeedback = async (): Promise<FeedbackEntity[]> => {
  const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
  return await feedbackRepository.find({
    relations: ["user"],
    order: { createdAt: "DESC" },
  });
};
