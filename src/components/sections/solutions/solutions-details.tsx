"use client";

import { Container, Section } from "@/components/layout";
import { FadeIn, SplitText } from "@/components/animations";
import { CheckCircle2, ArrowRight, Search, ShoppingCart, ShieldCheck, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

const details = [
  {
    id: "data",
    title: "Analyse de Data",
    subtitle: "La puissance de vos données, enfin accessible.",
    description: "Notre moteur d'analyse se connecte directement à vos LGO (Winpharma, LGPI, etc.) pour extraire la substance utile de votre activité quotidienne.",
    features: [
      "Connexion automatique et sécurisée aux LGO",
      "Tableaux de bord multi-pharmacies en temps réel",
      "Analyse fine des taux de rupture et des marges",
      "Agrégation intelligente des données multi-sources"
    ],
    imageAlt: "Dashboard Analyse Data",
    gradient: "from-primary/20 to-transparent"
  },
  {
    id: "ecommerce",
    title: "Site E-commerce",
    subtitle: "Votre pharmacie en ligne, sur mesure.",
    description: "Plus qu'un simple site, une extension numérique de votre officine conçue pour convertir et fidéliser.",
    features: [
      "Design ultra-moderne et responsive",
      "Passerelle temps réel avec votre stock LGO",
      "Gestion optimisée du Click & Collect",
      "Outils de relance panier et marketing intégrés"
    ],
    imageAlt: "Interface E-commerce",
    gradient: "from-secondary/20 to-transparent"
  },
  {
    id: "perimes",
    title: "Gestion des Périmés",
    subtitle: "Anticiper pour ne plus perdre.",
    description: "Économisez des milliers d'euros chaque année grâce à une gestion proactive et automatisée de vos dates de péremption.",
    features: [
      "Récupération automatique des dates via factures",
      "Application mobile de scan pour vos inventaires",
      "Système d'alertes intelligent par niveaux d'urgence",
      "Estimation automatique du potentiel d'écoulement"
    ],
    imageAlt: "Application Scan Périmés",
    gradient: "from-accent/20 to-transparent"
  },
  {
    id: "prix",
    title: "Récupérateur de Prix",
    subtitle: "Le marché sous surveillance constante.",
    description: "Ajustez vos prix stratégiquement en fonction de la concurrence réelle sur internet.",
    features: [
      "Scraping automatique des prix concurrents",
      "Détection instantanée des anomalies de marges",
      "Identification des opportunités de hausse de prix",
      "Rapports de positionnement tarifaire"
    ],
    imageAlt: "Outil de Veille Tarifaire",
    gradient: "from-primary/20 to-transparent"
  },
  {
    id: "devis",
    title: "Créateur de Devis",
    subtitle: "La précision au service de vos ventes.",
    description: "Créez des devis professionnels en quelques secondes tout en maîtrisant parfaitement votre rentabilité.",
    features: [
      "Calcul des marges complexes en temps réel",
      "Base de produits modulaire et enrichie",
      "Historique et statistiques par point de vente",
      "Templates personnalisables haute fidélité"
    ],
    imageAlt: "Gestionnaire de Devis",
    gradient: "from-secondary/20 to-transparent"
  },
  {
    id: "contrats",
    title: "Comparateur de Contrats",
    subtitle: "L'IA au service de votre sérénité.",
    description: "Ne laissez plus passer les détails importants dans vos contrats complexes.",
    features: [
      "Analyse IA spécialisée secteur pharma",
      "Détection automatique des clauses critiques",
      "Résumé interactif et mise en lumière des changements",
      "Confidentialité totale via infrastructure isolée"
    ],
    imageAlt: "Analyseur de Contrats IA",
    gradient: "from-accent/20 to-transparent"
  }
];

export function SolutionsDetails() {
  return (
    <div className="relative pb-20">
      {details.map((item, index) => (
        <Section 
          key={item.id} 
          id={item.id} 
          className="relative py-20 md:py-32 border-b border-white/5 last:border-0"
        >
          <Container>
            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}>
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <FadeIn direction={index % 2 === 1 ? "right" : "left"}>
                  <div className="space-y-2">
                    <h3 className="text-primary font-bold text-lg uppercase tracking-wider">{item.title}</h3>
                    <h4 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold adaptive-text-primary leading-tight">{item.subtitle}</h4>
                  </div>
                  <p className="text-lg adaptive-text-description mt-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <ul className="space-y-4 pt-4">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <span className="adaptive-text-primary font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8">
                    <a href="#contact">
                      <Button variant="glass" className="rounded-full group">
                        En savoir plus sur {item.title}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </a>
                  </div>
                </FadeIn>
              </div>

              {/* Visual Side */}
              <div 
                className="flex-1 w-full h-[400px] md:h-[550px] relative rounded-4xl overflow-hidden bento-card-bg border border-white/10 group shadow-3xl shadow-primary/5"
                aria-label={`Visualisation de la solution : ${item.title}`}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
                
                {/* Simulated UI Content */}
                <div className="absolute inset-8 border border-neutral-200/50 rounded-3xl bg-white/95 backdrop-blur-xl p-8 shadow-4xl transition-all duration-700 group-hover:scale-[1.02] flex flex-col border-t-white">
                  {/* Browser/App Header */}
                  <div className="flex items-center gap-2 mb-10 border-b border-neutral-100 pb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/40" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
                      <div className="w-3 h-3 rounded-full bg-green-400/40" />
                    </div>
                    <div className="h-5 w-40 bg-neutral-100 rounded-full mx-auto border border-neutral-200/50" />
                  </div>
                  
                  {/* Content based on ID */}
                  {item.id === "data" && (
                    <div className="space-y-8 flex-1 flex flex-col">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col p-4 relative overflow-hidden group/item">
                          <div className="h-2 w-16 bg-primary/20 rounded-full mb-auto" />
                          <div className="text-3xl font-bold text-primary">+24%</div>
                          <div className="absolute top-2 right-2 p-2 bg-green-500/20 rounded-full">
                             <div className="w-2 h-2 rounded-full bg-green-500" />
                          </div>
                        </div>
                        <div className="h-24 bg-neutral-50 rounded-2xl border border-neutral-100 p-4 flex flex-col">
                          <div className="h-2 w-20 bg-neutral-200 rounded-full mb-auto" />
                          <div className="text-3xl font-bold text-neutral-800">12.4k</div>
                        </div>
                      </div>
                      <div className="flex-1 bg-neutral-50 rounded-2xl border border-neutral-100 p-6 flex items-end gap-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-neutral-100/50 mask-[linear-gradient(to_bottom,transparent,black)]" />
                        <div className="flex-1 bg-primary/10 h-[30%] rounded-xl border border-primary/20" />
                        <div className="flex-1 bg-primary/20 h-[60%] rounded-xl border border-primary/30" />
                        <div className="flex-1 bg-primary/30 h-[45%] rounded-xl border border-primary/40" />
                        <div className="flex-1 bg-primary h-[85%] rounded-xl border border-primary/50 shadow-lg shadow-primary/20" />
                      </div>
                    </div>
                  )}

                  {item.id === "ecommerce" && (
                    <div className="space-y-6 flex-1 flex flex-col">
                      <div className="h-32 w-full bg-linear-to-r from-secondary/5 to-transparent rounded-2xl border border-secondary/10 p-6 flex items-center justify-between">
                         <div className="space-y-2">
                            <div className="h-4 w-32 bg-neutral-200 rounded-full" />
                            <div className="h-2 w-48 bg-neutral-100 rounded-full" />
                         </div>
                         <div className="w-16 h-16 bg-white rounded-full border border-neutral-200 shadow-sm flex items-center justify-center">
                            <ShoppingCart className="w-8 h-8 text-secondary" />
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 flex-1">
                        <div className="bg-neutral-50 rounded-2xl border border-neutral-200/50 p-4 group/card relative">
                          <div className="aspect-square bg-white rounded-xl mb-4 border border-neutral-100" />
                          <div className="h-2.5 w-full bg-neutral-200 rounded-full mb-2" />
                          <div className="h-2 w-2/3 bg-neutral-100 rounded-full" />
                        </div>
                        <div className="bg-neutral-50 rounded-2xl border border-neutral-200/50 p-4">
                          <div className="aspect-square bg-white rounded-xl mb-4 border border-neutral-100" />
                          <div className="h-2.5 w-full bg-neutral-200 rounded-full mb-2" />
                          <div className="h-2 w-2/3 bg-neutral-100 rounded-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.id === "perimes" && (
                    <div className="space-y-4 flex-1">
                      {[
                        { label: "Doliprane 1000", date: "J-2", status: "red" },
                        { label: "Spasfon Lyoc", date: "J-15", status: "orange" },
                        { label: "Augmentin 1g", date: "J-30", status: "orange" },
                        { label: "Aerius Sirop", date: "OK", status: "green" }
                      ].map((item, i) => (
                        <div key={i} className={`h-16 w-full rounded-2xl border flex items-center px-6 gap-6 transition-transform hover:scale-[1.01] bg-white ${item.status === 'red' ? 'border-red-200 shadow-sm' : item.status === 'orange' ? 'border-orange-100' : 'border-green-100'}`}>
                          <div className={`w-3 h-3 rounded-full ${item.status === 'red' ? 'bg-red-500 animate-pulse' : item.status === 'orange' ? 'bg-orange-400' : 'bg-green-400'}`} />
                          <div className="flex-1">
                            <div className="h-3 w-32 bg-neutral-200 rounded-full mb-2" />
                            <div className="h-2 w-48 bg-neutral-100 rounded-full" />
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono border ${item.status === 'red' ? 'text-red-600 border-red-200 bg-red-50' : item.status === 'orange' ? 'text-orange-600 border-orange-100 bg-orange-50' : 'text-green-600 border-green-100 bg-green-50'}`}>
                            {item.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(item.id === "prix" || item.id === "devis" || item.id === "contrats") && (
                    <div className="flex-1 flex flex-col gap-6 scale-[0.95] md:scale-100 origin-top">
                      {/* Light UI Container */}
                      <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-4xl overflow-hidden flex flex-col">
                        
                        {/* Custom UI for Prix */}
                        {item.id === "prix" && (
                          <div className="flex-1 flex flex-col">
                            <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                               <div className="h-8 w-40 bg-white border border-neutral-200 rounded-lg px-3 flex items-center gap-2">
                                  <Search className="w-3.5 h-3.5 text-neutral-400" />
                                  <div className="h-1 w-20 bg-neutral-100 rounded-full" />
                               </div>
                               <div className="flex gap-2">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">VP</div>
                               </div>
                            </div>
                            <div className="p-6 space-y-6">
                               <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                     <ShoppingCart className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-2 w-32 bg-neutral-300 rounded-full mb-2" />
                                    <div className="h-1.5 w-48 bg-neutral-200 rounded-full" />
                                  </div>
                                  <div className="text-right">
                                     <div className="text-xl font-bold adaptive-text-primary text-primary">+1.50€</div>
                                     <div className="text-[8px] text-green-600 font-bold uppercase">Opportunité</div>
                                  </div>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 border border-neutral-100 rounded-xl space-y-3">
                                     <div className="text-[10px] text-neutral-400 font-medium">Prix Internet (Moyen)</div>
                                     <div className="text-lg font-bold text-neutral-800">12.45€</div>
                                     <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="w-3/4 h-full bg-primary/40" />
                                     </div>
                                  </div>
                                  <div className="p-4 border border-neutral-100 rounded-xl space-y-3">
                                     <div className="text-[10px] text-neutral-400 font-medium">Votre Prix (Officine)</div>
                                     <div className="text-lg font-bold text-neutral-800">10.95€</div>
                                     <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-primary" />
                                     </div>
                                  </div>
                               </div>
                            </div>
                          </div>
                        )}

                        {/* Custom UI for Devis */}
                        {item.id === "devis" && (
                          <div className="flex-1 flex flex-col">
                            <div className="p-6 border-b border-neutral-100 flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                                  <Calculator className="w-6 h-6 text-secondary" />
                               </div>
                               <div>
                                  <div className="h-3 w-40 bg-neutral-800 rounded-full mb-1" />
                                  <div className="h-2 w-24 bg-neutral-400 rounded-full" />
                               </div>
                               <div className="ml-auto px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold">Générer PDF</div>
                            </div>
                            <div className="flex-1 p-8">
                               <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                                  <table className="w-full text-left text-xs">
                                     <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold">
                                        <tr>
                                           <th className="p-3">Produit</th>
                                           <th className="p-3">Prix Unit.</th>
                                           <th className="p-3">Marge</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-neutral-100 text-neutral-800">
                                        <tr>
                                           <td className="p-3 font-medium">Matériel Médical A</td>
                                           <td className="p-3">450.00€</td>
                                           <td className="p-3"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">35%</span></td>
                                        </tr>
                                        <tr className="bg-secondary/5">
                                           <td className="p-3 font-medium">Consommable B</td>
                                           <td className="p-3">24.50€</td>
                                           <td className="p-3 font-bold text-secondary">35%</td>
                                        </tr>
                                        <tr>
                                           <td className="p-3 font-medium">Service C</td>
                                           <td className="p-3">120.00€</td>
                                           <td className="p-3">35%</td>
                                        </tr>
                                     </tbody>
                                  </table>
                               </div>
                               <div className="mt-6 flex justify-end gap-10 border-t border-neutral-100 pt-6">
                                  <div className="text-right">
                                     <div className="text-neutral-400 text-[10px] mb-1">Marge Totale</div>
                                     <div className="text-2xl font-bold text-secondary">35.0%</div>
                                  </div>
                                  <div className="text-right">
                                     <div className="text-neutral-400 text-[10px] mb-1">Total TTC</div>
                                     <div className="text-2xl font-bold text-neutral-900">594.50€</div>
                                  </div>
                               </div>
                            </div>
                          </div>
                        )}

                        {/* Custom UI for Contrats */}
                        {item.id === "contrats" && (
                          <div className="flex-1 flex flex-col">
                            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                               <div className="flex gap-2">
                                  <div className="px-3 py-1 bg-white border border-neutral-200 rounded text-[10px] font-bold text-neutral-400">Contrat_2024.pdf</div>
                                  <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded text-[10px] font-bold text-accent">Analyse IA Active</div>
                               </div>
                               <ShieldCheck className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1 flex gap-px bg-neutral-100 p-4">
                               <div className="flex-1 bg-white p-6 space-y-4 rounded-l-xl opacity-60">
                                  <div className="h-2 w-3/4 bg-neutral-200 rounded-full" />
                                  <div className="h-2 w-full bg-neutral-100 rounded-full" />
                                  <div className="h-2 w-5/6 bg-neutral-100 rounded-full" />
                                  <div className="h-10 bg-red-50 rounded-lg" />
                                  <div className="h-2 w-full bg-neutral-100 rounded-full" />
                               </div>
                               <div className="flex-1 bg-white p-6 space-y-4 rounded-r-xl border-l-[3px] border-accent shadow-xl relative">
                                  <div className="h-2 w-3/4 bg-neutral-200 rounded-full" />
                                  <div className="h-2 w-full bg-neutral-100 rounded-full" />
                                  <div className="h-2 w-5/6 bg-neutral-100 rounded-full" />
                                  <div className="h-10 bg-accent/10 border border-accent/20 rounded-lg flex items-center px-4">
                                     <div className="h-1.5 w-1/2 bg-accent/40 rounded-full" />
                                  </div>
                                  <div className="h-2 w-full bg-neutral-100 rounded-full" />
                                  
                                  {/* AI Popover */}
                                  <div className="absolute top-1/2 -right-4 translate-y-[-50%] p-4 bg-accent text-white rounded-2xl shadow-glow-accent w-48 text-[11px] font-medium leading-tight">
                                     <div className="font-bold mb-1 flex items-center gap-2 italic">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        Changement de clause
                                     </div>
                                     La réduction sur le volume a été modifiée de 1.5% à 1.8% sur le palier B.
                                  </div>
                               </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs pointer-events-none z-30">
                  <div className="px-6 py-3 rounded-full bento-card-bg border border-white/20 text-white font-display text-xs uppercase tracking-[0.4em] font-bold scale-90 group-hover:scale-100 transition-transform">
                    {item.imageAlt}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}
    </div>
  );
}
