# Principal Engineer Code Review

## 1. Component Modularity & DRY (Don't Repeat Yourself)
* **The Monolithic `page.tsx`**: Right now, `src/app/page.tsx` is over 400 lines of dense, inline layout code. 
  * *Solution*: Extract these sections (Hero, Author, Shop, Beyond, Newsletter, Contact) into dedicated components inside `src/components/pages/home/`. This improves readability and prevents merge conflicts.
* **The Button Hover Repetition**: We copy-pasted the complex nested `<span>` logic for the slide-up animation across four different buttons. 
  * *Solution*: This DOM structure should be abstracted directly into the `Button` component in `src/components/ui/button.tsx` (perhaps as a new `variant="animated"`), so we just write `<Button variant="animated">Subscribe</Button>`.
* **Repeated SVGs**: The social icons and the 50px line separator are hardcoded SVGs repeated multiple times. 
  * *Solution*: Convert them into reusable local components (e.g., `<SectionDivider />`, `<SocialIcon type="linkedin" />`).

## 2. Tailwind Anti-Patterns
* **The `!important` Overload**: We heavily leveraged the `!important` modifier for our ultra-wide breakpoints (e.g., `2xl:!w-[650px]`). In Tailwind, `!` is a signal that our CSS cascade might be brittle. 
  * *Solution*: Refactor the base classes so the breakpoints flow naturally (mobile -> `md:` -> `xl:` -> `2xl:`) without needing absolute force to override leaky utility classes.
* **Arbitrary Values vs. Design Tokens**: We are using raw pixels (`gap-[30px]`, `pt-[54px]`) everywhere.
  * *Solution*: Migrate these to standard Tailwind spacing scales (`gap-8`, `pt-14`), or define them in `globals.css` if they are unbreakable design-system rules.
* **Color Inconsistencies**: There are inline styles like `style={{ color: "#21015F" }}` and raw hex classes `text-[#5700FF]` scattered around.
  * *Solution*: Strictly leverage the variables (like `text-brand-purple`) already defined in the CSS configuration.

## 3. Native Next.js Optimization
* **Raw `<img>` Tags**: In the Author and Hero sections, we used standard HTML `<img src="...">` tags.
  * *Solution*: Convert these to Next.js `<Image>` components (similar to `event-card.tsx`). This provides automatic WebP compression, lazy loading, and prevents Cumulative Layout Shift (CLS).

## 4. Forms & State
* **Fake Submit Handlers**: The Newsletter and Contact forms currently use inline JavaScript: `onSubmit={(e) => { e.preventDefault(); alert("..."); }}`.
  * *Solution*: Extract this logic into a proper client-side hook, validate inputs (with Zod/React Hook Form), and use a real UI Toast component for success messages instead of browser alerts.