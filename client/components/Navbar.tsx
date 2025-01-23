"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Web3 from "web3";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
      await (window as any).ethereum.enable();
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        toast.success("Connected", { id: loading });
      }
    } catch (error: any) {
      if (error.message === "User denied account authorization") {
        console.log(error.message);
        toast.error("Not Connected", { id: loading });

        // handle the case where the user denied the connection request
      } else if (error.message === "MetaMask is not enabled") {
        // handle the case where MetaMask is not available
        console.log(error.message);
        toast.error("Not Connected", { id: loading });
      } else {
        console.log(error.message);
        toast.error("Not Connected", { id: loading });
        // handle other errors
      }
    }
  };

  useEffect(() => {
    const web3 = new Web3((window as any).ethereum);
    setWeb3(web3);
  }, []);
  return (
    <div className='w-[95vw] h-[11vh] flex items-center justify-between border-b border-pakistan_green self-center mx-[3vw]'>
      <Link
        href={"/"}
        className='text-pakistan_green flex w-max items-center font-semibold'
      >
        <span className='key'>H</span>
        <span className='key'>y</span>
        <span className='key text-black'>d</span>
        <span className='key'>r</span>
        <span className='key'>o</span>
        <span className='text-moss_green key'>S</span>
        <span className='text-moss_green key'>a</span>
        <span className='text-moss_green key'>t</span>
      </Link>
      {/* <AnimatePresence mode='wait'>
        {address && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 1 }}
            className='text-pakistan_green text-lg tracking-wide font-medium'
          >
            {address}
          </motion.p>
        )}
      </AnimatePresence> */}
      <button
        onClick={address ? logout : login}
        className='w-[11vw] h-[6.5vh] hover:bg-opacity-70 duration-200 active:scale-95 rounded-full text-cornsilk font-medium bg-pakistan_green'
      >
        {address ? "Connected" : "Connect wallet"}
      </button>
    </div>
  );
};

export default Navbar;
