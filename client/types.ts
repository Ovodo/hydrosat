export type FeedbackType = {
  uuid?: string;
  text: string;
  sentiment: string;
  score: number;
  user: { name: string };
};
