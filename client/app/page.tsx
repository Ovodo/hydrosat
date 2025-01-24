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
    <div className='flex-1 relative flex flex-col py-12 px-4 sm:px-6 lg:px-8'>
      <p className='text-moss_green font-medium absolute bottom-5 left-[2.5vw]'>
        {`Welcome back ${user?.username}, kindly drop your feedback.`}
      </p>
      <button
        onClick={signOut}
        className='hover:bg-earth_yellow active:scale-95 absolute bottom-5 right-[2.5vw] text-cornsilk px-4 py-2 rounded-lg bg-app_orange disabled:opacity-50'
      >
        {"Log out"}
      </button>
      {!isAdmin && (
        <div className='max-w-3xl w-[60vw]  mx-auto'>
          <h1 className='text-3xl font-bold text-pakistan_green text-center mb-8'>
            Product Feedback
          </h1>
          <FeedbackForm />
        </div>
      )}
      {isAdmin && <Feedbacks feedbacks={feedbackList} />}
    </div>
  );
}
