"use client";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 1, y: 0 },
  enter: { opacity: 1, y: 0 },
};

export default function Template({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}
