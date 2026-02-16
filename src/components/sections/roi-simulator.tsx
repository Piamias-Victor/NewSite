"use client";

import { useState, useEffect } from "react";
import { FadeIn, SplitText } from "@/components/animations";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, ShoppingCart, AlertTriangle, Calculator, LucideIcon } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";

function CurrencyInput({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  return (
    <div className="relative max-w-sm mx-auto mb-12 group">
      <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative flex items-center justify-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-center text-5xl md:text-7xl font-display font-bold adaptive-text-primary outline-none placeholder:text-neutral-500 m-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="20000"
        />
        <span className="text-3xl md:text-5xl font-display font-bold adaptive-text-primary ml-2">€</span>
      </div>
      <p className="text-center adaptive-text-description mt-4 text-lg">
        Montant estimé de vos pertes annuelles (périmés)
      </p>
    </div>
  );
}


function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  delay = 0,
  description 
}: { 
  label: string; 
  value: number; 
  icon: LucideIcon; 
  delay?: number;
  description: string;
}) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString("fr-FR"));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bento-card-bg rounded-2xl p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-24 h-24 text-primary" />
      </div>
      
      <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/20 to-secondary/5 flex items-center justify-center mb-6 ring-1 ring-white/10">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      <h3 className="text-lg font-medium text-muted-foreground mb-2">{label}</h3>
      
      <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary via-secondary to-accent mb-4">
        + <motion.span>{display}</motion.span> €
      </div>

      <p className="text-sm bento-text-muted leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export function RoiSimulator() {
  const [annualLoss, setAnnualLoss] = useState(20000);

  // ... vars ...
  
  const gainAchats = annualLoss * 0.2;
  const gainVentes = annualLoss * 0.2;
  const gainPerimes = annualLoss * 0.3;
  const totalGain = gainAchats + gainVentes + gainPerimes;

  return (
    <Section className="relative z-10 overflow-hidden py-32">
       {/* Background Elements */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bento-card-bg border border-primary/20 text-primary text-xs font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Simulateur de potentiel
            </div>
          </FadeIn>
          
          <div className="mb-6">
             <SplitText
                text="Transformez vos pertes en profits"
                className="text-2xl sm:text-3xl md:text-5xl font-display font-bold adaptive-text-primary px-2"
             />
          </div>
          
          <FadeIn delay={0.2}>
            <p className="text-xl adaptive-text-description">
              L&apos;impact de Phardev dépasse la simple gestion des dates. <br className="hidden md:block"/>
              Entrez votre perte annuelle actuelle et découvrez votre potentiel caché.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
           <CurrencyInput value={annualLoss} onChange={setAnnualLoss} />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard
            label="Optimisation Achats"
            value={gainAchats}
            icon={ShoppingCart}
            delay={0.1}
            description="Économisé en ajustant vos commandes grâce à une meilleure analyse des stocks dormants."
          />
          <StatCard
            label="Ventes Web & Promo"
            value={gainVentes}
            icon={TrendingUp}
            delay={0.2}
            description="Généré en revalorisant vos produits courts via des offres ciblées sur votre site."
          />
          <StatCard
            label="Gestion Périmés"
            value={gainPerimes}
            icon={AlertTriangle}
            delay={0.3}
            description="Sauvés en identifiant et mettant en avant les produits avant la date fatidique."
          />
        </div>

        <FadeIn delay={0.6}>
          <div className="max-w-3xl mx-auto text-center bg-linear-to-b from-white/5 to-transparent rounded-2xl p-8 border border-white/5">
            <h3 className="text-2xl font-bold mb-2 adaptive-text-primary">
              Gain potentiel total : <span className="text-primary">{totalGain.toLocaleString("fr-FR")} €</span>
            </h3>
            <p className="adaptive-text-description mb-8">
              Et ce n&apos;est que la partie visible de l&apos;iceberg. Imaginez l&apos;impact sur le reste de votre officine.
            </p>
            <a href="#contact">
              <Button size="xl" className="rounded-full px-8 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                Lancer un audit complet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
