"use client";

import { Container, Section } from "@/components/layout";
import { FadeIn, SplitText } from "@/components/animations";
import { Quote } from "lucide-react";


const TESTIMONIALS = [
  {
    quote: "J'étais sceptique au début comme souvent avec l'informatique, mais l'analyse des périmés sur Winpharma nous a sauvés. On a sorti 4 500€ de stock dormant en 3 mois. Mes préparatrices ne râlent plus sur les inventaires de dates.",
    author: "Jean-Philippe R.",
    role: "Titulaire, Pharmacie du Centre",
    stat: "4 500€ sauvés"
  },
  {
    quote: "Le créateur de devis est devenu mon outil n°1 pour le matériel médical. Je sais exactement quelle marge je dégage avant de valider. Fini les calculs sur un coin de table pendant que le patient attend.",
    author: "Catherine D.",
    role: "Pharmacienne, Groupement Giphar",
    stat: "Marge maîtrisée"
  },
  {
    quote: "Passer en e-commerce me faisait peur pour la gestion du stock. La passerelle avec mon LGO LGPI est transparente. Le Click & Collect tourne tout seul, c'est un vrai relais de croissance sans stress supplémentaire.",
    author: "Bruno T.",
    role: "Officine de Quartier, Nantes",
    stat: "+15% CA Web"
  }
];

export function Testimonials() {
  return (
    <Section className="relative z-10 w-full py-24 border-t border-white/5">
      <Container>
        {/* Header */}
        <div className="mb-20 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
              <span className="adaptive-text-primary">Approuvé par vos</span>{" "}
              <span className="text-gradient">confrères</span>
            </h2>
          <FadeIn delay={0.2}>
            <p className="adaptive-text-description text-xl font-light">
              Des résultats concrets, mesurables et immédiats pour votre officine.
            </p>
          </FadeIn>
        </div>

        {/* Testimonials Grid using Bento Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1} className="h-full">
                    <div className="bento-card-bg h-full relative group p-8 rounded-2xl flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                        <Quote className="h-10 w-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />
                        
                        <p className="text-lg adaptive-text-primary mb-8 italic leading-relaxed">
                            &quot;{t.quote}&quot;
                        </p>
                        
                        <div className="mt-auto flex items-end justify-between border-t border-neutral-200 dark:border-white/5 pt-6">
                            <div>
                                <div className="font-bold adaptive-text-primary">{t.author}</div>
                                <div className="text-sm adaptive-text-description">{t.role}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-gradient">{t.stat}</div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            ))}
        </div>
      </Container>
    </Section>
  );
}
