"use client";

import { FadeIn, ParallaxLayer } from "@/components/animations";
import { Button, Card } from "@/components/ui";
import { ArrowRight, Code2, Ear, TrendingUp, Users } from "lucide-react";

export function VisionSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center mx-auto max-w-7xl">
          
          {/* 1. Text Content (Left) */}
          <div className="space-y-8 text-center lg:text-left">
            <FadeIn delay={0.1}>
              <h2 className="text-display font-display font-bold leading-tight">
                Réinventer l&apos;expérience <br />
                <span className="text-gradient">officinale</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Chez Phardev, nous croyons que la technologie doit être un levier de croissance, pas une contrainte. Nous développons des solutions sur mesure qui s&apos;adaptent à votre flux de travail, pour que vous puissiez vous concentrer sur l&apos;essentiel : vos patients, votre gestion et votre performance.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button variant="gradient" size="lg" className="rounded-full group">
                  Découvrir notre approche
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="glass" size="lg" className="rounded-full">
                  En savoir plus
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* 2. Visual Content (Right) */}
          <div className="relative h-[600px] w-full flex items-center justify-center lg:justify-end">
            
            {/* Main Card (Excellence) */}
            <ParallaxLayer speed={0.05} className="relative z-10 w-full max-w-sm">
              <Card className="glass p-8 space-y-6 backdrop-blur-xl border-white/20">
                <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 mb-4">
                  <Code2 className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-2xl">Excellence Technique</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Des architectures robustes garantissant sécurité, rapidité et fiabilité absolue pour vos données de santé.
                  </p>
                </div>
              </Card>
            </ParallaxLayer>

            {/* Floating Card 1 (Adaptabilité) - Top Left, overlapping Excellence */}
            <ParallaxLayer 
              speed={0.15} 
              className="absolute top-8 -left-12 z-30 hidden md:block" 
            >
              <Card className="glass p-4 flex items-center gap-4 backdrop-blur-xl border-white/20 min-w-[220px] shadow-glow-lg">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Ear className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-base">Adaptabilité</h4>
                  <p className="text-xs text-muted-foreground">Toujours à votre écoute</p>
                </div>
              </Card>
            </ParallaxLayer>

            {/* Floating Card 2 (Expertise) - Top Right, overlapping Excellence */}
            <ParallaxLayer 
              speed={0.2} 
              className="absolute top-16 -right-8 z-30 hidden md:block" 
            >
              <Card className="glass p-4 flex items-center gap-4 backdrop-blur-xl border-white/20 min-w-[220px] shadow-glow-lg">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-base">Expertise</h4>
                  <p className="text-xs text-muted-foreground">Toujours sur le terrain</p>
                </div>
              </Card>
            </ParallaxLayer>
            
            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

          </div>

        </div>
      </div>
    </section>
  );
}
