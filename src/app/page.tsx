import { HeroSection } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services/services-grid";
import { RoiSimulator } from "@/components/sections/roi-simulator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { InfiniteTunnel } from "@/components/backgrounds";
import { PartnersMarquee } from "@/components/sections/partners-marquee";
import { ContactForm } from "@/components/sections/contact-form";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <>
      <InfiniteTunnel />
      <Header />

      <div className="relative w-full max-w-[100vw] overflow-x-hidden">
        <main className="flex min-h-screen flex-col items-center justify-between relative">
          <div id="hero">
            <HeroSection />
          </div>
          <div id="services">
            <ServicesGrid />
          </div>
          <div id="roi">
            <RoiSimulator />
          </div>
          <div id="partners">
            <PartnersMarquee />
          </div>
          <div id="contact">
            <ContactForm />
          </div>
        </main>
      </div>
    </>
  );
}
