# Color Scheme Generator

A TypeScript utility for generating comprehensive Material Design 3 color schemes from 1-4 input colors. This tool creates a complete color system with light/dark themes, semantic colors, and proper contrast ratios, following the dynamic color system principles from STYLING.md and integrating with HeavyLift Utility Classes.

## HeavyLift (Liftkit) Color Philosophy (from STYLING.md)

This generator implements the core color principles for HeavyLift integration:
- **Context-dependent meaning**: Color significance emerges from UI context and user experiences, not inherent properties
- **Dynamic color systems**: Adaptive palettes that harmonize with brand colors over static fixed palettes (as used in HeavyLift)
- **Cultural and literal context**: Considers both immediate UI context and broader user expectations
- **Material 3 algorithm**: Uses the same harmonious color generation system referenced in STYLING.md and integrated with HeavyLift

## Features

- Generate complete color schemes from 1-4 input colors
- Automatic light and dark theme generation
- Material Design 3 compliant color structure (as referenced in STYLING.md)
- Proper contrast ratios for accessibility
- 📄 Export to JSON and CSS formats
- CLI tool for easy generation
- Semantic colors (success, warning, error, info) with context-dependent meaning
- Dynamic color adaptation based on brand inputs (HeavyLift compatible)
- Cultural context awareness for color interpretation

## Quick Start

### Using the CLI Tool

```bash
# Install dependencies first
npm install

# Generate from a single color (others will be auto-generated)
npm run generate-colors "#0051e0"

# Generate from two colors (tertiary + primary)
npm run generate-colors "#0051e0" "#40617f"

# Generate from three colors (tertiary + primary + secondary)
npm run generate-colors "#0051e0" "#40617f" "#006878"

# Generate from four colors (tertiary + primary + secondary + error)
npm run generate-colors "#0051e0" "#40617f" "#006878" "#bb0e45"
```

This will create files in the `generated-colors/` directory:
- `color-scheme-{colors}-{timestamp}.json` - Complete color scheme object
- `color-scheme-{colors}-{timestamp}.css` - CSS custom properties
- `color-scheme-{colors}-{timestamp}-summary.txt` - Generation summary

### Using in Code

```typescript
import { generateColorScheme, generateColorSchemeFromColors } from '../scripts/core';

// Generate from a single color
const scheme1 = generateColorScheme('#0051e0');

// Generate from multiple colors
const scheme2 = generateColorScheme('#0051e0', '#40617f', '#006878', '#bb0e45');

// Using the utility function
const { colorScheme, json, css } = generateColorSchemeFromColors(['#ff6b35', '#f7931e']);
```

## Color Structure

The generated color scheme follows the Material Design 3 specification (referenced in STYLING.md) and includes context-dependent color meanings:

### Core Color Roles
- **Primary**: Main brand color and its variants
- **Secondary**: Supporting color for less prominent components
- **Tertiary**: Accent color for highlighting and contrast
- **Error**: For error states and destructive actions

### Semantic Colors (Context-Dependent Meaning)
- **Success**: For positive feedback and success states (meaning depends on UI context)
- **Warning**: For cautionary messages and alerts (cultural context influences interpretation)
- **Info**: For informational content and neutral states (literal context shapes meaning)
- **Error**: For error states (meaning can shift based on component type - snack bar vs button)

### Surface Colors
- **Background**: Main background color
- **Surface**: Component background colors with multiple container levels
- **Outline**: Border and divider colors

### Each Color Role Includes
- Base color (e.g., `primary`)
- On-color (text/icon color on the base, e.g., `onprimary`)
- Container (background for components, e.g., `primarycontainer`)
- On-container (text/icon on container, e.g., `onprimarycontainer`)

### Theme Support
- **Light theme**: All colors optimized for light backgrounds
- **Dark theme**: All colors optimized for dark backgrounds
- **Fixed colors**: Colors that remain consistent across themes

## Examples

### Brand Color Schemes (Dynamic System)

```typescript
// Spotify-inspired (dynamic adaptation of brand green)
const spotify = generateColorScheme('#1db954');

// Twitter-inspired (dynamic adaptation of brand blue)
const twitter = generateColorScheme('#1da1f2');

// Instagram-inspired (multiple brand colors with harmonic relationships)
const instagram = generateColorScheme('#e4405f', '#fd5949', '#fccc63');

// Custom brand (all four colors specified for complete control)
const custom = generateColorScheme('#ff6b35', '#f7931e', '#ffd23f', '#06d6a0');
```

### Using Generated Colors in CSS (Context-Dependent Meaning)

```css
/* Apply the generated color scheme with context awareness */
.button.filled {
  background-color: var(--hl-primary);
  color: var(--hl-onprimary);
  /* Context: Action button - primary color means "main action" */
}

.snackbar.error {
  background-color: var(--hl-error);
  color: var(--hl-onerror);
  /* Context: Notification - error color means "something went wrong" */
}

.button.error {
  background-color: var(--hl-error);
  color: var(--hl-onerror);
  /* Context: Destructive action - same error color, different meaning */
}

.card.filled {
  background-color: var(--hl-secondarycontainer);
  color: var(--hl-onsecondarycontainer);
  /* Context: Supporting content - secondary color means "less important" */
}

/* Dark theme support (context remains, colors adapt automatically via variable definitions) */
@media (prefers-color-scheme: dark) {
  /* Variables automatically switch, no manual overrides needed typically */
}
```

## File Structure

```
scripts/
├── core.ts                    # Main generator functions (browser-safe)
├── colorSchemeGenerator.ts    # Node.js entry point
└── generateColorScheme.ts     # CLI tool

generated-colors/             # Output directory (created when using CLI)
├── color-scheme-*.json       # Generated color schemes
├── color-scheme-*.css        # CSS custom properties
└── color-scheme-*-summary.txt # Generation summaries
```

## Color Naming Convention

All color variables follow the HeavyLift pattern:
```
{theme}__{role}{variant?}_hlv
```

And are mapped to semantic variables:
```
--hl-{role}{variant?}
```

Where:
- `theme`: `light` or `dark`
- `role`: `primary`, `secondary`, `tertiary`, `error`, `warning`, `success`, `info`, `surface`, etc.
- `variant`: `container`, `fixed`, `dim`, etc. (optional)

Examples:
- `--hl-primary`: Primary color (automatically light or dark)
- `--hl-primarycontainer`: Primary container color
- `--hl-onsecondary`: Text color for secondary backgrounds

## Accessibility

The generator ensures:
- Sufficient contrast ratios between text and background colors
- Consistent color relationships across light and dark themes
- Context-dependent semantic color meanings (red for error, green for success, etc.)
- Support for user preference for light/dark themes
- Cultural awareness in color choices (avoiding problematic combinations)
- Literal context support (colors work with icons and content)
- Dynamic adaptation while maintaining accessibility standards