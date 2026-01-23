"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Solutions", href: "#services" },
  { label: "ROI", href: "#roi" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
          isScrolled
            ? "adaptive-header-bg-scrolled shadow-lg"
            : "adaptive-header-bg shadow-md"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-2xl font-display font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              Phardev
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-sm font-medium adaptive-text-primary transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 group-hover:w-full" />
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {link.label}
                  </span>
                </button>
              ))}
            </nav>

            {/* Right Side: Theme Toggle + CTA (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button
                onClick={() => scrollToSection("#contact")}
                size="sm"
                className="rounded-full"
              >
                Réserver un audit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 adaptive-text-primary hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-20 right-0 bottom-0 z-40 w-full max-w-sm md:hidden adaptive-header-bg backdrop-blur-xl border-l border-neutral-200 dark:border-white/10 shadow-2xl"
            >
              <nav className="h-full overflow-y-auto px-6 py-8 flex flex-col">
                {/* Navigation Links */}
                <div className="space-y-2 mb-8">
                  {NAV_LINKS.map((link, index) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(link.href)}
                      className="w-full text-left py-4 px-5 rounded-xl adaptive-text-primary hover:bg-neutral-100 dark:hover:bg-white/5 transition-all duration-200 font-medium text-lg active:scale-95"
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto space-y-4 pt-6 border-t border-neutral-200 dark:border-white/10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm adaptive-text-description">Thème</span>
                    <ThemeToggle />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Button
                      onClick={() => scrollToSection("#contact")}
                      size="lg"
                      className="rounded-full w-full active:scale-95 transition-transform"
                    >
                      Réserver un audit
                    </Button>
                  </motion.div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

