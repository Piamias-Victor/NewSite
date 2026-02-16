# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Phardev** is a modern Next.js landing page for pharmacy tech solutions, featuring premium animations, 3D backgrounds, and a sophisticated design system. Built with Next.js 16, React 19, TypeScript, and heavily focused on visual polish using GSAP, Framer Motion, and Three.js.

## Development Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 16.1.3 (App Router)
- **Language:** TypeScript 5 (strict mode enabled)
- **Styling:** Tailwind CSS 4 with custom OKLCH color palette
- **Animation:** Framer Motion 12.27.1, GSAP 3.14.2
- **3D Graphics:** Three.js 0.182.0
- **UI Components:** Custom components with class-variance-authority
- **Theming:** next-themes for dark/light mode
- **React:** React 19.2.3 with React Compiler enabled

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts, theme provider, metadata
│   ├── page.tsx           # Main page (hero → services → ROI → testimonials → contact)
│   └── globals.css        # Global styles, theme colors, animations, keyframes
│
├── components/
│   ├── animations/        # Reusable animation wrappers
│   │   ├── fade-in.tsx   # Scroll-triggered fade with directional variants
│   │   ├── split-text.tsx # Character-level text animation with 3D rotation
│   │   ├── typing-effect.tsx
│   │   ├── counter.tsx
│   │   ├── magnetic-button.tsx
│   │   └── parallax-layer.tsx
│   │
│   ├── backgrounds/       # Full-screen animated backgrounds
│   │   ├── infinite-tunnel.tsx # Three.js 3D tunnel with image grid (main hero)
│   │   ├── gradient-mesh.tsx   # Canvas-based gradient animations
│   │   └── ...
│   │
│   ├── layout/            # Layout wrappers
│   │   ├── header.tsx    # Sticky nav with smooth scroll & mobile menu
│   │   ├── container.tsx # Responsive max-width wrapper (max-w-7xl)
│   │   └── section.tsx   # Standardized section padding
│   │
│   ├── sections/          # Page sections
│   │   ├── hero/
│   │   ├── services/
│   │   ├── vision/
│   │   ├── roi-simulator.tsx
│   │   ├── testimonials.tsx
│   │   └── contact-form.tsx
│   │
│   ├── ui/                # Primitive UI components (design system)
│   │   ├── button.tsx    # CVA-based with gradient/glass/outline variants
│   │   ├── card.tsx
│   │   ├── bento-grid.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   └── theme-provider.tsx
│
├── config/
│   └── site.ts           # Site metadata, contact info, social links
│
└── lib/
    ├── utils.ts          # Utility functions (cn, formatting, math helpers)
    └── fonts.ts          # Font config (Inter + JetBrains Mono)
```

### Component Organization Pattern

The codebase follows a **layered architecture**:

1. **UI Layer** (`/ui`): Primitive, reusable components (Button, Card, Input)
2. **Animation Layer** (`/animations`): Wrapper components adding motion behavior
3. **Background Layer** (`/backgrounds`): Full-screen visual effects
4. **Layout Layer** (`/layout`): Structural components (Header, Container, Section)
5. **Sections Layer** (`/sections`): Feature-specific page sections

Each component folder has an `index.ts` barrel export for clean imports:
```typescript
import { FadeIn, SplitText, Counter } from "@/components/animations"
```

### Key Architectural Decisions

**Single-Page Architecture:**
- One main page (`app/page.tsx`) with hash-based navigation (#hero, #services, etc.)
- Smooth scrolling handled by Header component
- All sections rendered on initial load

**Client vs Server Components:**
- Interactive components use `"use client"` directive
- Root layout is server component for metadata/SEO
- Most UI components are client-side due to animations

**Animation Strategy:**
- **Framer Motion** for scroll-triggered animations (`useInView`, `useScroll`, `useTransform`)
- **GSAP** for complex sequences and Three.js integration
- **Canvas/Three.js** for 3D effects (InfiniteTunnel, GradientMesh)

**Styling System:**
- Tailwind utility classes with custom design tokens
- CSS variables for theming (`--primary`, `--secondary`, `--accent`)
- OKLCH color system for consistent color perception
- Glass morphism effects with backdrop blur
- CVA (class-variance-authority) for component variants

**TypeScript Configuration:**
- Strict mode with additional safety checks:
  - `noUncheckedIndexedAccess: true`
  - `exactOptionalPropertyTypes: true`
  - `noImplicitReturns: true`
- Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/styles`

