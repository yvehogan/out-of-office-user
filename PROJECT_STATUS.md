# Out of Office - Project Context & Status

## Overview
**Project:** Out of Office Landing Page
**Tech Stack:** 
- Next.js 15.5.19 & React 19
- TypeScript
- Tailwind CSS v4 (with `@theme` configuration)
- shadcn/ui & tw-animate-css

## Architectural Details & Patterns
- **Tailwind v4 Configuration:** 
  - Custom brand colors integrated directly via `@theme` in `globals.css` (`brand-purple2`, `brand-purple`, `brand-green`, `brand-green2`, `brand-navy`).
  - Font fallback bug resolved: v4 nested variable evaluation issues bypassed by hardcoding `--font-ui` as `"DM Sans", sans-serif`.
- **Responsive & Interactive Layout:** 
  - Desktop utilizes a horizontal wheel-scroll container.
  - Mobile (`<1024px`) gracefully falls back to native vertical scrolling.
  - Extended breakpoint scaling uses exact arbitrary variants (e.g., `min-[1440px]:`).
- **CSS Scoping Mechanics:** 
  - The `landing-page` class is dynamically applied to `body` via `useEffect` to safely contain the `overflow: hidden` requirement without it bleeding into other future routes.

## What We've Accomplished So Far
1. **Repository Setup:** Cleaned up tracking (ignoring `.next/` in `.gitignore`), completed the Next.js migration into the `feature/landing-page` branch, and seamlessly merged everything into `main`.
2. **The Great Tailwind Conversion:** Scrapped the initial non-Tailwind bloated code exports. Fully converted all inline styling and CSS classes into Tailwind utility classes, successfully reducing `globals.css` from ~1,921 lines down to ~199 lines.
3. **Responsive Design Overhaul (This Morning's Progress):** 
  - Fixed cross-device layout behavior, ensuring native vertical scrolling on mobile devices (`<1024px`) and distinct horizontal wheel scrolling for desktop flows.
  - Fine-tuned tricky breakpoints, bypassing Tailwind limits by dropping in custom arbitrary constraints like `min-[1440px]:` for perfect ultra-wide display scaling.
  - Refactored component alignments and layout structures to be fully fluid across all screen sizes.
4. **Initial Component Modularization:** 
  - Extracted the global `Header` component and integrated it into the root `layout.tsx`.
  - Extracted complex UI card blocks into the `src/components/pages/home/` directory:
    - `beyond-card.tsx`: Standalone reusable component featuring custom SVG clip-paths and animated hover states. Perfected scaling and SVG cut-outs.
    - `shop-card.tsx`: Standalone reusable component for shop items featuring responsive image position handling. Product cut-offs elegantly pinned to card base.

## Current State & Next Steps
- **Branch:** Currently pushing tablet-responsive updates to `feature/tablet-responsive` (and syncing with `main`).
- **Status:** Tablet responsive improvements are the active focus. The mobile-to-tablet visual transition needs refinement to ensure layouts scale gracefully at the `md` breakpoint (~768px).
- **Target:** Expand strictly mobile-first classes with `md:` and `lg:` queries based on an AI-generated structural wireframe.
- **Specific Tasks (Tablet Scaling):**
  - **Hero:** Transition from column stacking to `md:flex-row`.
  - **Quote:** Shift to a 2-column grid (`md:grid-cols-2`).
  - **Shop:** Morph the 1-column list into a 2x2 grid (`md:grid md:grid-cols-2`).
  - **Author:** Align to a side-by-side flex layout (`md:flex-row`).
  - **Footer:** Two columns (Newsletter + Contact).
- **Open Discussion:** Reviewing overall mobile-to-tablet transition quality — identifying areas where the layout jump feels abrupt or visually unpolished.
