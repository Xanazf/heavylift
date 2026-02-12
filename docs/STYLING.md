# STYLING - Design System Foundation & Implementation Guide

This document establishes the theoretical foundation and practical implementation of the HeavyLift design system, built on **Liftkit's golden ratio-based sizing system seamlessly integrated with Tailwind CSS v4**. This unique combination provides the mathematical precision of the golden ratio (φ ≈ 1.618) with the utility-first flexibility of modern Tailwind CSS.

## Liftkit + Tailwind v4 Integration

Our design system merges two powerful approaches:

- **Liftkit's Golden Ratio Foundation**: Mathematical spacing and sizing based on φ (1.618) for naturally harmonious proportions
- **Tailwind v4's Modern Architecture**: Lightning CSS-powered utility classes with improved performance and developer experience
- **Unified CSS Custom Properties**: Liftkit's golden ratio variables work seamlessly with Tailwind's utility system
- **Enhanced Accessibility**: Root font size-based scaling ensures both systems respect user preferences

## Project Implementation

This project demonstrates the **integration of Liftkit's golden ratio-based sizing with Tailwind CSS v4**, creating a design system that is:

- **Mathematically Harmonious**: Golden ratio spacing (phi ≈ 1.618) creates naturally pleasing proportions
- **Utility-First**: Tailwind v4's utility classes enhanced with Liftkit's golden ratio variables
- **Performance Optimized**: Lightning CSS compilation for faster builds and smaller bundles
- **Mobile-First**: Compact defaults with progressive enhancement using both systems
- **Accessibility-Focused**: Root font size scaling works across both Liftkit and Tailwind utilities

---

## Technical Integration Details

### How Liftkit + Tailwind v4 Work Together

#### CSS Custom Properties Bridge
Liftkit's golden ratio variables are exposed as CSS custom properties that Tailwind v4 can consume:

```css
/* Liftkit's golden ratio foundation (from vars.css) */
:root {
  --scaleFactor: 1.618;
  --wholestep: 1.618;
  --halfstep: 1.272;
  --quarterstep: 1.128;
  
  /* Spacing scale based on golden ratio */
  --xs: calc(1em / var(--scaleFactor) / var(--scaleFactor));
  --sm: calc(1em / var(--scaleFactor));
  --md: 1em;
  --lg: calc(1em * var(--scaleFactor));
  --xl: calc(var(--lg) * var(--scaleFactor));
  --2xl: calc(var(--xl) * var(--scaleFactor));
}
```

#### Tailwind v4 Arbitrary Value Integration
These variables work seamlessly with Tailwind's arbitrary value syntax:

```html
<!-- Golden ratio spacing in Tailwind utilities -->
<div class="gap-[var(--md)] p-[var(--lg)] m-[var(--sm)]">

<!-- Responsive scaling with golden ratio -->
<div class="gap-[var(--sm)] sm:gap-[var(--md)] lg:gap-[var(--lg)]">
```

#### Lightning CSS Optimization
- **Dead code elimination**: Unused variables are removed
- **Value inlining**: Frequently used values are inlined for performance
- **Cascade optimization**: CSS cascade is optimized for golden ratio relationships

---

## Spacing

### Core Design Principles

#### Spacing Philosophy
- **Relative spacing enhances accessibility and responsiveness**: Spacing is defined relative to font size (using rem units) to ensure layouts scale proportionally when users adjust browser font sizes or zoom levels
- **Root font size as the base unit**: Creates a universal scaling system that leverages an existing browser standard
- **Spacing relative to the larger element**: Maintains visual harmony when multiple text styles coexist within a component
- **Golden ratio spacing system**: Uses seven preset spacing variables based on the golden ratio (≈1.618) for aesthetically pleasing proportions
- **Optical corrections**: Subtle adjustments account for visual weight distribution and perceived balance

