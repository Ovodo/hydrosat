"use client";

import InputWithHeader from "@/components/InputWithHeader";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";

const page = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Check if all fields are filled
  const isFormComplete =
    name.trim() && password.trim() && confirmPassword.trim();

  const handleSubmit = () => {
    // Reset the error message
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return; // Prevent submission if passwords don't match
    }

    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading
      toast.success("Sign-up Successful!");
    }, 2000);
  };

  return (
    <div className='w-full sm:px-20 flex items-center justify-center sm:justify-start flex-1 h-full'>
      <div className='w-full flex flex-col gap-4 justify-center items-center md:w-[40%] h-[85%] bg-earth_yellow rounded-xl'>
        <InputWithHeader
          width='w-[75%] '
          val={name}
          setValue={setName}
          title='Name'
        />
        <InputWithHeader
          width='w-[75%] '
          val={password}
          setValue={setPassword}
          title='Password'
          password={true}
        />
        <InputWithHeader
          width='w-[75%] '
          val={confirmPassword}
          setValue={setConfirmPassword}
          title='Confirm Password'
          password={true}
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
          onClick={handleSubmit}
          disabled={loading}
          className='text-sm disabled:cursor-not-allowed active:scale-95 hover:rounded-lg transition-all w-[75%] bg-moss_green h-[55px] text-cornsilk flex items-center justify-center'
        >
          {loading ? <PuffLoader size={24} color='white' /> : "Sign up"}
        </button>
        <p className='text-sm text-pakistan_green'>
          Already have an account?{" "}
          <Link href={"/"} className='text-[#F25F5C] underline '>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
