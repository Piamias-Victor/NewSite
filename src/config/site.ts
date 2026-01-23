export const siteConfig = {
  name: "Phardev",
  tagline: "La Renaissance Pharmacie",
  description:
    "Solutions technologiques innovantes pour pharmacies. Expertise, innovation et adaptabilité au service de votre officine.",
  url: "https://phardev.fr",
  ogImage: "https://phardev.fr/og-image.jpg",
  links: {
    linkedin: "https://linkedin.com/company/phardev",
    twitter: "https://twitter.com/phardev",
  },
  contact: {
    email: "contact@phardev.fr",
    phone: "+33 X XX XX XX XX",
    address: "Paris, France",
  },
  keywords: [
    "pharmacie",
    "technologie pharma",
    "innovation pharmacie",
    "solutions officine",
    "digitalisation pharmacie",
    "logiciel pharmacie",
    "phardev",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
