"use client";
import { useState } from "react";
import SentimentFilter from "./SentimentFilter";
import { FeedbackType } from "@/types";

const Feedbacks = ({ feedbacks }: { feedbacks: FeedbackType[] }) => {
  const [feedbackList, setFeedbackList] = useState(feedbacks);
  return (
    <div className='flex flex-1 pb-4 flex-col'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-pakistan_green text-center mb-4'>
          Feedback Dashboard
        </h1>
        <SentimentFilter
          setFeedbackList={setFeedbackList}
          feedbackList={feedbacks}
        />
      </div>
      <div className='flex flex-col h-[70vh] space-y-4 overflow-y-scroll'>
        {feedbackList.map((item: FeedbackType) => (
          <div key={item.uuid} className='bg-white p-4 rounded-lg shadow'>
            <p className='mb-2'>{item.text}</p>
            <div className='flex justify-between text-sm text-gray-500'>
              <span>Sentiment: {item.sentiment}</span>
              <span>Score: {item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
