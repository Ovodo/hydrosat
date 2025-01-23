"use client";
import { AnimatePresence } from "framer-motion";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode='wait' initial={false}>
      {children}
    </AnimatePresence>
  );
};

export default LayoutProvider;
