"use client";
import { useState } from "react";
import SentimentFilter from "./SentimentFilter";

const Feedbacks = ({ feedbacks }: { feedbacks: any[] }) => {
  const [feedbackList, setFeedbackList] = useState(feedbacks);
  console.log(feedbackList);
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
        {feedbackList.concat(feedbackList).map((item: any, index) => (
          <div
            key={index.toString()}
            className='bg-white p-4 rounded-lg shadow'
          >
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
