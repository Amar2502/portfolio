"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FloatingHomeButton() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile for responsive sizing
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Don't show the button on the home page
  if (pathname === "/") {
    return null;
  }

  return (
    <Link href={"/"}>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            className={`flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
              isMobile ? "w-12 h-12" : "w-14 h-14"
            }`}
            aria-label="Back to home"
          >
            <Home className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
          </button>

          {/* Pulsing effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400 dark:bg-blue-300 opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}
