/** @format */
import Sentiment from "sentiment";
import { SentimentAnalysisResult } from "@/types";

export const analyzeSentiment = (text: string): SentimentAnalysisResult => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  let sentimentCategory: "GOOD" | "BAD" | "NEUTRAL";

  if (result.score > 0) {
    sentimentCategory = "GOOD";
  } else if (result.score < 0) {
    sentimentCategory = "BAD";
  } else {
    sentimentCategory = "NEUTRAL";
  }

  return {
    sentiment: sentimentCategory,
    score: result.score,
  };
};
