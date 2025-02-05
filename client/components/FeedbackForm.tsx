"use client";

import { createFeedback } from "@/actions/feedback";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loading = toast.loading("Sending..");

    try {
      const response = await createFeedback({ text: feedback });

      if (response == 201) {
        setFeedback("");
        toast.success("Sent Successfully!!", { id: loading });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-8'>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        maxLength={1000}
        className={`w-full text-pakistan_green font-medium p-4 sm:text-lg border focus:outline-none focus:ring ${
          feedback.length >= 1000
            ? "focus:ring-red-500"
            : " focus:ring-pakistan_green"
        } rounded-lg shadow-sm resize-none h-32`}
        placeholder='Share your thoughts about our product...'
        required
      />
      <div className='mt-2 flex justify-between items-center'>
        <span
          className={`text-sm ${
            feedback.length >= 1000
              ? "text-red-500 animate-bounce"
              : " text-pakistan_green dark:text-cornsilk"
          }`}
        >
          {feedback.length}/1000 characters
        </span>
        <button
          type='submit'
          disabled={isSubmitting || feedback.length > 1000}
          className='bg-blue-500 text-cornsilk px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50'
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
