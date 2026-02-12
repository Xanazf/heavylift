# HeavyLift Styles and Color Tools

## Project Overview

HeavyLift is a CSS design system and tooling suite that merges **Material Design 3 (MD3) robustness** with **Liftkit's relativistic sizing** and a **Tailwind-like developer experience**.

**Core Pillars:**
*   **Dynamic MD3 Color System:** A TypeScript-based generator using the official `@material/material-color-utilities` to create accessible, perceptual color schemes from any seed color.
*   **Golden Ratio Sizing:** A sizing system based on φ (≈1.618) using `em` units for natural harmony and effortless scalability.
*   **Seamless Merge Components:** Standardized CSS components that utilize MD3 semantic tokens and Liftkit sizing, offering utility-friendly classes for rapid development.

## Documentation

- **[Styling & Philosophy](./docs/STYLING.md)**: Deep dive into the Golden Ratio system and MD3 integration.
- **[Component Usage](./docs/COMPONENTS.md)**: HTML structures for Cards, Buttons, Text Fields, etc.
- **[Utility Reference](./docs/UTILITIES.md)**: Complete list of layout and helper classes.

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
    Runs unit tests for the color generator with 100% coverage enforcement.
    ```bash
    npm run test
    ```
*   **Check:**
    Runs Biome linting, formatting, and TypeScript type checking.
    ```bash
    npm run check
    ```

## Contributing

### Adding a Component
To ensure consistency, always use the scaffolding tool when adding new UI components:
```bash
npm run scaffold "my-new-component"
```
This will:
1. Create `styles/lib-hl/components/my-new-component.css` with a standard boilerplate.
2. Register the component in the CSS layer system.

### Standards
- All new components MUST use MD3 semantic tokens (`var(--hl-...)`).
- Layout MUST rely on Golden Ratio spacing variables (`var(--lg)`, `var(--md)`, etc.).
- Utilities should use dash-based naming (`m-md`) for consistency.
- Run `npm run check` before submitting changes to ensure linting and type safety.

## Key Files and Directories

*   **`scripts/`**: Color generation logic and CLI.
*   **`styles/lib-hl/`**: Core design system source.
    *   `theme/`: Variables and color mappings.
    *   `base/`: Reset and typography.
    *   `components/`: MD3-compliant UI components.
    *   `utilities/`: Helper classes.
*   **`docs/`**: Philosophical and implementation details.
*   **`dist/`**: Distribution files (CSS, Fonts, JS).

---

## Acknowledgments

Special thanks to the teams and contributors whose work forms the foundation of HeavyLift:
*   The **LiftKit** team for their relativistic sizing philosophy.
*   The **Material Design** contributors for the MD3 specifications and color utilities.
*   The **Tailwind CSS** team for the utility-first developer experience inspiration.
