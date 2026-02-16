"use client";

import { Container, Section } from "@/components/layout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  BarChart3, 
  ShoppingCart, 
  Clock, 
  Search, 
  Calculator, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { FadeIn, SplitText } from "@/components/animations";

const solutions = [
  {
    title: "Analyse de Data",
    description: "L'outil idéal pour optimiser stock et achat. Prenez les meilleures décisions basées sur vos données.",
    icon: BarChart3,
    id: "data",
    className: "md:col-span-1",
    color: "text-primary",
    header: (
      <div className="flex-1 w-full h-full rounded-xl bento-header-bg relative overflow-hidden flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
           <div className="h-5 w-16 bg-primary/20 rounded-lg border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">+24%</div>
           <div className="h-2 w-12 bg-white/10 rounded-full" />
        </div>
        <div className="flex-1 flex items-end gap-2 px-2">
           <div className="flex-1 bg-primary/20 h-[30%] rounded-t-sm animate-pulse" style={{ animationDelay: '0ms' }} />
           <div className="flex-1 bg-primary/40 h-[60%] rounded-t-sm animate-pulse" style={{ animationDelay: '150ms' }} />
           <div className="flex-1 bg-primary/60 h-[45%] rounded-t-sm animate-pulse" style={{ animationDelay: '300ms' }} />
           <div className="flex-1 bg-primary h-[85%] rounded-t-sm" />
        </div>
      </div>
    )
  },
  {
    title: "E-commerce",
    description: "Boostez vos ventes et votre visibilité grâce à une présence en ligne moderne et impactante.",
    icon: ShoppingCart,
    id: "ecommerce",
    className: "md:col-span-1",
    color: "text-secondary",
    header: (
      <div className="flex-1 w-full h-full rounded-xl bento-header-bg relative overflow-hidden flex flex-col pt-4 px-4">
        <div className="w-full h-full border-t border-x border-white/5 rounded-t-lg bg-white/5 relative shadow-sm">
          <div className="absolute top-2 left-2 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="mt-8 mx-4 space-y-2">
            <div className="h-2 w-1/3 bg-secondary/30 rounded-full" />
            <div className="h-12 w-full bg-linear-to-br from-secondary/10 to-transparent rounded-lg border border-secondary/10" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Gestion des Périmés",
    description: "Réduisez vos pertes et automatisez vos contrôles avec un suivi J-2 / J-15 interactif.",
    icon: Clock,
    id: "perimes",
    className: "md:col-span-1",
    color: "text-accent",
    header: (
      <div className="flex-1 w-full h-full rounded-xl bento-header-bg relative overflow-hidden flex flex-col p-4 gap-2">
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
    )
  },
  {
    title: "Récupérateur de Prix",
    description: "Scraping automatique et détection d'anomalies de prix sur le marché en temps réel.",
    icon: Search,
    id: "prix",
    className: "md:col-span-1",
    color: "text-primary",
    header: (
      <div className="flex-1 w-full h-full rounded-xl bento-header-bg relative overflow-hidden flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
           <div className="h-4 w-4 bg-primary/20 rounded flex items-center justify-center">
              <Search className="w-2.5 h-2.5 text-primary" />
           </div>
           <div className="px-2 py-0.5 bg-green-500/20 text-[8px] font-bold text-green-500 rounded border border-green-500/30">+1.50€</div>
        </div>
        <div className="space-y-2">
           <div className="h-8 bg-white/5 rounded-lg border border-white/10 flex items-center px-2 gap-2">
              <div className="h-4 w-4 bg-neutral-800 rounded" />
              <div className="flex-1 h-1.5 bg-neutral-700 rounded-full" />
              <div className="text-[8px] font-bold text-primary">12.95€</div>
           </div>
           <div className="h-8 bg-primary/10 rounded-lg border border-primary/20 flex items-center px-2 gap-2">
              <div className="h-4 w-4 bg-primary/30 rounded" />
              <div className="flex-1 h-1.5 bg-primary/40 rounded-full" />
              <div className="text-[8px] font-bold text-white">10.50€</div>
           </div>
        </div>
      </div>
    )
  },
  {
    title: "Créateur de Devis",
    description: "Outil spécialisé avec gestion pointue des marges et base produits intégrée.",
    icon: Calculator,
    id: "devis",
    className: "md:col-span-1",
    color: "text-secondary",
    header: (
      <div className="flex-1 w-full h-full rounded-xl bento-header-bg relative overflow-hidden flex flex-col p-4">
        <div className="flex items-center gap-2 mb-3">
           <Calculator className="w-5 h-5 text-secondary" />
           <div className="h-1.5 w-20 bg-white/10 rounded-full" />
        </div>
        <div className="flex-1 border border-white/5 rounded-lg bg-white/5 overflow-hidden flex flex-col">
           <div className="h-4 bg-white/5 border-b border-white/5" />
           <div className="flex-1 flex px-2 items-center justify-between">
              <div className="h-1 w-12 bg-white/10 rounded-full" />
              <div className="px-1.5 py-0.5 bg-secondary/20 text-secondary text-[10px] font-bold rounded border border-secondary/30">35% MARGE</div>
           </div>
           <div className="flex-1 bg-secondary/10 flex px-2 items-center justify-between">
              <div className="h-1 w-16 bg-white/10 rounded-full" />
              <div className="h-1 w-6 bg-secondary/30 rounded-full" />
           </div>
        </div>
      </div>
    )
  },
  {
    title: "Comparateur de Contrats",
    description: "Analyse IA de vos contrats pharmaceutiques avec détection automatique des changements.",
    icon: ShieldCheck,
    id: "contrats",
    className: "md:col-span-1",
    color: "text-accent",
    header: (
      <div className="flex-1 w-full h-full rounded-xl bento-header-bg relative overflow-hidden flex flex-col p-4">
        <div className="relative h-full border border-white/10 rounded-lg bg-white/5 overflow-hidden flex">
          <div className="w-[45%] p-2 border-r border-white/10 space-y-2 opacity-50">
            <div className="h-1 w-full bg-white/20 rounded-full" />
            <div className="h-1 w-3/4 bg-white/20 rounded-full" />
            <div className="h-3 w-full bg-neutral-800 rounded-sm" />
          </div>
          <div className="flex-1 p-2 space-y-2 bg-accent/5">
            <div className="h-1 w-full bg-white/20 rounded-full" />
            <div className="h-3 w-full bg-accent/30 rounded-sm border border-accent/40" />
            <div className="h-1 w-2/3 bg-white/20 rounded-full" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-md flex items-center justify-center shadow-glow-accent">
            <ShieldCheck className="w-5 h-5 text-accent animate-pulse" />
          </div>
        </div>
      </div>
    )
  }
];

export function SolutionsOverview() {
  return (
    <Section id="overview" className="py-20 bento-section-bg">
      <Container>
        <div className="mb-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold adaptive-text-primary mb-4">
              Une solution pour chaque défi
            </h2>
          </FadeIn>
        </div>

        <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((sol, index) => (
            <BentoCard
              key={sol.title}
              title={<span className="text-xl font-bold bento-text-strong">{sol.title}</span>}
              description={sol.description}
              icon={<sol.icon className={`h-8 w-8 ${sol.color} mb-4`} />}
              className={`${sol.className} bento-card-bg group cursor-pointer hover:scale-[1.02] transition-transform`}
              href={`#${sol.id}`}
              header={sol.header}
            />
          ))}
        </BentoGrid>
      </Container>
    </Section>
  );
}
