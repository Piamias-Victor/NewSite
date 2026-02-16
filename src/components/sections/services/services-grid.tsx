"use client";

import { useRef } from "react";
import { Container, Section } from "@/components/layout";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Clock, Globe, Lightbulb } from "lucide-react";
import { FadeIn, SplitText } from "@/components/animations";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], 
  });

  // Fade out as the element scrolls up out of view (imitating Hero behavior)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  return (
    <Section id="services" className="bg-transparent relative z-10 w-full" ref={ref}>
      <Container>
        <motion.div 
          style={{ opacity, y }} 
          className="mb-12 md:mb-20 max-w-4xl mx-auto text-center px-4"
        >
          <FadeIn>
            <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-4 md:mb-6 drop-shadow-2xl">
              <SplitText 
                text="Nos Solutions" 
                className="adaptive-text-primary" 
                animate={isTitleInView ? "visible" : "hidden"} 
              />
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="adaptive-text-description text-base sm:text-lg md:text-xl lg:text-2xl font-light px-4">
              L&apos;innovation technologique au service de votre officine.
            </p>
          </FadeIn>
        </motion.div>

        <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 auto-rows-auto md:auto-rows-[22rem]">
          {/* 1. STAR CARD - Custom Project (FIRST POSITION) */}
          <BentoCard
            title={
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full h-full">
                <div className="flex-1 space-y-3 md:space-y-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold bento-text-strong block">
                    On s&apos;adapte à vos besoins
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    Vous avez une vision ? Nous avons la technologie pour la réaliser. <br className="hidden md:block"/>
                    De l&apos;idée à la production, nous concevons votre outil sur-mesure.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0 mt-4 md:mt-0 relative z-20 w-full md:w-auto">
                  <a href="#contact" className="w-full sm:w-auto">
                    <Button size="lg" variant="default" className="rounded-full shadow-xl md:h-14 md:px-8 md:text-lg w-full text-sm">
                      Nous contacter
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </a>
                  <a href="/solutions" className="w-full sm:w-auto">
                    <Button size="lg" variant="glass" className="rounded-full bento-header-bg hover:bg-neutral-800 bento-text-strong border-white/10 md:h-14 md:px-8 md:text-lg w-full text-sm">
                      Besoin d&apos;inspiration ?
                    </Button>
                  </a>
                </div>
              </div>
            }
            description=""
            icon={<Lightbulb className="h-12 w-12 text-primary mb-4" />}
            header={
              <div className="absolute inset-0 z-0 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 animate-gradient bg-size-[200%_200%]" />
            }
            className="md:col-span-3 bento-card-bg shadow-lg overflow-visible relative p-8"
          />
          {/* 2. Analyse DATA */}
          <BentoCard
            title={<span className="text-xl font-bold bento-text-strong">Analyse DATA</span>}
            description="L'outil idéal pour optimiser stock et achat. Prenez les meilleures décisions basées sur vos données."
            icon={<BarChart3 className="h-8 w-8 text-primary mb-4" />}
            header={
              <div className="flex-1 w-full h-32 rounded-xl bento-header-bg relative overflow-hidden flex items-end justify-center pb-4 gap-2">
                {/* Simulated Chart */}
                <div className="w-8 bg-primary/20 rounded-t-sm h-[40%] animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-8 bg-primary/40 rounded-t-sm h-[70%] animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-8 bg-primary/60 rounded-t-sm h-[55%] animate-pulse" style={{ animationDelay: '300ms' }} />
                <div className="w-8 bg-primary rounded-t-sm h-[85%] animate-pulse" style={{ animationDelay: '450ms' }} />
                <div className="absolute top-4 right-4 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full border border-green-500/30">
                  +24%
                </div>
              </div>
            }
            className="md:col-span-1 bento-card-bg"
          />

          {/* 3. Suivi des péremptions */}
          <BentoCard
            title={<span className="text-xl font-bold bento-text-strong">Suivi des péremptions</span>}
            description="Enfin une solution durable pour gagner du temps. Réduisez vos pertes et automatisez vos contrôles."
            icon={<Clock className="h-8 w-8 text-accent mb-4" />}
            header={
              <div className="flex-1 w-full h-32 rounded-xl bento-header-bg relative overflow-hidden flex flex-col p-4 gap-2">
                {/* Simulated List Items */}
                <div className="flex items-center gap-3 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <div className="h-2 w-24 bg-red-500/20 rounded-full" />
                  <div className="ml-auto text-[10px] text-red-600 dark:text-red-500 font-mono">J-2</div>
                </div>
                <div className="flex items-center gap-3 bg-orange-500/10 p-2 rounded-lg border border-orange-500/20 opacity-60">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  <div className="h-2 w-20 bg-orange-500/20 rounded-full" />
                  <div className="ml-auto text-[10px] text-orange-600 dark:text-orange-500 font-mono">J-15</div>
                </div>
                <div className="flex items-center gap-3 bg-green-500/10 p-2 rounded-lg border border-green-500/20 opacity-40">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="h-2 w-16 bg-green-500/20 rounded-full" />
                  <div className="ml-auto text-[10px] text-green-600 dark:text-green-500 font-mono">OK</div>
                </div>
              </div>
            }
            className="md:col-span-1 bento-card-bg"
          />

          {/* 4. Site Internet */}
          <BentoCard
            title={<span className="text-xl font-bold bento-text-strong">Site Internet</span>}
            description="Boostez vos ventes et votre visibilité grâce à une présence en ligne moderne et impactante."
            icon={<Globe className="h-8 w-8 text-secondary mb-4" />}
            header={
              <div className="flex-1 w-full h-32 rounded-xl bento-header-bg relative overflow-hidden flex flex-col pt-4 px-4">
                 {/* Simulated Browser Window */}
                 <div className="w-full h-full border-t border-x border-white/5 rounded-t-lg bg-white/5 relative shadow-sm">
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    {/* Website Mockup Content */}
                    <div className="mt-8 mx-4 space-y-2">
                       <div className="h-2 w-1/3 bg-secondary/30 rounded-full" />
                       <div className="h-16 w-full bg-linear-to-br from-secondary/10 to-transparent rounded-lg border border-secondary/10" />
                       <div className="flex gap-2">
                         <div className="h-8 w-1/2 bg-neutral-100 dark:bg-white/5 rounded-md" />
                         <div className="h-8 w-1/2 bg-neutral-100 dark:bg-white/5 rounded-md" />
                       </div>
                    </div>
                 </div>
              </div>
            }
            className="md:col-span-1 bento-card-bg"
          />
        </BentoGrid>
      </Container>
    </Section>
  );
}
