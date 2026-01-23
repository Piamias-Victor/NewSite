"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Negative for reverse direction, 0 for no parallax
  offset?: number; // Starting offset
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.5,
  offset = 0,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset - speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
