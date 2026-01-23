"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps extends HTMLMotionProps<"div"> {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.4,
  stagger = 0.03,
  ...props
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const chars = text.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      y: 20,
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn("block break-words max-w-full", className)} // Changed to block to respect parent width
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="select-none pointer-events-none">
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={charVariants}
            className="inline-block"
            style={{ whiteSpace: "pre-wrap" }} // Preserve spaces but allow wrap
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.div>
  );
}
