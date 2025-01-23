"use client";

import InputWithHeader from "@/components/InputWithHeader";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";
import { signUp } from "@/actions/auth";
import { useRouter } from "next/navigation";

const page = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if all fields are filled
  const isFormComplete =
    name.trim() && password.trim() && confirmPassword.trim();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    try {
      const res = await signUp({ name, password });
      console.log(res);
      setLoading(false);
      toast.success("Sign-up Successful!");
      router.push("/signin");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full sm:px-20 flex items-center justify-center sm:justify-start flex-1 h-full'>
      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col gap-4 justify-center items-center md:w-[40%] h-[85%] bg-earth_yellow rounded-xl'
      >
        <InputWithHeader
          width='w-[75%] '
          val={name}
          setValue={setName}
          title='Name'
          required={true}
        />
        <InputWithHeader
          width='w-[75%] '
          val={password}
          setValue={setPassword}
          title='Password'
          password={true}
          required={true}
        />
        <InputWithHeader
          width='w-[75%] '
          val={confirmPassword}
          setValue={setConfirmPassword}
          title='Confirm Password'
          password={true}
          required={true}
        />
        {passwordError && (
          <p className='text-red-500 text-sm w-[75%] text-left'>
            {passwordError}
          </p>
        )}
        <button
          style={{
            opacity: isFormComplete ? 1 : 0.8,
            pointerEvents: isFormComplete ? "auto" : "none",
          }}
          type='submit'
          disabled={loading}
          className='text-sm disabled:cursor-not-allowed active:scale-95 hover:rounded-lg transition-all w-[75%] bg-moss_green h-[55px] text-cornsilk flex items-center justify-center'
        >
          {loading ? <PuffLoader size={24} color='white' /> : "Sign up"}
        </button>
        <p className='text-base text-pakistan_green'>
          Already have an account?{" "}
          <Link href={"/auth/signin"} className='text-app_blue underline '>
            Login
          </Link>
        </p>
      </form>
      <div className='flex flex-1 justify-end'>
        <motion.h2
          className='text-5xl items-start w-max font-semibold leading-loose flex flex-col'
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
            Welcome!!
          </motion.span>
          <motion.span
            className='text-moss_green'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join to Contribute
          </motion.span>
          <motion.span
            className='text-app_blue'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Your Valuable Feedback
          </motion.span>
        </motion.h2>
      </div>
    </div>
  );
};

export default page;
