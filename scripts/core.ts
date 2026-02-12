/**
 * Core Color Scheme Logic
 * Pure functions for generating Material Design 3 color schemes.
 * Safe for use in browser and Node.js environments.
 */

import {
  argbFromHex,
  type DynamicScheme,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
  TonalPalette,
} from "@material/material-color-utilities";

// =============================================================================
// Constants & Types
// ============================================================================

const SEMANTIC_COLORS = {
  ERROR: 0xb3261e,
  WARNING: 0xe6ac00,
  SUCCESS: 0x00b33c,
  INFO: 0x2e58ff,
} as const;

/** Supported MD3 Scheme variants. */
export type SchemeVariant =
  | "vibrant"
  | "expressive"
  | "tonalspot"
  | "fidelity"
  | "fruit-salad"
  | "monochrome"
  | "neutral"
  | "rainbow";

/** Strategy for auto-generating accent hues. */
export type ColorStrategy =
  | "complementary"
  | "analogous"
  | "triadic";

/** A collection of CSS variable names mapped to their hex color values. */
export interface ColorScheme extends Record<string, string> {
  [key: string]: string;
}

const CORE_PALETTES = [
  "primary",
  "secondary",
  "tertiary",
  "error",
];
const FIXED_ROLES = ["primary", "secondary", "tertiary"];
const SURFACE_ROLES = [
  "background",
  "onBackground",
  "surface",
  "onSurface",
  "surfaceVariant",
  "onSurfaceVariant",
  "outline",
  "outlineVariant",
  "shadow",
  "scrim",
  "inverseSurface",
  "inverseOnSurface",
  "inversePrimary",
  "surfaceContainerLowest",
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
  "surfaceDim",
  "surfaceBright",
];

// =============================================================================
// Internal Helpers
// ============================================================================

const sanitizeHue = (hue: number): number =>
  ((hue % 360) + 360) % 360;

/**
 * Prevents muddy accents by pushing hues out of the 70-100 (olive) range
 * if they are intended to be accent colors.
 */
function calibrateAccentHue(hue: number): number {
  const h = sanitizeHue(hue);
  if (h > 70 && h < 100) return h < 85 ? 65 : 110;
  return h;
}

function getHex(
  scheme: DynamicScheme,
  role: keyof typeof MaterialDynamicColors
): string {
  const dynamicColor = MaterialDynamicColors[role];
  if (!dynamicColor) return "#000000";
  // @ts-expect-error: MCU internal types
  return hexFromArgb(dynamicColor.getArgb(scheme));
}

/**
 * Orchestrates the application of Color Strategy onto a Material Scheme.
 */
function applyStrategy(
  scheme: any,
  strategy: ColorStrategy,
  seedHct: Hct
) {
  // We keep the Material Scheme's intended chroma but override the hue.
  // This preserves the "Vibe" (e.g. TonalSpot = muted, Vibrant = punchy)

  // Secondary Hue
  const sHue = seedHct.hue + (strategy === "triadic" ? 120 : 30);
  scheme.secondaryPalette = TonalPalette.fromHueAndChroma(
    sanitizeHue(sHue),
    scheme.secondaryPalette.chroma
  );

  // Tertiary Hue
  let tHue =
    seedHct.hue + (strategy === "complementary" ? 180 : 240);
  tHue = calibrateAccentHue(tHue);
  scheme.tertiaryPalette = TonalPalette.fromHueAndChroma(
    sanitizeHue(tHue),
    Math.max(scheme.tertiaryPalette.chroma, 32) // Ensure it's never too gray
  );
}

// =============================================================================
// Public API
// ============================================================================

