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
  SchemeTonalSpot,
  TonalPalette,
} from "@material/material-color-utilities";

// =============================================================================
// Constants
// ============================================================================

const SEMANTIC_COLORS = {
  ERROR: 0xb3261e,
  WARNING: 0xe6ac00,
  SUCCESS: 0x00b33c,
  INFO: 0x2e58ff,
} as const;

// Arrays for iterative generation to reduce boilerplate
const CORE_ROLES = ["primary", "secondary", "tertiary", "error"];
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
];
const EXTENDED_SURFACE_ROLES = [
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
  "surfaceDim",
  "surfaceBright",
];
const FIXED_ROLES = ["primary", "secondary", "tertiary"];

// =============================================================================
// Types
// ============================================================================

export interface ColorScheme extends Record<string, string> {
  [key: string]: string;
}

// =============================================================================
// Generator Logic
// ============================================================================

function getRole(
  scheme: DynamicScheme,
  role: keyof typeof MaterialDynamicColors
): string {
  const dynamicColor = MaterialDynamicColors[role as keyof typeof MaterialDynamicColors];
  if (!dynamicColor) return "#000000";
  // @ts-ignore: Library types might be slightly mismatched in some versions
  return hexFromArgb(dynamicColor.getArgb(scheme));
}

function generateSemanticRoles(
  seed: number,
  isDark: boolean
): Record<string, string> {
  const palette = TonalPalette.fromInt(seed);
  const tones = isDark
    ? { base: 80, on: 20, container: 30, onContainer: 90 }
    : { base: 40, on: 100, container: 90, onContainer: 10 };

  return {
    base: hexFromArgb(palette.tone(tones.base)),
    on: hexFromArgb(palette.tone(tones.on)),
    container: hexFromArgb(palette.tone(tones.container)),
    onContainer: hexFromArgb(palette.tone(tones.onContainer)),
  };
}

export function generateColorScheme(
  color1: string,
  color2?: string,
  color3?: string,
  color4?: string
): ColorScheme {
  const primaryArgb = argbFromHex(color1);
  const secondaryArgb = color2 ? argbFromHex(color2) : undefined;
  const tertiaryArgb = color3 ? argbFromHex(color3) : undefined;
  const errorArgb = color4 ? argbFromHex(color4) : SEMANTIC_COLORS.ERROR;

  const createScheme = (isDark: boolean) => {
    const scheme = new SchemeTonalSpot(
      Hct.fromInt(primaryArgb),
      isDark,
      0.0
    );
    if (secondaryArgb) scheme.secondaryPalette = TonalPalette.fromInt(secondaryArgb);
    if (tertiaryArgb) scheme.tertiaryPalette = TonalPalette.fromInt(tertiaryArgb);
    if (errorArgb) scheme.errorPalette = TonalPalette.fromInt(errorArgb);
    return scheme;
  };

  const themes = [
    { name: "light", scheme: createScheme(false), isDark: false },
    { name: "dark", scheme: createScheme(true), isDark: true },
  ];

  const result: Record<string, string> = {};

  for (const { name, scheme, isDark } of themes) {
    const addColor = (key: string, value: string) => {
      result[`${name}__${key.toLowerCase()}_hlv`] = value;
    };

    for (const role of CORE_ROLES) {
      const capRole = role.charAt(0).toUpperCase() + role.slice(1);
      addColor(role, getRole(scheme, role as any));
      addColor(`on${role}`, getRole(scheme, `on${capRole}` as any));
      addColor(`${role}container`, getRole(scheme, `${role}Container` as any));
      addColor(`on${role}container`, getRole(scheme, `on${capRole}Container` as any));
    }

    for (const role of [...SURFACE_ROLES, ...EXTENDED_SURFACE_ROLES]) {
      addColor(role, getRole(scheme, role as any));
    }

    for (const role of FIXED_ROLES) {
      const capRole = role.charAt(0).toUpperCase() + role.slice(1);
      addColor(`${role}fixed`, getRole(scheme, `${role}Fixed` as any));
      addColor(`${role}fixeddim`, getRole(scheme, `${role}FixedDim` as any));
      addColor(`on${role}fixed`, getRole(scheme, `on${capRole}Fixed` as any));
      addColor(`on${role}fixedvariant`, getRole(scheme, `on${capRole}FixedVariant` as any));
    }

    const semantics = {
      warning: SEMANTIC_COLORS.WARNING,
      success: SEMANTIC_COLORS.SUCCESS,
      info: SEMANTIC_COLORS.INFO,
    };

    for (const [key, seed] of Object.entries(semantics)) {
      const colors = generateSemanticRoles(seed, isDark);
      addColor(key, colors.base);
      addColor(`on${key}`, colors.on);
      addColor(`${key}container`, colors.container);
      addColor(`on${key}container`, colors.onContainer);
    }
  }

  return result as ColorScheme;
}

export function generateCssCustomProperties(
  colorScheme: ColorScheme
): string {
  const entries = Object.entries(colorScheme);
  const cssVars = entries
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");
  return `:root {\n${cssVars}\n}\n`;
}

export function generateColorSchemeFromColors(colors: string[]): {
  colorScheme: ColorScheme;
  json: string;
  css: string;
} {
  if (colors.length === 0 || colors.length > 4) {
    throw new Error("Please provide 1-4 colors");
  }

  const colorScheme = generateColorScheme(
    colors[0],
    colors[1],
    colors[2],
    colors[3]
  );

  const json = JSON.stringify(colorScheme, null, 2);
  const css = generateCssCustomProperties(colorScheme);

  return { colorScheme, json, css };
}
