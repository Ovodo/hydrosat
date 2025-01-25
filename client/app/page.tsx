import { signOut } from "@/actions/auth";
import { getFeedbacks } from "@/actions/feedback";
import FeedbackForm from "@/components/FeedbackForm";
import Feedbacks from "@/components/Feedbacks";
import { decrypt } from "@/lib/session";

export default async function Home() {
  const user = JSON.parse(((await decrypt()) as string) ?? "");
  const isAdmin = user?.isAdmin;
  const feedbackList = isAdmin ? await getFeedbacks() : [];

  return (
    <div className='flex-1 relative flex flex-col py-4  px-4 sm:px-6 lg:px-8'>
      <div className='h-[88%]   lg:h-[98%]'>
        {!isAdmin && (
          <div className='max-w-3xl w-[75vw] lg:w-[60vw]  mx-auto'>
            <h1 className='text-3xl font-bold dark:text-cornsilk tracking-wide text-pakistan_green text-center mb-8'>
              Product Feedback
            </h1>
            <FeedbackForm />
          </div>
        )}
        {isAdmin && <Feedbacks feedbacks={feedbackList} />}
      </div>
      <div className='flex w-full items-center  justify-between'>
        <p className='text-moss_green text-xs lg:text-sm font-medium '>
          {`Welcome back ${user?.name}, kindly drop your feedback.`}
        </p>
        <button
          onClick={signOut}
          className='hover:bg-earth_yellow active:scale-95 text-sm md:text-base  text-cornsilk px-4 py-2 rounded-lg bg-app_orange disabled:opacity-50'
        >
          {"Log out"}
        </button>
      </div>
    </div>
  );
}
