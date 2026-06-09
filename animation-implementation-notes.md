# Landing Page Animation - Implementation Notes

This document serves as a record of the animation choreography and technical decisions made for the landing page (`src/app/page.tsx`). It is intended to help future developers or LLMs pick up the context smoothly.

## Technology Stack
- **Library:** `framer-motion` (^12.40.0)
- **Reasoning:** Chosen over GSAP and native Tailwind/CSS. Framer Motion provides the best declarative API for React/Next.js, easily handling lifecycle states, group animations, and strict timing delays without excessive boilerplate or messy keyframe keying.
- **Scroll-driven animations:** `useScroll` + `useTransform` from Framer Motion for scroll-linked motion values.

---

## Section 1: Hero Entrance Animation ✅ (Complete — pushed to GitHub)

### Global Animation Rules
After analyzing the reference video (`better.mp4`), the following rules were established:
- **Delay:** `1s` (`1000ms`). The page loads blank for exactly 1 second before anything moves.
- **Duration:** `1.5s` (`1500ms`). All items animate and arrive at their final destination simultaneously.
- **Easing:** Default Framer Motion easing (no custom curve applied).
- **Synchronization:** Elements are NOT staggered. They all wait 1 second, then execute their 1.5-second journey at the exact same time.
- **Overshoot:** All elements scale slightly past their final size (`1.08`) at 82% of the animation, then settle back to `1.0` — gives a "plop" / landing-with-weight feel.

### 4-Frame Visual Sequence
1. **Blank (0–1s):** Only the header is visible. All hero content is invisible (`opacity: 0`), displaced, and scaled down to 30%.
2. **Peek (~1.1s):** Tiny bits of elements barely emerging from their start positions.
3. **Mid-flight (~1.5s):** Elements clearly in motion, halfway to their destination.
4. **Landed (~2.5s):** Everything settled — scale overshoots to 1.08, then eases back to 1.0.

### Element Choreography

#### Text Elements (Label, Title+Description, Pre-order Button)
- **Origin:** Left side — all three expand outward from their left edge.
- **Initial State:** `opacity: 0, x: -80, scale: 0.3`
- **Transform Origin:** `left center` (scale grows rightward from the anchored left edge)
- **Animate:** `opacity: 1, x: 0, scale: [0.3, 1.08, 1]`
- **Key insight:** No vertical (y) displacement — they stay at their natural vertical position.

#### Book Image (Right Side)
- **Origin:** Bottom-right diagonal. Starts small and pushed to the bottom-right, sweeping diagonally up-left into place.
- **Initial State:** `opacity: 0, x: 80, y: 80, scale: 0.3`
- **Transform Origin:** `bottom right` (initial) → `center` (final, to avoid conflicts with Tailwind responsive scales)
- **Animate:** `opacity: 1, x: [80, -6, 0], y: [80, -6, 0], scale: [0.3, 1.08, 1]`
- **Pullback:** The x/y overshoot (`-6`) ensures the settle-back follows the same diagonal path it arrived from, not just a scale shrink.
- **Key insight:** The `transformOrigin` resets to `center` in the `animate` state because Tailwind classes `md:scale-[1.15]` and `lg:scale-[1.05]` would otherwise scale from bottom-right on tablet views, pushing the book into the text.

### Scrollbar Handling
- **Problem:** The custom horizontal scrollbar (`bg-brand-purple2`) would flash at an incorrect position during the 1s blank period because animated elements at `scale: 0.3` reduce perceived content width.
- **Solution:** The `hide-scrollbar` class is applied directly in the JSX (server-rendered), so the scrollbar is hidden from the very first paint. A `useEffect` removes the class after 2500ms (1s delay + 1.5s animation = settled).
- **CSS:** `#scroll-container.hide-scrollbar` hides both webkit and Firefox scrollbars.

### Production Fix: Book Image CSS Conflict
- **Problem:** In production, Tailwind's `transition-transform duration-300` (for hover effect) was applied from first paint, fighting Framer Motion's animation and causing the book to desync from text.
- **Solution:** Removed CSS transition classes from the element. A `useEffect` adds them back via `bookRef` after 2600ms (once the entrance animation is complete), restoring the hover effect without conflicting.

### Decisions & Tradeoffs
- **No custom easing:** Default Framer Motion easing felt better than `[0.25, 0.1, 0.25, 1.0]` (too sluggish) or `[0.16, 1, 0.3, 1]` (too abrupt).
- **Book travel distance:** Reduced from `x: 150, y: 150` to `x: 80, y: 80` to prevent the book from visibly lagging behind the text.
- **Overshoot timing (`times: [0, 0.82, 1]`):** The element reaches its overshoot peak at 82% of the duration, leaving 18% (~270ms) for the gentle settle-back.

---

## Section 2: "There Is More to Life" — Scroll-Triggered Animation ✅ (Complete)

