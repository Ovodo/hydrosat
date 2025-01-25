"use client";
import { useState } from "react";
import SentimentFilter from "./SentimentFilter";
import { FeedbackType } from "@/types";

const Feedbacks = ({ feedbacks }: { feedbacks: FeedbackType[] }) => {
  const [feedbackList, setFeedbackList] = useState(feedbacks);
  return (
    <div className='flex flex-1 flex-col mb-1'>
      <div className='flex justify-between  mb-4 items-center'>
        <h1 className='text-xl lg:text-3xl font-bold text-pakistan_green dark:text-cornsilk tracking-wide text-center'>
          Feedback Dashboard
        </h1>
        <SentimentFilter
          setFeedbackList={setFeedbackList}
          feedbackList={feedbacks}
        />
      </div>
      <div className='flex flex-col h-[68vh] lg:h-[75vh]  space-y-4 overflow-y-scroll'>
        {feedbackList.map((item: FeedbackType) => (
          <div
            key={item.uuid}
            className='bg-white dark:bg-moss_green/50 p-4 max-w-full rounded-lg shadow'
          >
            <p className='mb-2 max-w-full  break-words h-auto w-full'>
              {item.text}
            </p>
            <div className='flex justify-between text-sm '>
              <span className='w-[200px] text-center'>
                Sentiment: {item.sentiment}
              </span>
              <span className='w-[200px] text-center'>
                user: {item.user.name}
              </span>
              <span className='w-[200px] text-center'>Score: {item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
