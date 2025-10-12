# HeavyLift Styles and Color Tools

A lightweight CSS design system with a TypeScript-based color scheme generator that produces Material Design 3-style dynamic themes aligned with HeavyLift/Liftkit principles.

- Styles: Layered CSS utilities, components, and theme variables under styles/lib-hl
- Tooling: TypeScript scripts to generate accessible light/dark color schemes from 1–4 seed colors
- Docs: Deep guidance on spacing (Liftkit + Tailwind v4) and dynamic color philosophy

## Contents
- Quick Start (scripts and styles)
- Features and Capabilities
- Project Structure
- Color Scheme Generator (CLI, API, algorithm)
- Styling System (Liftkit + Tailwind v4 integration)
- Accessibility and Best Practices
- Examples and Integration

---

## Quick Start

This repository includes a minimal package.json with a generate-colors script. You can use a TS runtime (tsx or ts-node) to execute scripts.

Generate a color scheme (choose 1–4 brand hex colors):

```bash
# Using tsx (recommended)
tsx scripts/generateColorScheme.ts "#0051e0"

# Or with ts-node (if installed)
ts-node scripts/generateColorScheme.ts "#0051e0"
node -r ts-node/register scripts/generateColorScheme.ts "#0051e0"
```

Outputs are written to generated-colors/:
- color-scheme-{colors}-{timestamp}.json - Complete scheme
- color-scheme-{colors}-{timestamp}.css - CSS custom properties
- color-scheme-{colors}-{timestamp}-summary.txt - Generation summary

Consume styles:
- Import styles/global.css in your app; it composes the lib-hl layers (base, components, utilities, theme)

---

## Features

Color tools
- Generate complete dynamic color systems from 1–4 inputs
- Automatic light/dark themes and fixed roles
- Material Design 3 structure with semantic roles (success, warning, error, info)
- WCAG-conscious contrast across on-color/container pairs
- JSON + CSS exports for direct consumption

Styling system
- Liftkit golden-ratio spacing variables usable directly in CSS and Tailwind v4 arbitrary values
- Layered CSS with @layer for optimal cascade control and bundler tree-shaking
- Utilities, components, and theme variables organized for clarity and performance

---

## Project Structure

```
./
├── assets/                       # Local fonts and assets
├── docs/                         # Conceptual + usage docs
│   ├── COLOR_SCHEME_GENERATOR.md
│   └── STYLING.md
├── scripts/                      # TS color generation tools
│   ├── colorSchemeGenerator.ts   # Core generator library
│   ├── (examples inline in docs) # Example usage
│   └── generateColorScheme.ts    # CLI entry
├── styles/
│   ├── global.css                # Entry CSS that imports lib-hl
│   └── lib-hl/
│       ├── entry.css             # Declares @layer and imports sublayers
│       ├── base/                 # Normalize, fonts, typography, sizing, icons
│       ├── components/           # UI components
│       ├── theme/                # vars.css, colors.css, theme glue, backgrounds, transitions
│       └── utilities/            # Grid, flex, spacing, shadows, helpers
└── tsconfig.json
```

---

## Color Scheme Generator

Philosophy (from docs)
- Context-dependent meaning: color significance emerges from UI context, not inherent properties
- Dynamic color systems: prefer adaptive palettes harmonized with brand colors
- Cultural and literal context: consider user expectations and nearby content/icons
- Material 3 algorithm principles: harmonious generation, semantic roles, and theme parity

CLI usage

```bash
# 1 color (primary)
tsx scripts/generateColorScheme.ts "#0051e0"

# 2 colors (primary + secondary)
tsx scripts/generateColorScheme.ts "#0051e0" "#40617f"

# 3 colors (primary + secondary + tertiary)
tsx scripts/generateColorScheme.ts "#0051e0" "#40617f" "#006878"

# 4 colors (primary + secondary + tertiary + error)
tsx scripts/generateColorScheme.ts "#0051e0" "#40617f" "#006878" "#bb0e45"
```

API (scripts/colorSchemeGenerator.ts)
- generateColorScheme(color1, color2?, color3?, color4?) → ColorScheme
- generateColorSchemeFromColors(colors: string[]) → { colorScheme, json, css }
- exportColorSchemeToJson(colorScheme, filename?) → void
- generateCssCustomProperties(colorScheme) → string