### Scroll Tracking Setup
```ts
const { scrollXProgress } = useScroll({
  target: thereIsMoreRef,
  container: scrollContainerRef,
  axis: "x",
  offset: ["start end", "center center"]
});
```
- Tracks horizontal scroll progress of the section relative to the viewport.
- Progress goes from `0` (section just entering from the right) to `1` (section centered in viewport).

### Three-Circle Icon Animation
The section has an SVG with three colored circles (red, green, purple). They animate into their final clustered position as the user scrolls.

- **Green circle:** Starts 60px lower (between red/purple in a vertical line), moves up to final position.
  - `y: [60, 0]` driven by `scrollXProgress [0, 1]`
- **Purple circle:** Starts 150px to the right, moves left to center.
  - `x: [150, 0]` driven by `scrollXProgress [0, 1]`
- **Red circle:** Starts 150px to the left, moves right to center.
  - `x: [-150, 0]` driven by `scrollXProgress [0, 1]`
- **Container:** Uses `overflow-visible` to prevent circle clipping during spread.

#### Known Issue: Eye-Shape Cutout Artifact
When the red and purple circles converge, there's a visible eye-shaped cutout between them. This is caused by a static "overlap detail" `<path>` in the original SVG (`d="M186.842 255.604..."`, fill `#5700FF`) that was designed to fill the intersection when circles are in their final resting position. Since the circles now animate from spread positions, this static path creates a visible artifact during motion. **Fix:** Either remove the path, or wrap it in its own `<motion.g>` that fades in at the end of the scroll.

### Text Block Animation
- **Trigger range:** `scrollXProgress [0.4, 0.85]` — text animates in the second half of the scroll, after the icons have mostly settled.
- **Opacity:** `[0, 1]` over `[0.4, 0.85]`
- **Scale:** `[0.3, 1.08, 1]` over `[0.4, 0.85, 1]` (same overshoot as hero)
- **X:** `[80, 0]` — enters from the right
- **Y:** `[60, 0]` — enters from below
- **Transform Origin:** `bottom right` — grows outward from bottom-right corner (diagonal entry feel)

---

## Section 3: Beyond the Book — Scroll-Triggered Card Scaling ✅ (Complete)

### Concept
Four cards (Community, Podcast, Tour, Newsletter). Card 1 (Community) stays static as the anchor. Cards 2-4 start stacked **behind** card 1 at `scale: 0.3` with negative x-offsets, then scale out to their final positions simultaneously as the user scrolls.

### Scroll Tracking Setup
```ts
const { scrollXProgress: beyondScrollProgress } = useScroll({
  target: beyondRef,
  container: scrollContainerRef,
  axis: "x",
  offset: ["start end", "start center"]
});
```
- Animation starts when the section's left edge enters from the viewport's right edge.
- Animation completes when the section's left edge reaches the viewport center (title "The OUT OF OFFICE" visible).

### Card Offsets (Responsive)
**Large desktop (≥1400px / 2xl — 430px slot):**
| Card | Start X | End X |
|------|---------|-------|
| Card 1 (Community) | 0 (static) | 0 |
| Card 2 (Podcast) | -430 | 0 |
| Card 3 (Tour) | -860 | 0 |
| Card 4 (Newsletter) | -1290 | 0 |

**Smaller desktop (1280–1399px / xl — 296px slot):**
| Card | Start X | End X |
|------|---------|-------|
| Card 1 (Community) | 0 (static) | 0 |
| Card 2 (Podcast) | -296 | 0 |
| Card 3 (Tour) | -592 | 0 |
| Card 4 (Newsletter) | -888 | 0 |

### Scale
- All cards 2-4 share one scale value: `[0.3, 1]` driven by `beyondScrollProgress [0, 1]`
- `transform-origin: left` — cards grow outward from their left edge (emerging from behind card 1)

### Z-Index Stacking
- Card 1 (Community): `z-[4]` — always in front
- Card 2 (Podcast): `z-[3]`
- Card 3 (Tour): `z-[2]`
- Card 4 (Newsletter): `z-[1]` — behind all others when stacked

---

## Section 4: Shop Cards — Scroll-Triggered Stacking Animation ✅ (Complete)

### Concept
Four product cards (Planner, T-Shirt, Hoodie, Cap) start visually stacked on top of each other at the Planner's position (leftmost card). As the user scrolls the shop section into view, the cards fan out to the right into their final grid positions.

### Scroll Tracking Setup
```ts
const { scrollXProgress: shopScrollProgress } = useScroll({
  target: shopRef,
  container: scrollContainerRef,
  axis: "x",
  offset: ["start center", "center center"]
});
```

### Card Offsets (Responsive)
Cards are offset by negative x values that stack them leftward. At `scrollXProgress = 1`, all offsets resolve to `0` (natural layout position).

