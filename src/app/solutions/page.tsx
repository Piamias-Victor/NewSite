import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { InfiniteTunnel } from "@/components/backgrounds";
import { SolutionsHero } from "@/components/sections/solutions/solutions-hero";
import { SolutionsOverview } from "@/components/sections/solutions/solutions-overview";
import { SolutionsDetails } from "@/components/sections/solutions/solutions-details";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Nos Solutions | Phardev | Innovation pour Officines",
  description: "Explorez la gamme complète de solutions Phardev : prix, devis, contrats, périmés et e-commerce. Des outils terrain pour pharmaciens exigeants.",
  alternates: {
    canonical: "https://phardev.fr/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <InfiniteTunnel />
      <Header />
      
      <main className="relative w-full max-w-[100vw] overflow-x-hidden pt-20">
        <SolutionsHero />
        <SolutionsOverview />
        <SolutionsDetails />
        <section id="contact">
          <ContactForm />
        </section>
      </main>
    </>
  );
}
