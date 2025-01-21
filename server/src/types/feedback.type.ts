/** @format */
export type CreateFeedbackRequestType = {
  uuid?: string;
  text: string;
  userUuid: string;
};

export type SentimentAnalysisResult = {
  sentiment: "GOOD" | "BAD" | "NEUTRAL";
  score: number;
};
