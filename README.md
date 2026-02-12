# HeavyLift Styles and Color Tools

## Project Overview

HeavyLift is a CSS design system and tooling suite that merges **Material Design 3 (MD3) robustness** with **Liftkit's relativistic sizing** and a **Tailwind-like developer experience**.

**Core Pillars:**
*   **Dynamic MD3 Color System:** A TypeScript-based generator using the official `@material/material-color-utilities` to create accessible, perceptual color schemes from any seed color.
*   **Golden Ratio Sizing:** A sizing system based on φ (≈1.618) using `em` units for natural harmony and effortless scalability.
*   **Seamless Merge Components:** Standardized CSS components that utilize MD3 semantic tokens and Liftkit sizing, offering utility-friendly classes for rapid development.

## Building and Running

### Key Commands

*   **Generate Color Scheme:**
    Creates a new color scheme (JSON and CSS) in `generated-colors/`.
    ```bash
    npm run generate-colors "#HEX_CODE"
    ```
*   **Scaffold Component:**
    Creates a new CSS component file and registers it in `entry.css`.
    ```bash
    npm run scaffold "component-name"
    ```
*   **Build CSS:**
    Bundles and minifies `global.css` and copies assets to `dist/`.
    ```bash
    npm run build
    ```
*   **Release:**
    Runs all checks, tests, builds the project, and publishes to npm.
    ```bash
    npm run release
    ```
*   **Test:**
    Runs unit tests for the color generator.
    ```bash
    npm run test
    ```
*   **Check:**
    Runs Biome linting, formatting, and TypeScript type checking.
    ```bash
    npm run check
    ```

## Development Conventions

### CSS Architecture
*   **Modern Layers:** Uses `@layer` (theme, base, components, utilities) for robust cascade control.
*   **Relativistic Dimensions:** Component internal sizes rely on predefined Golden Ratio variables (e.g., `var(--lg)`), which are themselves relativistic calculations, ensuring they scale perfectly with local or root font-size.
*   **Utility-First Modifiers:** Components use flat class lists (e.g., `.button.filled.sm`) for variants and sizes.

### Color Tokens
*   **Naming:** `--hl-{role}` (e.g., `--hl-primary`, `--hl-surfacecontainer`).
*   **Dynamic Schemes:** Managed via `scripts/colorSchemeGenerator.ts`.

### Component Standards
All new components must:
1. Use MD3 semantic color tokens.
2. Rely on `vars.css` Golden Ratio variables for spacing and radii.
3. Be defined within the `components` layer.

## Key Files and Directories

*   **`scripts/`**: Color generation logic and CLI.
    *   `core.ts`: Pure logic for color generation (browser-safe).
    *   `colorSchemeGenerator.ts`: Node.js entry point.
    *   `generateColorScheme.ts`: CLI script.
*   **`styles/lib-hl/`**: Core design system source.
    *   `theme/`: Variables and color mappings.
    *   `base/`: Reset and typography.
    *   `components/`: MD3-compliant UI components (e.g., `buttons.css`, `cards.css`).
    *   `utilities/`: Helper classes.
*   **`docs/`**: Philosophical and implementation details.
*   **`generated-colors/`**: Output for generated themes (ignored by git).

## Examples

### Programmatic Usage

```ts
import { generateColorScheme } from './scripts/core';

const scheme = generateColorScheme('#1db954'); // Spotify-ish green
```

### CSS Consumption

```css
/* Light Theme (Default) */
.button.filled {
  background-color: var(--hl-primary);
  color: var(--hl-onprimary);
}

.card.elevated {
  background-color: var(--hl-surfacecontainerlow);
  box-shadow: var(--shadow-sm);
}

/* Dark Theme (Automatic via prefers-color-scheme) */
/* Variables like --hl-primary automatically switch values */
```

---

## Acknowledgments

Special thanks to the teams and contributors whose work forms the foundation of HeavyLift:
*   The **LiftKit** team for their relativistic sizing philosophy.
*   The **Material Design** contributors for the MD3 specifications and color utilities.
*   The **Tailwind CSS** team for the utility-first developer experience inspiration.