import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://phardev.fr'),
  title: "Phardev | L'Intelligence Officinale au service de votre Pharmacie",
  description: "Découvrez Phardev, leader des solutions technologiques pour officines. Analyse de data, gestion des périmés, e-commerce et IA au service de la performance officinale.",
  keywords: ["pharmacie", "officine", "data", "winpharma", "lgpi", "périmés", "e-commerce pharma", "IA pharmacie"],
  authors: [{ name: "Phardev Team" }],
  publisher: "Phardev",
  alternates: {
    canonical: "https://phardev.fr",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://phardev.fr",
    siteName: "Phardev",
    title: "Phardev | La Renaissance de votre Officine",
    description: "Solutions innovantes pour moderniser et optimiser votre pharmacie au quotidien.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Phardev - Solutions pour Pharmacies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phardev | L'Intelligence Officinale",
    description: "Des solutions tech conçues pour les pharmaciens.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
