# 🧠 PHARDEV SKILL.MD - GUIDE TECHNIQUE COMPLET

> **Version**: 1.0.0  
> **Stack**: Next.js 15 • React 19 • TypeScript • Tailwind CSS 4 • Framer Motion • GSAP  
> **Objectif**: Site vitrine Awwwards-ready avec animations premium et SEO optimal

---

## 📋 TABLE DES MATIÈRES

1. [Setup & Configuration](#setup--configuration)
2. [Architecture & Structure](#architecture--structure)
3. [Design System](#design-system)
4. [Composants UI](#composants-ui)
5. [Système d'Animations](#système-danimations)
6. [Patterns Avancés](#patterns-avancés)
7. [SEO & Performance](#seo--performance)
8. [Accessibilité](#accessibilité)
9. [Testing & QA](#testing--qa)
10. [Déploiement](#déploiement)

---

## 🚀 SETUP & CONFIGURATION

### Initialisation du Projet

```bash
# Création du projet
npx create-next-app@latest phardev --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Dépendances essentielles
npm install framer-motion gsap @gsap/react clsx tailwind-merge lucide-react

# Dépendances optionnelles (3D)
npm install three @react-three/fiber @react-three/drei

# Dev dependencies
npm install -D @types/node prettier eslint-config-prettier
```

### Configuration TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Configuration Tailwind (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        glass: {
          DEFAULT: "var(--glass)",
          border: "var(--glass-border)",
        },
      },
      fontFamily: {
        display: ["var(--font-cal)", "var(--font-inter)", "system-ui"],
        sans: ["var(--font-inter)", "system-ui"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3.75rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        display: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        heading: ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        subheading: ["1.5rem", { lineHeight: "1.4" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 40px -10px var(--primary)",
        "glow-lg": "0 0 60px -15px var(--primary)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
        "glass-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px var(--primary)" },
          "50%": { boxShadow: "0 0 40px var(--primary)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### Variables CSS Globales (`globals.css`)

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Layout */
    --header-height: 4rem;
    --section-padding: 6rem;

    /* Palette Cuivre Brillant (Dark by default) */
    --background: 12% 0.01 35;
    --foreground: 98% 0.01 35;

    --primary: 62% 0.2 30; /* Cuivre */
    --secondary: 66% 0.16 40; /* Bronze */
    --accent: 72% 0.14 50; /* Or rose */

    --muted: 22% 0.01 35;
    --muted-foreground: 65% 0.01 35;

    --border: 28% 0.01 35;
    --ring: 62% 0.2 30;

    /* Advanced Glass Web3 */
    --glass: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.08);

    /* Gradients */
    --gradient-primary: linear-gradient(
      135deg,
      oklch(62% 0.2 30) 0%,
      oklch(66% 0.16 40) 50%,
      oklch(72% 0.14 50) 100%
    );
  }

  .light {
    --background: 99% 0.005 35;
    --foreground: 15% 0.01 35;
    --muted: 94% 0.01 35;
    --border: 88% 0.01 35;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    @apply scroll-smooth antialiased;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-muted;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-muted-foreground/30 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-muted-foreground/50;
  }

  /* Selection */
  ::selection {
    @apply bg-primary/20 text-foreground;
  }
}

@layer utilities {
  /* Text Gradient */
  .text-gradient {
    @apply bg-clip-text text-transparent;
    background-image: var(--gradient-primary);
  }

  /* Glass Effect */
  .glass {
    background: var(--glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
  }

  /* Mesh Gradient Background */
  .bg-mesh {
    background-image: var(--gradient-mesh);
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }

  /* Glow Effect */
  .glow {
    box-shadow: 0 0 40px -10px hsl(var(--primary));
  }

  .glow-hover:hover {
    box-shadow: 0 0 60px -10px hsl(var(--primary));
  }

  /* Hide scrollbar utility */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Focus visible ring */
  .focus-ring {
    @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
  }
}
```

---

## 🏛️ ARCHITECTURE & STRUCTURE

### Structure de Fichiers Complète

```
src/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── loading.tsx                # Loading UI
│   ├── error.tsx                  # Error boundary
│   ├── not-found.tsx              # 404 page
│   ├── globals.css                # Global styles
│   ├── services/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── api/
│       └── contact/
│           └── route.ts           # Contact form API
│
├── components/
│   ├── ui/                        # Primitive components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   └── index.ts               # Barrel export
│   │
│   ├── layout/                    # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── theme-toggle.tsx
│   │   └── index.ts
│   │
│   ├── sections/                  # Page sections
│   │   ├── hero/
│   │   │   ├── hero.tsx
│   │   │   ├── hero-background.tsx
│   │   │   ├── hero-content.tsx
│   │   │   └── index.ts
│   │   ├── vision/
│   │   │   ├── vision.tsx
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── services-grid.tsx
│   │   │   ├── service-card.tsx
│   │   │   └── index.ts
│   │   ├── pillars/
│   │   │   ├── pillars.tsx
│   │   │   ├── pillar-card.tsx
│   │   │   └── index.ts
│   │   ├── cta/
│   │   │   ├── cta-section.tsx
│   │   │   └── index.ts
│   │   ├── contact/
│   │   │   ├── contact-form.tsx
│   │   │   ├── contact-info.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── animations/                # Animation wrappers
│   │   ├── fade-in.tsx
│   │   ├── slide-in.tsx
│   │   ├── scale-in.tsx
│   │   ├── stagger-children.tsx
│   │   ├── parallax-layer.tsx
│   │   ├── split-text.tsx
│   │   ├── magnetic-element.tsx
│   │   ├── scroll-reveal.tsx
│   │   ├── counter.tsx
│   │   └── index.ts
│   │
│   ├── backgrounds/               # Background effects
│   │   ├── gradient-mesh.tsx
│   │   ├── animated-blobs.tsx
│   │   ├── grid-pattern.tsx
│   │   ├── noise-texture.tsx
│   │   └── index.ts
│   │
│   ├── shared/                    # Shared components
│   │   ├── container.tsx
│   │   ├── section.tsx
│   │   ├── logo.tsx
│   │   ├── social-links.tsx
│   │   ├── scroll-indicator.tsx
│   │   └── index.ts
│   │
│   └── 3d/                        # Three.js components (optional)
│       ├── scene.tsx
│       ├── floating-shapes.tsx
│       └── index.ts
│
├── hooks/
│   ├── use-scroll-progress.ts
│   ├── use-in-view.ts
│   ├── use-mouse-position.ts
│   ├── use-media-query.ts
│   ├── use-mounted.ts
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── index.ts
│
├── lib/
│   ├── utils.ts                   # Utility functions (cn, etc.)
│   ├── animations.ts              # Framer Motion variants
│   ├── constants.ts               # App constants
│   ├── fonts.ts                   # Font configuration
│   ├── metadata.ts                # SEO metadata helpers
│   └── schemas.ts                 # Zod validation schemas
│
├── types/
│   ├── index.ts                   # Global types
│   └── components.ts              # Component prop types
│
└── config/
    ├── site.ts                    # Site configuration
    └── navigation.ts              # Navigation config
```

### Barrel Exports Pattern

```typescript
// src/components/ui/index.ts
export { Button, type ButtonProps } from "./button";
export { Card, CardHeader, CardContent, CardFooter } from "./card";
export { Input, type InputProps } from "./input";
export { Textarea } from "./textarea";
export { Badge } from "./badge";
export { Separator } from "./separator";
```

### Configuration Site (`config/site.ts`)

```typescript
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
```

---

## 🎨 DESIGN SYSTEM

### Utilities (`lib/utils.ts`)

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{2})(?=\d)/g, "$1 ");
}

/**
 * Delay utility for stagger animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamp a number between min and max
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
```

### Fonts Configuration (`lib/fonts.ts`)

```typescript
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

// Cal Sans - Custom display font
export const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  display: "swap",
  variable: "--font-cal",
});

export const fontVariables = `${inter.variable} ${jetbrainsMono.variable} ${calSans.variable}`;
```

---

## 🧩 COMPOSANTS UI

### Button Component

```tsx
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-xl",
    "text-sm font-semibold",
    "transition-all duration-300 ease-smooth",
    "focus-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "shadow-lg shadow-primary/25",
          "hover:shadow-xl hover:shadow-primary/30",
          "hover:-translate-y-0.5",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/90",
        ],
        outline: [
          "border-2 border-border bg-transparent",
          "hover:bg-muted hover:border-primary/50",
        ],
        ghost: ["bg-transparent", "hover:bg-muted"],
        glass: [
          "glass",
          "hover:bg-white/80 dark:hover:bg-white/10",
          "hover:-translate-y-0.5",
        ],
        gradient: [
          "text-white",
          "bg-gradient-to-r from-primary via-secondary to-accent",
          "bg-[length:200%_200%]",
          "hover:bg-[position:100%_0%]",
          "shadow-lg shadow-primary/25",
          "hover:shadow-xl hover:shadow-primary/40",
          "hover:-translate-y-0.5",
        ],
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### Card Component

```tsx
// src/components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-border bg-background",
      "shadow-glass",
      "transition-all duration-400 ease-smooth",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
```

### Glass Card Component

```tsx
// src/components/ui/glass-card.tsx
"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl p-6 md:p-8",
        "glass",
        "shadow-glass",
        hover && [
          "transition-all duration-400 ease-smooth",
          "hover:shadow-glass-lg",
          "hover:-translate-y-2",
        ],
        glow && "hover:shadow-glow",
        className,
      )}
      {...props}
    >
      {/* Gradient border effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "bg-linear-to-br from-primary/20 via-transparent to-secondary/20",
          "opacity-0 transition-opacity duration-400",
          hover && "group-hover:opacity-100",
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
```

### Input Component

```tsx
// src/components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl",
          "border border-border bg-background px-4 py-2",
          "text-base text-foreground",
          "placeholder:text-muted-foreground",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          "focus:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus:ring-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
```

---

## ✨ SYSTÈME D'ANIMATIONS

### Animation Variants (`lib/animations.ts`)

```typescript
import { type Variants } from "framer-motion";

// Easing presets
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  spring: { stiffness: 100, damping: 15 },
};

// Duration presets
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// Fade variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.smooth },
  },
};

// Fade up variants
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.slower,
      ease: easing.smooth,
    },
  },
};

// Fade down variants
export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
};

// Scale variants
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.bounce,
    },
  },
};

// Slide variants
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger items
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
};

// Hero text animation
export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -80,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: duration.slower,
      ease: easing.smooth,
    },
  }),
};

// Card hover animation
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
};

// Button hover animation
export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: duration.fast,
      ease: easing.bounce,
    },
  },
  tap: { scale: 0.98 },
};
```

### FadeIn Component

```tsx
// src/components/animations/fade-in.tsx
"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  blur?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.2,
  blur = true,
  className,
  ...props
}: FadeInProps) {
  const { ref, isInView } = useInView({ threshold, once });

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        filter: blur ? "blur(10px)" : "blur(0px)",
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : undefined
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### Split Text Animation

```tsx
// src/components/animations/split-text.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function SplitText({
  text,
  className,
  charClassName,
  staggerDelay = 0.03,
  once = true,
}: SplitTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="mr-[0.25em] inline-flex">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={child}
              className={cn("inline-block", charClassName)}
              style={{ transformOrigin: "bottom" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
```

### Parallax Layer

```tsx
// src/components/animations/parallax-layer.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
```

### Magnetic Button

```tsx
// src/components/animations/magnetic-button.tsx
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
```

### Counter Animation

```tsx
// src/components/animations/counter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.5, once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);

      // Easing function (ease-out-expo)
      const eased = 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(eased * end));

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}
```

---

## 🪝 HOOKS PERSONNALISÉS

### useInView Hook

```typescript
// src/hooks/use-in-view.ts
import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export function useInView({
  threshold = 0,
  once = false,
  rootMargin = "0px",
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, isInView };
}
```

### useScrollProgress Hook

```typescript
// src/hooks/use-scroll-progress.ts
import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
```

### useMousePosition Hook

```typescript
// src/hooks/use-mouse-position.ts
import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
```

### useMediaQuery Hook

```typescript
// src/hooks/use-media-query.ts
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Preset breakpoints
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsTablet() {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}
```

### useMounted Hook

```typescript
// src/hooks/use-mounted.ts
import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
```

---

## 🔍 SEO & PERFORMANCE

### Metadata Helper (`lib/metadata.ts`)

```typescript
import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: PageMetadataProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | ${siteConfig.tagline}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
```

### JSON-LD Schema Component

```tsx
// src/components/shared/json-ld.tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Phardev",
  url: "https://phardev.fr",
  logo: "https://phardev.fr/logo.png",
  description: "Solutions technologiques innovantes pour pharmacies",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "French",
  },
  sameAs: [
    "https://linkedin.com/company/phardev",
    "https://twitter.com/phardev",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Phardev",
  url: "https://phardev.fr",
  description: "Solutions technologiques innovantes pour pharmacies",
  publisher: {
    "@type": "Organization",
    name: "Phardev",
  },
};
```

### Image Optimization Pattern

```tsx
// Toujours utiliser next/image avec ces bonnes pratiques
import Image from "next/image";

// Exemple d'utilisation optimale
<Image
  src="/images/hero.webp"
  alt="Description précise et accessible"
  width={1920}
  height={1080}
  priority // Pour above-the-fold uniquement
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>;
```

---

## ♿ ACCESSIBILITÉ

### Checklist A11y

```markdown
## Avant chaque commit:

### Navigation

- [ ] Focus visible sur tous les éléments interactifs
- [ ] Skip link présent et fonctionnel
- [ ] Navigation possible au clavier uniquement
- [ ] Ordre de focus logique (tabindex géré)

### Contenu

- [ ] Contraste couleur >= 4.5:1 (texte) / 3:1 (grands textes)
- [ ] Textes alternatifs sur toutes les images
- [ ] Headings hiérarchisés (h1 > h2 > h3)
- [ ] Liens descriptifs (pas de "cliquez ici")

### Interactif

- [ ] ARIA labels sur les icônes/boutons
- [ ] États disabled visibles
- [ ] Messages d'erreur associés aux champs
- [ ] Animations désactivables (prefers-reduced-motion)

### Responsive

- [ ] Zoom 200% sans perte de contenu
- [ ] Touch targets >= 44x44px
```

### Focus Ring Utility

```tsx
// Composant réutilisable pour focus visible
export function FocusRing({ children }: { children: React.ReactNode }) {
  return (
    <span className="focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background rounded-lg">
      {children}
    </span>
  );
}
```

### Reduced Motion Support

```tsx
// Hook pour détecter prefers-reduced-motion
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// Utilisation dans les animations
const prefersReducedMotion = usePrefersReducedMotion();

const animationProps = prefersReducedMotion
  ? {} // Pas d'animation
  : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    };
```

---

## 🧪 TESTING & QA

### Checklist Pre-Deploy

```markdown
## Performance

- [ ] Lighthouse Score > 90 sur toutes les métriques
- [ ] Core Web Vitals dans le vert
- [ ] Images optimisées (WebP/AVIF)
- [ ] Fonts optimisées (subset, display swap)
- [ ] JS bundle < 200kb gzipped

## Cross-Browser

- [ ] Chrome (dernière version)
- [ ] Safari (dernière version)
- [ ] Firefox (dernière version)
- [ ] Edge (dernière version)
- [ ] Safari iOS
- [ ] Chrome Android

## Responsive

- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px - 1440px)
- [ ] Large (1440px+)

## SEO

- [ ] Meta tags présents
- [ ] Open Graph correct
- [ ] JSON-LD schemas valides
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré

## Fonctionnel

- [ ] Formulaire de contact fonctionne
- [ ] Navigation smooth scroll
- [ ] Dark mode toggle
- [ ] Animations 60fps
- [ ] Pas de console errors
```

---

## 🚀 DÉPLOIEMENT

### Configuration Vercel (`vercel.json`)

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["cdg1"],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Environnement Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://phardev.fr
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API (si formulaire backend)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=contact@phardev.fr
```

---

## 📚 RESSOURCES

### Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)

### Inspiration

- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)
- [Mobbin](https://mobbin.com/)

---

_Ce document est la source de vérité technique. Mets-le à jour au fur et à mesure du développement._