Color roles and structure
- Core roles: primary, secondary, tertiary, error
- Semantic roles: success, warning, info (context-aware)
- Surface roles: background, surface, outline, container levels
- Per role variants: base, on-*, *container, on*container
- Themes: light, dark; plus fixed roles

Algorithm highlights
- For single input, derive secondary/tertiary via ±60° analogous rotations; default error #bb0e45
- For multiple inputs, map directly (1→primary, 2→secondary, 3→tertiary, 4→error) and harmonize
- Generate light/dark variants, on-colors, and containers with contrast safety
- Compute semantic roles and fixed colors maintaining accessibility

Variable naming
```
{theme}__{role}{variant?}_hlv
# theme: light | dark
# variant: container | fixed | dim | ...
# examples: light__primary_hlv, dark__primarycontainer_hlv, light__onsecondary_hlv
```

---

## Styling System (Liftkit + Tailwind v4)

Foundation
- Golden ratio (φ ≈ 1.618) variables exposed as CSS custom properties (see styles/lib-hl/theme/vars.css)
- Tailwind v4 arbitrary values consume vars directly: gap-[var(--md)] p-[var(--lg)]
- Lightning CSS-based pipelines benefit from dead code elimination, value inlining, and cascade optimization

Core spacing principles (from STYLING.md)
- Relative spacing (rem) for accessibility and responsiveness
- Root font size as the universal base unit
- Spacing relative to the larger element for harmony
- Seven preset spacing variables based on golden ratio; apply optical corrections in components

Three laws of spacing
1) Relationship strength dictates spacing
2) Content changes context
3) Preset systems reduce guesswork

Implementation guidelines
- Mobile-first defaults; enhance at sm:/md:/lg: breakpoints
- Prefer design-system variables over arbitrary values
- Use utilities for containers, section padding, grid helpers, text tokens, cards, buttons
- Apply exponential spacing and optical corrections for balance

Colors in UI (from docs)
- Meaning is derived from context (literal + cultural)
- Dynamic systems adapt palettes from brand colors (Material 3 compatible)

---

## Accessibility

- Ensure interactive elements include a visible focus-ring
- Decorative SVGs: omit aria-*; informative icons: include accessible labels
- Use rem-based spacing so layouts scale with user font size preferences
- Prefer WCAG-compliant color pairs; generator outputs on-color/container contrasts
- Maintain adequate spacing between interactive elements on mobile (≥ space-md)

---

## Examples

Programmatic usage

```ts
import { generateColorScheme } from './scripts/colorSchemeGenerator';

const scheme1 = generateColorScheme('#1db954');             // single brand color
const scheme2 = generateColorScheme('#1da1f2', '#0051e0');  // brand + support
const scheme3 = generateColorScheme('#e4405f', '#fd5949', '#fccc63');
const scheme4 = generateColorScheme('#ff6b35', '#f7931e', '#ffd23f', '#06d6a0');
```

CSS consumption

```css
/* Light */
.lk-btn-primary { background: var(--light__primary_hlv); color: var(--light__onprimary_hlv); }
.lk-card-secondary { background: var(--light__secondarycontainer_hlv); color: var(--light__onsecondarycontainer_hlv); }

/* Dark (prefers-color-scheme) */
@media (prefers-color-scheme: dark) {
  .lk-btn-primary { background: var(--dark__primary_hlv); color: var(--dark__onprimary_hlv); }
  .lk-card-secondary { background: var(--dark__secondarycontainer_hlv); color: var(--dark__onsecondarycontainer_hlv); }
}
```

Integrating into an app
1) Generate a scheme with the CLI
2) Import styles/global.css, or paste generated CSS variables into your app’s theme layer
3) Use the lib-hl utilities/components; Tailwind v4 arbitrary values can target design tokens via var()

---

## Security and Performance Notes

- Scripts are local-only; they validate hex inputs and write under generated-colors/
- No external network calls or npm dependencies required for generation
- Layered CSS is designed for bundlers with Lightning CSS or equivalent for optimal tree-shaking

---

## Documentation

- docs/COLOR_SCHEME_GENERATOR.md - CLI and API details, algorithm, naming, examples
- docs/STYLING.md - Liftkit + Tailwind v4 integration, spacing philosophy, dynamic color principles, accessibility

If you need an npm workflow, create a package.json with scripts that invoke tsx or ts-node as shown above.
