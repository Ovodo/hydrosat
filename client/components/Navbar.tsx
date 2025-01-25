"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Web3 from "web3";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const logout = async () => {
    setAddress(null);
    toast.error("Disconnected", { duration: 1000 });
  };

  const login = async () => {
    const loading = toast.loading("Connecting");
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        toast.success("Connected", { id: loading });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message ===
          "Cannot read properties of undefind (reading `request`)"
        ) {
          console.log(error.message);
          toast.error("No wallet found", { id: loading });
        } else {
          toast.error(error.message, { id: loading });
        }
      } else {
        toast.error("An unexpected error occured", { id: loading });
      }
    }
  };

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    setWeb3(web3);
  }, []);
  return (
    <div className='w-[95vw] h-[11vh] flex items-center justify-between border-b border-pakistan_green dark:border-cornsilk/70 self-center mx-[3vw]'>
      <Link
        href={"/"}
        className='text-pakistan_green gap-[0.2px] flex w-max items-center font-semibold'
      >
        <span className='key'>H</span>
        <span className='key'>y</span>
        <span className='key text-black dark:text-cornsilk/80'>d</span>
        <span className='key'>r</span>
        <span className='key'>o</span>
        <span className='text-moss_green key'>S</span>
        <span className='text-moss_green key'>a</span>
        <span className='text-moss_green key'>t</span>
      </Link>
      <AnimatePresence mode='wait'>
        {address && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 1 }}
            className='text-pakistan_green text-sm lg:text-lg tracking-wide font-medium'
          >
            {address}
          </motion.p>
        )}
      </AnimatePresence>
      <button
        onClick={address ? logout : login}
        className='w-[11vw] hidden lg:block h-[6.5vh] hover:bg-opacity-70 duration-200 active:scale-95 rounded-full text-cornsilk font-medium bg-pakistan_green'
      >
        {address ? "Connected" : "Connect wallet"}
      </button>
      <button
        onClick={address ? logout : login}
        className='w-[25vw] sm:w-[17vw] lg:hidden h-[6vh] text-sm hover:bg-opacity-70 duration-200 active:scale-95 rounded-full text-cornsilk font-medium bg-pakistan_green'
      >
        {address ? "Connected" : "Connect"}
      </button>
    </div>
  );
};

export default Navbar;
