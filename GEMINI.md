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
*   **Build CSS:**
    Bundles and minifies `global.css` using Lightning CSS.
    ```bash
    npm run build
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
*   **`styles/lib-hl/`**: Core design system source.
    *   `theme/`: Variables and color mappings.
    *   `base/`: Reset and typography.
    *   `components/`: MD3-compliant UI components.
    *   `utilities/`: Helper classes.
*   **`docs/`**: Philosophical and implementation details.
*   **`generated-colors/`**: Output for generated themes (ignored by git).