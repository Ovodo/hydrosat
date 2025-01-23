import Link from "next/link";

export default function NotFound() {
  return (
    <div className='w-full h-full gap-4 items-center justify-center flex flex-col'>
      <h2 className='text-3xl font-semibold text-moss_green'>Not Found</h2>
      <p className='text-lg text-pakistan_green font-medium'>
        Could not find requested resource
      </p>
      <Link
        className='w-max px-[2vw] py-[1vh] rounded-lg bg-app_orange hover:bg-earth_yellow'
        href='/auth/signin'
      >
        Return Home
      </Link>
    </div>
  );
}