#### The Three Laws of Spacing
1. **Relationship strength dictates spacing**: Elements that belong together (e.g., heading and subheading) should be tightly grouped
2. **Content changes context**: Spacing decisions are dynamic and must adapt to evolving content and purpose
3. **Preset systems reduce guesswork**: Using predefined spacing scales ensures consistency and prevents poor spacing choices

### Implementation Guidelines

### Key Principles
- Defaults are for mobile:
  - Add `sm:/md:/lg:` (`max-width >= 640/769/1200px`)variants to enhance
- Use the golden ratio spacing system rather than arbitrary values
- Apply optical corrections for visual balance in UI components
- Leverage exponential spacing scale for harmonious proportions

### Do's / Don'ts

#### Do
- Default to single-column layouts; grow columns at `sm: md: lg:` breakpoints
- Use spacing variables; reference the golden ratio system (e.g., `var(--md)`) instead of arbitrary values
- Apply optical corrections; account for visual weight and perceived balance
- Let containers manage padding; use the responsive container system
- Consider content relationships; use spacing to communicate information hierarchy
- Scale with root font size; ensure accessibility for users who adjust font sizes

#### Don't
- Hardcode spacing values; avoid arbitrary values; use exponential spacing scale
- Use desktop defaults; don't set desktop styles as defaults that need mobile overrides
- Ignore visual perception; mathematical symmetry ≠ visual balance (use Liftkit's optical corrections)
- Mix spacing systems; stick to Liftkit's preset spacing variables for consistency
- Forget content context; spacing needs change when content meaning shifts

---

## Colors

### Color Philosophy
- **Context-dependent meaning**: Color significance emerges from UI context and user experiences, not inherent properties
- **Dynamic color systems**: Prefer adaptive palettes that harmonize with brand colors over static fixed palettes
- **Cultural and literal context**: Consider both immediate UI context and broader user expectations

### Key Principles
- Color meaning in UI is derived from literal and cultural context, not inherent to the color itself
- Snack bars use colors like green to indicate success, but their meaning shifts when applied to other components like buttons
- Literal context includes surrounding icons and message content, which shape color interpretation
- Cultural context reflects users' learned associations from broader software and real-world experiences
- A red button can mean something different (like delete or decline) than a red snack bar (error)
- Dynamic color systems generate adaptable palettes based on brand colors, offering more personalized UI theming
- Material 3's color algorithm and HeavyLift provide tools and resources to implement both static and dynamic color systems effectively

### Implementation
The dynamic system used in HeavyLift leverages Material 3's algorithm to generate harmonious color palettes from a seed color, balancing contrast and usability.

---

## Accessibility Guidelines

- Ensure all interactive elements include `focus-ring`
- Decorative SVGs only: omit `aria-*`; informative icons: include accessible labels
- All spacing scales with user font size preferences (rem-based)
- WCAG compliant color combinations via the [Color Scheme Generator](./COLOR_SCHEME_GENERATOR.md)
- Adequate spacing between interactive elements on mobile (minimum space-md)

---

## Theme Switching (CSS-Only)

HeavyLift supports seamless theme switching using only CSS. This works by detecting both system preferences and an optional manual toggle.

### 1. Automatic Switching
By default, HeavyLift respects the user's system preference (`prefers-color-scheme`). No extra configuration is required.

### 2. Manual Toggle
To provide a manual theme switch without JavaScript, add a checkbox with the ID `theme-manual-toggle` to your page (typically near the top).

```html
<!-- Hidden checkbox for state tracking -->
<input type="checkbox" id="theme-manual-toggle" class="hidden">

<!-- Label acting as the toggle button -->
<label for="theme-manual-toggle" class="button outlined">
  <span class="light-only">Switch to Dark Mode</span>
  <span class="dark-only">Switch to Light Mode</span>
</label>
```

### 3. Visibility Utilities
Use these classes to show or hide content based on the active theme:

- `.light-only`: Visible only when light mode is active.
- `.dark-only`: Visible only when dark mode is active.

These utilities automatically respond to both the user's system preference and the state of the `#theme-manual-toggle` checkbox.