export function generateColorScheme(
  primaryHex: string,
  secondaryHex?: string,
  tertiaryHex?: string,
  errorHex?: string,
  variant: SchemeVariant = "vibrant",
  strategy: ColorStrategy = "complementary"
): ColorScheme {
  const seedHct = Hct.fromInt(argbFromHex(primaryHex));
  const result: Record<string, string> = {};

  const themes = [
    { name: "light", isDark: false },
    { name: "dark", isDark: true },
  ];

  for (const { name, isDark } of themes) {
    const SchemeClass =
      {
        tonalspot: SchemeTonalSpot,
        expressive: SchemeExpressive,
        fidelity: SchemeFidelity,
        "fruit-salad": SchemeFruitSalad,
        monochrome: SchemeMonochrome,
        neutral: SchemeNeutral,
        rainbow: SchemeRainbow,
        vibrant: SchemeVibrant,
      }[variant] || SchemeVibrant;

    const scheme: any = new SchemeClass(seedHct, isDark, 0.0);

    // 1. Apply Theory-based redirection if user didn't provide specific colors
    if (!secondaryHex || !tertiaryHex) {
      applyStrategy(scheme, strategy, seedHct);
    }

    // 2. User Overrides (highest priority)
    if (secondaryHex)
      scheme.secondaryPalette = TonalPalette.fromInt(
        argbFromHex(secondaryHex)
      );
    if (tertiaryHex)
      scheme.tertiaryPalette = TonalPalette.fromInt(
        argbFromHex(tertiaryHex)
      );
    if (errorHex)
      scheme.errorPalette = TonalPalette.fromInt(
        argbFromHex(errorHex)
      );

    const addColor = (key: string, value: string) => {
      result[`${name}__${key.toLowerCase()}_hlv`] = value;
    };

    // Process all MD3 roles
    for (const role of CORE_PALETTES) {
      const cap = role.charAt(0).toUpperCase() + role.slice(1);
      addColor(role, getHex(scheme, role as any));
      addColor(`on${role}`, getHex(scheme, `on${cap}` as any));
      addColor(
        `${role}container`,
        getHex(scheme, `${role}Container` as any)
      );
      addColor(
        `on${role}container`,
        getHex(scheme, `on${cap}Container` as any)
      );
    }

    for (const role of SURFACE_ROLES) {
      addColor(role, getHex(scheme, role as any));
    }

    for (const role of FIXED_ROLES) {
      const cap = role.charAt(0).toUpperCase() + role.slice(1);
      addColor(
        `${role}fixed`,
        getHex(scheme, `${role}Fixed` as any)
      );
      addColor(
        `${role}fixeddim`,
        getHex(scheme, `${role}FixedDim` as any)
      );
      addColor(
        `on${role}fixed`,
        getHex(scheme, `on${cap}Fixed` as any)
      );
      addColor(
        `on${role}fixedvariant`,
        getHex(scheme, `on${cap}FixedVariant` as any)
      );
    }

    // Semantic helpers
    const semantics = {
      warning: SEMANTIC_COLORS.WARNING,
      success: SEMANTIC_COLORS.SUCCESS,
      info: SEMANTIC_COLORS.INFO,
    };
    for (const [key, seed] of Object.entries(semantics)) {
      const palette = TonalPalette.fromInt(seed);
      const tones = isDark
        ? { base: 80, on: 20, c: 30, onC: 90 }
        : { base: 40, on: 100, c: 90, onC: 10 };
      addColor(key, hexFromArgb(palette.tone(tones.base)));
      addColor(`on${key}`, hexFromArgb(palette.tone(tones.on)));
      addColor(
        `${key}container`,
        hexFromArgb(palette.tone(tones.c))
      );
      addColor(
        `on${key}container`,
        hexFromArgb(palette.tone(tones.onC))
      );
    }
  }

  return result as ColorScheme;
}

export function generateCssCustomProperties(
  colorScheme: ColorScheme
): string {
  const vars = Object.entries(colorScheme)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n");
  return `:root {\n${vars}\n}\n`;
}

export function generateColorSchemeFromColors(
  colors: string[],
  variant: SchemeVariant = "vibrant",
  strategy: ColorStrategy = "complementary"
) {
  if (colors.length === 0 || colors.length > 4) {
    throw new Error("Please provide 1-4 colors");
  }
  const scheme = generateColorScheme(
    colors[0],
    colors[1],
    colors[2],
    colors[3],
    variant,
    strategy
  );
  return {
    colorScheme: scheme,
    json: JSON.stringify(scheme, null, 2),
    css: generateCssCustomProperties(scheme),
  };
}