## Development Conventions

### Imports
Always use path aliases:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { FadeIn } from "@/components/animations"
```

### Styling
- Prefer Tailwind utility classes over custom CSS
- Use `cn()` utility for conditional class merging
- Theme colors accessed via CSS variables: `bg-primary`, `text-foreground`
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)

### Client Components
Mark interactive components with `"use client"`:
```typescript
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
```

### Animation Properties
Standard timing values:
- **Duration:** 0.3-0.6s for UI interactions, 2-4s for hero animations
- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` (smooth)
- **Stagger:** 0.1-0.2s between elements

### Color System
The design uses OKLCH for perceptually uniform colors:
```css
--primary: oklch(62% 0.2 30)    /* Copper */
--secondary: oklch(66% 0.16 40) /* Bronze */
--accent: oklch(72% 0.14 50)    /* Rose Gold */
```

Light/dark mode variants use `.light_` and `.dark_` class prefixes.

## Important Configuration

### React Compiler
Enabled in `next.config.ts` for automatic performance optimization:
```typescript
reactCompiler: true
```

### Performance Settings
- Three.js power preference: `"high-performance"`
- Pixel ratio clamped to 2x max for mobile
- RequestAnimationFrame for canvas updates

### Navigation
Smooth scroll to sections via hash links in Header component:
```typescript
// Handled automatically - links like #hero, #services work out of the box
```

## Working with Animations

### Scroll-Triggered Animations
Use the `FadeIn` component wrapper:
```typescript
<FadeIn direction="up" delay={0.2}>
  <YourComponent />
</FadeIn>
```

### Text Animations
- `SplitText`: Character-by-character with 3D rotation
- `TypingEffect`: Typewriter effect with cursor

### Custom Animations
Check `app/globals.css` for available keyframes:
- `animate-float`, `animate-pulse-glow`, `animate-gradient`
- `animate-marquee`, `animate-fade-up`, `animate-scale-in`

## Three.js Integration

The `InfiniteTunnel` background component:
- Located at `components/backgrounds/infinite-tunnel.tsx`
- Uses Three.js for 3D tunnel effect
- Renders image tiles in a cylindrical layout
- Auto-rotates on scroll
- Performance optimized with `powerPreference: "high-performance"`

## Common Patterns

### Creating a New Section
1. Create in `components/sections/your-section/`
2. Add barrel export in `index.ts`
3. Import in `app/page.tsx`
4. Add navigation link in `components/layout/header.tsx`

### Adding UI Components
1. Create in `components/ui/your-component.tsx`
2. Use CVA for variants if applicable
3. Export through `components/ui/index.ts`
4. Follow existing component patterns (forwardRef, displayName)

### Theming
- Colors defined in `app/globals.css` under `:root` and `.dark`
- Access via Tailwind: `bg-primary`, `text-accent`, etc.
- Use `adaptive-*` classes for auto light/dark variants

## Troubleshooting

### Build Issues
- Ensure all client components have `"use client"` directive
- Check TypeScript strict mode compliance
- Verify Three.js types are installed: `@types/three`

### Animation Performance
- Reduce motion on mobile with `prefers-reduced-motion` media query
- Use `will-change` CSS property sparingly
- Consider disabling Three.js effects on low-end devices

### Theme Issues
- Ensure ThemeProvider wraps app in `layout.tsx`
- CSS variables must be defined in `globals.css`
- Use `className` prop (React), not `class`
