"use client";

import { Container, Section } from "@/components/layout";
import { FadeIn, SplitText, MagneticButton } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function SolutionsHero() {
  return (
    <Section className="relative py-20 md:py-32 overflow-hidden">
      <Container className="relative z-10 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bento-card-bg border border-primary/20 text-primary text-xs font-medium mb-6">
            Expertise & Innovation
          </div>
        </FadeIn>
        
        <div className="mb-6">
          <SplitText
            text="Au service de votre Officine"
            as="h1"
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold adaptive-text-primary mb-2"
          />
        </div>
        
        <FadeIn delay={0.2}>
          <p className="max-w-2xl mx-auto text-lg md:text-xl adaptive-text-description mb-10">
            Découvrez comment Phardev transforme vos données en levier de croissance. 
            Des outils conçus par des experts pour répondre aux défis réels des pharmaciens.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <a href="#overview">
                <Button size="xl" variant="gradient" className="rounded-full shadow-glow">
                  Explorer nos outils
                  <ArrowDown className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </MagneticButton>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
