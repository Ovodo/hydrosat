"use client";

import { FeedbackType } from "@/types";
import { ChangeEvent, useState } from "react";

// Client-side component for filtering
export default function SentimentFilter({
  feedbackList,
  setFeedbackList,
}: {
  feedbackList: FeedbackType[];
  setFeedbackList: (e: FeedbackType[]) => void;
}) {
  const [filter, setFilter] = useState("ALL");

  const filterList = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    const items =
      e.target.value === "ALL"
        ? feedbackList
        : feedbackList.filter((item) => item.sentiment == e.target.value);
    setFeedbackList(items);
    console.log(e.target.value);
  };

  return (
    <div className='flex items-center space-x-2'>
      <select
        value={filter}
        onInput={filterList}
        className='px-2 py-1 border rounded'
      >
        <option value='ALL'>All Sentiments</option>
        <option value='GOOD'>Good</option>
        <option value='NEUTRAL'>Neutral</option>
        <option value='BAD'>Bad</option>
      </select>
    </div>
  );
}
