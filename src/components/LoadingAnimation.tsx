// components/LoadingAnimation.tsx
"use client";

import { motion, Variants } from "framer-motion";

export default function LoadingAnimation() {
  // Logo/letter animation variants
  const logoVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Circle animation variants
  const circleVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Path animation variants
  const pathVariants: Variants = {
    initial: {
      opacity: 0,
      pathLength: 0
    },
    animate: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Dots animation variants
  const dotVariants: Variants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  return (
    <div className="inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        {/* Main animated logo */}
        <motion.div
          variants={logoVariants}
          animate="animate"
          className="w-full h-full relative flex items-center justify-center"
        >
          {/* Circular path animation */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full absolute"
            initial="initial"
            animate="animate"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-primary/20"
              variants={circleVariants}
            />
            
            <motion.path
              d="M50 5 A 45 45 0 1 1 49.9 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-primary"
              variants={pathVariants}
            />
          </motion.svg>
          
          {/* Letter or icon in center */}
          <motion.div
            className="text-2xl md:text-3xl font-bold text-foreground z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            AP
          </motion.div>
        </motion.div>
      </div>
      
      {/* Loading text with animated dots */}
      <div className="mt-6 text-lg font-medium text-foreground flex items-center">
        <span>Loading</span>
        <div className="flex ml-1">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              custom={i}
              variants={dotVariants}
              initial="initial"
              animate="animate"
              className="inline-block w-1.5 h-1.5 rounded-full bg-primary mx-0.5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}