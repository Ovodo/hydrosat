/** @format */
import Sentiment from "sentiment";
import { SentimentAnalysisResult } from "../types";

export const analyzeSentiment = (text: string): SentimentAnalysisResult => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  let sentimentCategory: "GOOD" | "BAD" | "NEUTRAL";

  if (result.score === 0) {
    sentimentCategory = "NEUTRAL";
  } else if (result.score <= 2) {
    sentimentCategory = "BAD";
  } else if (result.score > 2) {
    sentimentCategory = "GOOD";
  }

  return {
    sentiment: sentimentCategory,
    score: result.score,
  };
};
