"use client";

import { Container, Section } from "@/components/layout";
import { FadeIn } from "@/components/animations";
import { motion } from "framer-motion";

const PARTNERS = [
  { name: "Pharmabest", logo: "/pharmabest.jpg" },
  { name: "Apothical", logo: "/apothical.jpeg" },
  { name: "Winpharma", logo: "/winpharma.jpeg" },
  { name: "LGPI", logo: "/LGPI.jpg" },
  { name: "Pharmaland", logo: "/pharmaland_lsi_logo.jpeg" },
  { name: "Smart RX", logo: "/smartRx.png" },
  { name: "Pharmony", logo: "/pharmony.jpeg" },
  { name: "MediJob", logo: "/medijob.png" },
];

export function PartnersMarquee() {
  // Doubling for seamless loop - 2 sets are enough for 0% to -50% animation
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <Section id="partners" className="relative z-10 w-full pt-16 pb-0 border-t border-white/5 overflow-hidden">
      <Container>
        <div className="mb-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold adaptive-text-primary mb-4">
              Ils nous font <span className="text-gradient">confiance</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="adaptive-text-description text-lg md:text-xl font-light max-w-2xl mx-auto">
              Phardev accompagne les acteurs majeurs et les groupements de l&apos;officine.
            </p>
          </FadeIn>
        </div>
      </Container>

      <div className="relative w-full overflow-hidden py-8">
        {/* Gradient Overlays for smooth edges - Pure background for seamless blend */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex whitespace-nowrap min-w-max pb-2 gap-8 md:gap-12 px-4 md:px-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25, // Speed adjusted for 2 sets
              ease: "linear",
            },
          }}
        >
          {marqueeItems.map((partner, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center group"
            >
              <div className="relative h-20 w-44 rounded-xl bento-card-bg border border-white/5 flex items-center justify-center p-5 transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30 group-hover:shadow-glow-sm cursor-pointer">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full w-auto object-contain pointer-events-none grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Spacing optimization: removed separator and reduced bottom margin */}
    </Section>
  );
}

