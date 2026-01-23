"use client";

import { motion, useInView, type HTMLMotionProps, type Variants } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  fullWidth?: boolean;
  once?: boolean;
  threshold?: number;
  blur?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  fullWidth = false,
  once = true,
  threshold = 0.2,
  blur = false,
  ...props
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const getVariants = (): Variants => {
    const hiddenState = {
      opacity: 0,
      filter: blur ? "blur(10px)" : "blur(0px)",
      y: 0,
      x: 0,
      transition: { duration },
    };

    if (direction === "up") hiddenState.y = 40;
    if (direction === "down") hiddenState.y = -40;
    if (direction === "left") hiddenState.x = 40;
    if (direction === "right") hiddenState.x = -40;

    return {
      hidden: hiddenState,
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
