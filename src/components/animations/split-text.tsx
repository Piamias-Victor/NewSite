"use client";

import React from "react";
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
  as?: React.ElementType;
}

export function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.4,
  stagger = 0.03,
  as: Component = "div",
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

  // Map common tags to stable motion components to avoid recreation during render and any-types
  const MotionComponent = 
    Component === "h1" ? motion.h1 :
    Component === "h2" ? motion.h2 :
    Component === "h3" ? motion.h3 :
    Component === "span" ? motion.span :
    motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn("block wrap-break-word max-w-full", className)}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="select-none pointer-events-none">
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={charVariants}
            className="inline-block"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </MotionComponent>
  );
}
