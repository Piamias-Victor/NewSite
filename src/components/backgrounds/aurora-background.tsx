"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AuroraBackground({
  className,
  children,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-screen items-center justify-center bg-zinc-950 text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora Effect Container */}
        <div
          className={cn(
            // Base styles
            "filter blur-[60px] opacity-50",
            "absolute -inset-[10px] top-0",
            // Animations
            "[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]",
            "[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]",
            "[--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--secondary)_15%,var(--accent)_20%,var(--secondary)_25%,var(--primary)_30%)]",
            "[background-image:var(--dark-gradient),var(--aurora)]",
            "bg-size-[300%_200%]",
            "bg-position-[50%_50%,50%_50%]",
            "after:content-[''] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)]",
            "after:bg-size-[200%_100%] after:animate-aurora after:bg-fixed after:mix-blend-difference",
            "pointer-events-none"
          )}
        ></div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        {/* Moving Orbs/Glows using Framer Motion (No SSR issues as exact initial/animate values are deterministic or handled by client) */}
        <motion.div
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ 
                opacity: [0.3, 0.5, 0.3], 
                scale: [0.8, 1.1, 0.8],
                x: [0, 50, 0],
                y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ 
                opacity: [0.2, 0.4, 0.2], 
                scale: [0.8, 1.2, 0.8],
                x: [0, -40, 0],
                y: [0, 40, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[10%] h-[600px] w-[600px] rounded-full bg-accent/10 blur-[130px]"
        />
      </div>

      {children}
    </div>
  );
}
