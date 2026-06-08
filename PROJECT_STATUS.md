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
3. **Responsive Design Overhaul (Initial):** 
  - Fixed cross-device layout behavior, ensuring native vertical scrolling on mobile devices (`<1024px`) and distinct horizontal wheel scrolling for desktop flows.
  - Fine-tuned tricky breakpoints, bypassing Tailwind limits by dropping in custom arbitrary constraints like `min-[1440px]:` for perfect ultra-wide display scaling.
  - Refactored component alignments and layout structures to be fully fluid across all screen sizes.
4. **Initial Component Modularization:** 
  - Extracted the global `Header` component and integrated it into the root `layout.tsx`.
  - Extracted complex UI card blocks into the `src/components/pages/home/` directory:
    - `beyond-card.tsx`: Standalone reusable component featuring custom SVG clip-paths and animated hover states. Perfected scaling and SVG cut-outs.
    - `shop-card.tsx`: Standalone reusable component for shop items featuring responsive image position handling. Product cut-offs elegantly pinned to card base. Built dedicated separate absolute wrappers targeting `xl:hidden` (small viewports) and `hidden xl:block` (desktop) safely.
5. **Tablet Responsive Improvements:**
  - Standardized tablet layout padding to 48px (`md:px-12`) across all main sections (`<section>`) and the `<Header />` to give content breathing room without hugging screen edges.
  - Fixed the Hero layout, utilizing a 50/50 container constraint (`md:w-1/2`) but employing `md:w-[130%]` scale overrides and negative margins (`md:-ml-8`, `md:-mr-12`) to keep the book visual oversized and overlapping the left text container seamlessly.
  - Rectified horizontal scrolling overflow spacing on mobile/tablet by clipping the main wrapper via `overflow-x-hidden`.
  - Corrected the vertical layout in the "There is more" section up to the top, toggling the ornament icon's DOM position between Desktop (`hidden md:block`) vs Mobile (`block md:hidden`).
  - Minimized gap spacing down to 6px (`gap-[6px]`) across the "Wear the movement" product grid.
  - Refactored Newsletter and Contact sections to neatly stack (`flex-col w-full`) until hitting the extra-large `xl` desktop breakpoints.
  - Corrected the `Subscribe` and `Send Message` buttons' base styles (matched heights and `text-[16px]` uniform font sizing).
6. **Desktop Horizontal Architecture Strategy (1280px vs 1440px+):**
  - **The Core Desktop Problem (1280x720 screens):** Since the website forces **horizontal scrolling** (`flex-row`) at Desktop (`xl` boundaries), the viewport width (1280px narrowest desktop) isn't the primary challenge — *viewport height* is. Small laptop heights (~650px visible height) were abruptly cutting off card bottoms and section text because Figma layouts were natively built to massive sizes (`80px` typography strings, `460px` tall cards).
  - **The "Two-Breakpoint" Standard Solution:** Implemented a very strict two-desktop breakpoint approach leveraging CSS `calc(100vh)` properties.
    - **A: Standard Laptop (`xl` / 1024px-1280px):** Functions under strict vertical austerity measures. Section container classes utilize `xl:h-[calc(100vh-120px)]` to force content to remain floating securely within laptop heights. Heavy font reduction occurs (e.g. `xl:text-[22px]`, `xl:w-[280px]` hard locks for cards). Massive `60px` horizontal paddings between section wrappers are compressed dynamically to limit wasted white space to `24px` paddings, which brings sections smoothly closer during horizontal scrolls.
    - **B: Ultra-Wide Monitors (`2xl` / 1440px+):** We implemented a custom `var(--breakpoint-2xl: 1440px)` in `globals.css`. Anything placed into a `2xl:` tailwind block will revert explicitly *back* to the massive padding, full component `h-full` stretching freedom, and ultra-large fluid fonts referenced from full-sized Mockups. 
    - **Header Scaling Constraint:** Explicitly established that the logo SVG should intelligently scale *downwards* from mobile `110px` to small laptops `100px` (where cursor usage implies tighter layouts are standard precision UI) and subsequently balloon specifically for `2xl:` screens upwards to `139px` wide.

7. **Horizontal Flex Layout Fixes (Desktop):**
  - **The Squeeze Problem:** Flexbox natively tries to shrink items (`flex-shrink: 1`) to fit everything on a screen. Because desktop relies on horizontal scrolling, this default behavior was completely collapsing fixed-width columns against each other.
  - **The Solution:** We aggressively apply `xl:shrink-0` to column wrappers (like in the Shop cards, Author portrait/text columns, Newsletter section, and Contact form/details). This strictly forces them to claim their assigned fixed width (`xl:w-[...]`), preserving horizontal scrolling length instead of stacking/overlapping.
  - **Text Wrapping in Horizontal Flow:** Ensure wrappers also receive `xl:whitespace-normal` in any section where long text blocks exist (e.g. Newsletter intro, Author bios). Because the overarching container uses `whitespace-nowrap` to force horizontal alignment, forgetting to re-declare `whitespace-normal` on text elements will violently stretch columns infinitely to the right, ignoring strict widths.
  - **The Author Section Tuning:** Tightly spaced the Author section by dropping standard gaps (`xl:gap-[0px]`) and expanding text columns (`xl:w-[290px]`) so text does not flow overwhelmingly deep vertically. Positioned the author portrait with negative margins (`xl:-ml-[20px] xl:mr-[20px]`) to overlap sections properly.
  - **Contact & Newsletter Tuning:** Eradicated accidental vertical centering by enforcing `xl:justify-start` across the board, snapping headings dynamically to the top baseline. Corrected Contact details colors by removing `xl:text-inherit` (which bled dark styles onto desktop) and rigidly enforcing `text-[#5700FF]`. Pin-pointed tight spacing rules for inputs (locking heights) and brought the Let's Talk form wrapper and Web Details wrapper (`xl:w-[360px]`) right next to each other to drop dead space. Hooked the footer copyright up dynamically via `xl:mt-auto` strictly inside its column edge.

## Current State & Next Steps
- **Branch:** `feature/desktop-xl-refactor` (recently spun off `main`).
- **Status:** Mobile and Tablet responsiveness has been completely established. We recently perfected the horizontal-scrolling flex strategy for the **Hero** and **"There is more"** sections specifically for **small Desktop (1280px `xl`)** viewports.
  - **Hero Section:** Stripped out absolute positioning hacks. The floating book is now an integrated flex child. Increased the book's scale (`xl:w-[125%]`, `xl:mt-[140px]`, `xl:-ml-[20px]`) and positioned it perfectly adjacent to the hero text (`xl:pt-[64px]`, title bumped to `xl:text-[64px]`).
  - **"There is more" Section:** Solidified the layout into a tightly controlled two-column horizontal flow. Kept structural `<br>` line breaks while natively containing widths (`xl:w-[560px]` for the quote, `xl:w-[450px]` for text block). Removed overlapping gaps (`xl:gap-0 xl:mr-[10px]`) and perfectly aligned the circular SVG ornament to visually bridge the space (`xl:-right-[60px] xl:-bottom-[100px]`).
  - *Previous work successfully wrapped the Shop, Author, Newsletter, and Contact sections using the `xl:shrink-0` controls.*
- **Next Steps:**
  - Standardize remaining sections up to the `1440px+ (2xl)` ultra-wide monitor scale. 
  - Ensure any new horizontally scrolled items on desktop rigidly utilize the `xl:shrink-0` methodology.
  - Finalize component linkages, routing (like mapping all Shop CTAs), and interactive polish (framer motion/React Spring animations if requested).
