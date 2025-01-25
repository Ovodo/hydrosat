"use client";

import InputWithHeader from "@/components/InputWithHeader";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";
import { signIn } from "@/actions/auth";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Check if all fields are filled
  const isFormComplete = name.trim() && password.trim();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true); // Start loading
    try {
      const res = await signIn({ name, password });
      if (res.ok) {
        toast.success("Sign-in Successful!");
        window.location.href = "/";
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(res.message ?? "An unexpected error occurred");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  return (
    <div className='w-full  max-w-screen   overflow-hidden gap-14 lg:gap-52 sm:px-20 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-start flex-1 h-full'>
      <form
        onSubmit={handleSubmit}
        className='w-[90%]  flex flex-col sm:min-w-[450px] gap-4 lg:gap-6 justify-center items-center lg:w-[40%] h-max py-8 sm:py-10 lg:py-16 bg-earth_yellow rounded-md sm:rounded-xl'
      >
        <InputWithHeader
          width='w-[85%] sm:w-[75%] '
          val={name}
          setValue={setName}
          title='Name'
          required={true}
        />
        <InputWithHeader
          width='w-[85%] sm:w-[75%] '
          val={password}
          setValue={setPassword}
          title='Password'
          password={true}
          required={true}
        />
        <button
          style={{
            opacity: isFormComplete ? 1 : 0.8,
            pointerEvents: isFormComplete ? "auto" : "none",
          }}
          type='submit'
          disabled={!isFormComplete || loading}
          className='text-base sm:rounded-none rounded-md disabled:cursor-not-allowed active:scale-95 sm:hover:rounded-lg transition-all w-[85%] sm:w-[75%] bg-moss_green h-[55px] text-cornsilk flex items-center justify-center'
        >
          {loading ? <PuffLoader size={24} color='white' /> : "Login"}
        </button>
        <p className='text-base text-pakistan_green'>
          Dont have an account?{" "}
          <Link href={"/auth/signup"} className='text-app_blue underline '>
            Signup
          </Link>
        </p>
      </form>
      <div className='flex lg:flex-1 h-max'>
        <motion.h2
          className='text-2xl sm:text-3xl sm:gap-2 md:gap-6 lg:text-5xl items-center h-max lg:items-start w-max font-semibold leading-loose flex flex-col'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className='text-pakistan_green'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome Back!!
          </motion.span>
          <motion.span
            className='text-moss_green'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Login to Continue
          </motion.span>
          <motion.span
            className='text-app_blue break-words'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Dropping Valuable Feedback
          </motion.span>
        </motion.h2>
      </div>
    </div>
  );
};

export default Page;
