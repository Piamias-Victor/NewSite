"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn, SplitText, TypingEffect, MagneticButton } from "@/components/animations";
import { GradientMesh } from "@/components/backgrounds";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Dynamic Background */}
      <GradientMesh />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex flex-col items-center px-4 text-center md:px-6"
      >
        <FadeIn delay={0.1}>
          <div className="mb-6 inline-flex items-center">
            <span className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.3em] text-accent">
              PHARDEV
            </span>
          </div>
        </FadeIn>

        {/* Color Inheritance Wrapper - Solves Dark Mode Specificity Issues */}
        <div className="mb-6 max-w-5xl text-white [.light_&]:text-black transition-colors duration-300">
          <SplitText
            text="L'Intelligence Officinale"
            className="text-display font-display font-bold leading-tight tracking-tight text-5xl md:text-7xl lg:text-8xl pb-4"
            stagger={0.05}
          />
        </div>

        <FadeIn delay={0.4} className="mb-8 max-w-2xl">
          <div className="text-xl text-muted-foreground md:text-2xl h-14 md:h-auto">
            Des solutions technologiques pour{" "}
            <TypingEffect
              text={[
                "moderniser l'officine.",
                "optimiser votre logistique.",
                "gagner du temps.",
                "booster vos ventes.",
              ]}
              className="text-foreground font-semibold"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-center">
            <MagneticButton>
              <Button size="xl" variant="gradient" className="rounded-full shadow-glow group">
                Découvrir nos solutions
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button size="xl" variant="glass" className="rounded-full">
                Demander une démo
              </Button>
            </MagneticButton>
          </div>
        </FadeIn>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground/50" />
      </motion.div>
    </section>
  );
}