**Large desktop (≥1400px / 2xl — 400px wide cards):**
| Card | Start X | End X |
|------|---------|-------|
| Planner (card 1) | 0 | 0 |
| T-Shirt (card 2) | -367 | 0 |
| Hoodie (card 3) | -733 | 0 |
| Cap (card 4) | -1100 | 0 |

**Smaller desktop (1280–1399px / xl — 280px wide cards):**
| Card | Start X | End X |
|------|---------|-------|
| Planner (card 1) | 0 | 0 |
| T-Shirt (card 2) | -277 | 0 |
| Hoodie (card 3) | -553 | 0 |
| Cap (card 4) | -830 | 0 |

### Z-Index Stacking
- Card 1 (Planner): `z-[1]` (bottom of stack)
- Card 2 (T-Shirt): `z-[2]`
- Card 3 (Hoodie): `z-[3]`
- Card 4 (Cap): `z-[4]` (top of stack, visible when stacked)

### Responsive Detection
```ts
const [isLargeDesktop, setIsLargeDesktop] = useState(false);
useEffect(() => {
  const check = () => setIsLargeDesktop(window.innerWidth >= 1400);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);
```

### Key Decisions
- Offsets calculated as: `-(cardWidth + gap) * position`. Each card shifts by exactly one card slot.
- Cap (card 4) is on top of the stack visually (highest z-index) so it's the first thing users see.
- Animation only active on `xl+` (horizontal scrolling layout). On mobile/tablet, cards display in a static grid.

---

## Section 6: Newsletter — Scroll-Triggered Scale-In ✅ (Complete)

### Concept
The "Stay in the loop" heading stays static. The description text ("Join thousands of readers...") and the form (email input + Subscribe button) scale in from the top-right corner as the section scrolls into view.

### Scroll Tracking Setup
```ts
const { scrollXProgress: newsletterScrollProgress } = useScroll({
  target: newsletterRef,
  container: scrollContainerRef,
  axis: "x",
  offset: ["start end", "start center"]
});
```

### Animation Values
- **Scale:** `[0.3, 1]` over `[0, 1]`
- **X:** `[80, 0]` — enters from the right
- **Y:** `[-60, 0]` — enters from above
- **Opacity:** `[0, 1]`
- **Transform Origin:** `top right`

### Elements Animated
- `<motion.p>` — description text
- `<motion.form>` — email input + Subscribe button

Both animate simultaneously with the same motion values.

---

## Section 7: Contact (Get in Touch) — Scroll-Triggered Scale-In ✅ (Complete)

### Concept
The "Let's Talk" heading stays static. The form section scales in from the bottom-left. The contact info (Website, Email, Phone) scales in from the top-right. Both animate simultaneously.

### Scroll Tracking Setup
```ts
const { scrollXProgress: contactScrollProgress } = useScroll({
  target: contactRef,
  container: scrollContainerRef,
  axis: "x",
  offset: ["start end", "start center"]
});
```

### Form Animation (bottom-left origin)
- **Scale:** `[0.3, 1]` over `[0, 1]`
- **X:** `[-80, 0]` — enters from the left
- **Y:** `[60, 0]` — enters from below
- **Opacity:** `[0, 1]`
- **Transform Origin:** `bottom left`

### Info Panel Animation (top-right origin)
- **Scale:** `[0.3, 1]` over `[0, 1]`
- **X:** `[80, 0]` — enters from the right
- **Y:** `[-60, 0]` — enters from above
- **Opacity:** `[0, 1]`
- **Transform Origin:** `top right`

---

## General Architecture Notes

### Responsiveness
- All animations apply on **all screen sizes** for entrance (hero).
- Scroll-driven animations (section 2, shop) only produce visible effects on `xl+` where horizontal scrolling is active. On mobile/tablet, the layout is vertical with no horizontal scroll tracking.
- The `transformOrigin: "center"` reset on the book prevents layout conflicts on tablet where Tailwind responsive scales are active.

### Refs Used
| Ref | Purpose |
|-----|---------|
| `scrollContainerRef` | Main horizontal scroll container (`<main>`) — used as `container` for all `useScroll` hooks |
| `thereIsMoreRef` | Section 2 target for scroll progress tracking |
| `shopRef` | Shop section target for scroll progress tracking |
| `beyondRef` | Beyond the Book section target for scroll progress tracking |
| `newsletterRef` | Newsletter section target for scroll progress tracking |
| `contactRef` | Contact section target for scroll progress tracking |
| `bookRef` | Hero book image — used to add CSS transition classes after animation completes |

### Horizontal Scroll Setup
- `<main>` has `xl:overflow-x-auto xl:overflow-y-hidden xl:whitespace-nowrap` for horizontal layout on desktop.
- A `useEffect` with a `wheel` event listener converts vertical scroll (`deltaY`) to horizontal scroll (`scrollLeft`) on `xl+`.
- Each section uses `xl:shrink-0 xl:inline-flex` to sit side-by-side.
