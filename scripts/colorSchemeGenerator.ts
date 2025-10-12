/**
 * Color Scheme Generator
 *
 * Generates a comprehensive Material Design 3 color scheme from 1-4 input colors.
 * Based on the existing color structure in styles/lib-hl/theme/colors.css
 *
 */

// ============================================================================
// Constants
// ============================================================================

const LIGHTNESS_ADJUSTMENTS = {
  CONTAINER_LIGHT: 35,
  CONTAINER_DARK: -25,
  CONTAINER_DARK_35: 35,
  ON_CONTAINER_LIGHT: -45,
  ON_CONTAINER_DARK: 35,
  THEME_LIGHT: 25,
  THEME_DARK: -35,
  FIXED: 35,
  FIXED_DIM: 25,
  ON_FIXED: -45,
  ON_FIXED_VARIANT: -25,
} as const;

const HUE_OFFSETS = {
  SECONDARY: 60,
  TERTIARY: -60,
} as const;

const DEFAULT_COLORS = {
  ERROR: "#bb0e45",
  INFO: "#2e58ff",
  WARNING_HUE: 45,
  WARNING_SATURATION: 100,
  WARNING_LIGHTNESS: 45,
  SUCCESS_HUE: 140,
  SUCCESS_SATURATION: 100,
  SUCCESS_LIGHTNESS: 35,
} as const;

const SURFACE_COLORS = {
  LIGHT: {
    BACKGROUND: "#e1e1e1",
    ON_BACKGROUND: "#1e1e1e",
    SURFACE: "#3f3f3f",
    ON_SURFACE: "#989898",
    SURFACE_VARIANT: "#fff",
    ON_SURFACE_VARIANT: "#080808",
    OUTLINE: "#989898",
    OUTLINE_VARIANT: "#6e6e6e",
    SHADOW: "#080808",
    SCRIM: "#080808",
    INVERSE_SURFACE: "#989898",
    INVERSE_ON_SURFACE: "#3f3f3f",
  },
  DARK: {
    BACKGROUND: "#080808",
    ON_BACKGROUND: "#fff",
    SURFACE: "#1e1e1e",
    ON_SURFACE: "#e1e1e1",
    SURFACE_VARIANT: "#080808",
    ON_SURFACE_VARIANT: "#6e6e6e",
    OUTLINE: "#e1e1e1",
    OUTLINE_VARIANT: "#3f3f3f",
    SHADOW: "#0000",
    SCRIM: "#0000",
    INVERSE_SURFACE: "#e1e1e1",
    INVERSE_ON_SURFACE: "#1e1e1e",
  },
} as const;

// ============================================================================
// Types
// ============================================================================

interface ColorScheme extends Record<string, string> {
  // Light theme colors
  light__primary_hlv: string;
  light__onprimary_hlv: string;
  light__primarycontainer_hlv: string;
  light__onprimarycontainer_hlv: string;
  light__secondary_hlv: string;
  light__onsecondary_hlv: string;
  light__secondarycontainer_hlv: string;
  light__onsecondarycontainer_hlv: string;
  light__tertiary_hlv: string;
  light__ontertiary_hlv: string;
  light__tertiarycontainer_hlv: string;
  light__ontertiarycontainer_hlv: string;
  light__error_hlv: string;
  light__onerror_hlv: string;
  light__errorcontainer_hlv: string;
  light__onerrorcontainer_hlv: string;
  light__background_hlv: string;
  light__onbackground_hlv: string;
  light__surface_hlv: string;
  light__onsurface_hlv: string;
  light__surfacevariant_hlv: string;
  light__onsurfacevariant_hlv: string;
  light__outline_hlv: string;
  light__outlinevariant_hlv: string;
  light__shadow_hlv: string;
  light__scrim_hlv: string;
  light__inversesurface_hlv: string;
  light__inverseonsurface_hlv: string;
  light__inverseprimary_hlv: string;
  light__warning_hlv: string;
  light__onwarning_hlv: string;
  light__warningcontainer_hlv: string;
  light__onwarningcontainer_hlv: string;
  light__success_hlv: string;
  light__onsuccess_hlv: string;
  light__successcontainer_hlv: string;
  light__onsuccesscontainer_hlv: string;
  light__info_hlv: string;
  light__oninfo_hlv: string;
  light__infocontainer_hlv: string;
  light__oninfocontainer_hlv: string;

  // Dark theme colors
  dark__primary_hlv: string;
  dark__onprimary_hlv: string;
  dark__primarycontainer_hlv: string;
  dark__onprimarycontainer_hlv: string;
  dark__secondary_hlv: string;
  dark__onsecondary_hlv: string;
  dark__secondarycontainer_hlv: string;
  dark__onsecondarycontainer_hlv: string;
  dark__tertiary_hlv: string;
  dark__ontertiary_hlv: string;
  dark__tertiarycontainer_hlv: string;
  dark__ontertiarycontainer_hlv: string;
  dark__error_hlv: string;
  dark__onerror_hlv: string;
  dark__errorcontainer_hlv: string;
  dark__onerrorcontainer_hlv: string;
  dark__background_hlv: string;
  dark__onbackground_hlv: string;
  dark__surface_hlv: string;
  dark__onsurface_hlv: string;
  dark__surfacevariant_hlv: string;
  dark__onsurfacevariant_hlv: string;
  dark__outline_hlv: string;
  dark__outlinevariant_hlv: string;
  dark__shadow_hlv: string;
  dark__scrim_hlv: string;
  dark__inversesurface_hlv: string;
  dark__inverseonsurface_hlv: string;
  dark__inverseprimary_hlv: string;
  dark__warning_hlv: string;
  dark__onwarning_hlv: string;
  dark__warningcontainer_hlv: string;
  dark__onwarningcontainer_hlv: string;
  dark__success_hlv: string;
  dark__onsuccess_hlv: string;
  dark__successcontainer_hlv: string;
  dark__onsuccesscontainer_hlv: string;
  dark__info_hlv: string;
  dark__oninfo_hlv: string;
  dark__infocontainer_hlv: string;
  dark__oninfocontainer_hlv: string;

  // Fixed colors
  light__primaryfixed_hlv: string;
  light__primaryfixeddim_hlv: string;
  light__onprimaryfixed_hlv: string;
  light__onprimaryfixedvariant_hlv: string;
  light__secondaryfixed_hlv: string;
  light__secondaryfixeddim_hlv: string;
  light__onsecondaryfixed_hlv: string;
  light__onsecondaryfixedvariant_hlv: string;
  light__tertiaryfixed_hlv: string;
  light__tertiaryfixeddim_hlv: string;
  light__ontertiaryfixed_hlv: string;
  light__ontertiaryfixedvariant_hlv: string;
  dark__primaryfixed_hlv: string;
  dark__primaryfixeddim_hlv: string;
  dark__onprimaryfixed_hlv: string;
  dark__onprimaryfixedvariant_hlv: string;
  dark__secondaryfixed_hlv: string;
  dark__secondaryfixeddim_hlv: string;
  dark__onsecondaryfixed_hlv: string;
  dark__onsecondaryfixedvariant_hlv: string;
  dark__tertiaryfixed_hlv: string;
  dark__tertiaryfixeddim_hlv: string;
  dark__ontertiaryfixed_hlv: string;
  dark__ontertiaryfixedvariant_hlv: string;
}

// ============================================================================
// HSL Class - Replace Data Value with Object
// ============================================================================

class HSL {
  constructor(
    public readonly hue: number,
    public readonly saturation: number,
    public readonly lightness: number
  ) {
    this.hue = this.normalizeHue(hue);
    this.saturation = this.clamp(saturation, 0, 100);
    this.lightness = this.clamp(lightness, 0, 100);
  }

  private normalizeHue(hue: number): number {
    return ((hue % 360) + 360) % 360;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  adjustLightness(adjustment: number): HSL {
    return new HSL(this.hue, this.saturation, this.lightness + adjustment);
  }

  adjustHue(offset: number): HSL {
    return new HSL(this.hue + offset, this.saturation, this.lightness);
  }

  toHex(): string {
    const h = this.hue / 360;
    const s = this.saturation / 100;
    const l = this.lightness / 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      let tNorm = t;
      if (tNorm < 0) tNorm += 1;
      if (tNorm > 1) tNorm -= 1;
      if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
      if (tNorm < 1 / 2) return q;
      if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c: number): string => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}

// ============================================================================
// Color Class - Extract Class
// ============================================================================

class Color {
  private hsl: HSL;

  constructor(hex: string) {
    this.hsl = Color.hexToHsl(hex);
  }

  static hexToHsl(hex: string): HSL {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return new HSL(h * 360, s * 100, l * 100);
  }

  toHex(): string {
    return this.hsl.toHex();
  }

  adjustLightness(adjustment: number): Color {
    const newColor = new Color(SURFACE_COLORS.DARK.BACKGROUND);
    newColor.hsl = this.hsl.adjustLightness(adjustment);
    return newColor;
  }

  adjustHue(offset: number): Color {
    const newColor = new Color(SURFACE_COLORS.DARK.BACKGROUND);
    newColor.hsl = this.hsl.adjustHue(offset);
    return newColor;
  }

  getContrastColor(): Color {
    return this.hsl.lightness > 50 ? new Color(SURFACE_COLORS.DARK.BACKGROUND) : new Color(SURFACE_COLORS.LIGHT.BACKGROUND);
  }

  getHue(): number {
    return this.hsl.hue;
  }
  getSaturation(): number {
    return this.hsl.saturation
  }
  getLightness(): number {
    return this.hsl.lightness
  }
}

// ============================================================================
// ColorRole Class - Extract Class
// ============================================================================

class ColorRole {
  constructor(private baseColor: Color) { }

  generateLightTheme(): Record<string, string> {
    return {
      base: this.baseColor.toHex(),
      on: this.baseColor.getContrastColor().toHex(),
      container: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.CONTAINER_LIGHT).toHex(),
      onContainer: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.ON_CONTAINER_LIGHT).toHex(),
    };
  }

  generateDarkTheme(): Record<string, string> {
    return {
      base: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.THEME_LIGHT).toHex(),
      on: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.THEME_DARK).toHex(),
      container: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.CONTAINER_DARK).toHex(),
      onContainer: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.CONTAINER_DARK_35).toHex(),
    };
  }

  generateFixedColors(): Record<string, string> {
    return {
      fixed: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.FIXED).toHex(),
      fixedDim: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.FIXED_DIM).toHex(),
      onFixed: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.ON_FIXED).toHex(),
      onFixedVariant: this.baseColor.adjustLightness(LIGHTNESS_ADJUSTMENTS.ON_FIXED_VARIANT).toHex(),
    };
  }
}

// ============================================================================
// ColorPalette Class - Introduce Parameter Object
// ============================================================================

class ColorPalette {
  readonly primary: Color;
  readonly secondary: Color;
  readonly tertiary: Color;
  readonly error: Color;
  readonly warning: Color;
  readonly success: Color;
  readonly info: Color;

  constructor(
    color1: string,
    color2?: string,
    color3?: string,
    color4?: string
  ) {
    const primaryColor = new Color(SURFACE_COLORS.LIGHT.BACKGROUND);

    this.tertiary = new Color(color1);
    this.primary = color2 ? new Color(color2) : primaryColor;
    this.secondary = color3 ? new Color(color3) : primaryColor.adjustHue(HUE_OFFSETS.SECONDARY);
    this.error = color4 ? new Color(color4) : new Color(DEFAULT_COLORS.ERROR);

    const tertiaryHue = this.tertiary.getHue()
    const tertiarySaturation = this.tertiary.getSaturation()
    const tertiaryLightness = this.tertiary.getLightness()
    this.info = new Color(
      new HSL(360 - 180 + tertiaryHue,
        tertiarySaturation,
        tertiaryLightness).toHex())
      || new Color(DEFAULT_COLORS.INFO)

    this.warning = new Color(
      new HSL(
        DEFAULT_COLORS.WARNING_HUE,
        DEFAULT_COLORS.WARNING_SATURATION,
        DEFAULT_COLORS.WARNING_LIGHTNESS
      ).toHex()
    );

    this.success = new Color(
      new HSL(
        DEFAULT_COLORS.SUCCESS_HUE,
        DEFAULT_COLORS.SUCCESS_SATURATION,
        DEFAULT_COLORS.SUCCESS_LIGHTNESS
      ).toHex()
    );
  }
}

// ============================================================================
// ThemeGenerator Class - Extract Class
// ============================================================================

class ThemeGenerator {
  constructor(private palette: ColorPalette) { }

  private generateRoleColors(
    roleName: string,
    color: Color,
    theme: "light" | "dark"
  ): Record<string, string> {
    const role = new ColorRole(color);
    const colors = theme === "light" ? role.generateLightTheme() : role.generateDarkTheme();
    const prefix = `${theme}__${roleName}`;

    return {
      [`${prefix}_hlv`]: colors.base,
      [`${theme}__on${roleName}_hlv`]: colors.on,
      [`${prefix}container_hlv`]: colors.container,
      [`${theme}__on${roleName}container_hlv`]: colors.onContainer,
    };
  }

  private generateAllRoleColors(theme: "light" | "dark"): Record<string, string> {
    const roles = [
      { name: "primary", color: this.palette.primary },
      { name: "secondary", color: this.palette.secondary },
      { name: "tertiary", color: this.palette.tertiary },
      { name: "error", color: this.palette.error },
      { name: "warning", color: this.palette.warning },
      { name: "success", color: this.palette.success },
      { name: "info", color: this.palette.info },
    ];

    return roles.reduce((acc, { name, color }) => {
      const roleColors = this.generateRoleColors(name, color, theme);
      return { ...acc, ...roleColors };
    }, {});
  }

  private generateSurfaceColors(theme: "light" | "dark"): Record<string, string> {
    const surfaces = theme === "light" ? SURFACE_COLORS.LIGHT : SURFACE_COLORS.DARK;
    const prefix = `${theme}__`;

    return {
      [`${prefix}background_hlv`]: surfaces.BACKGROUND,
      [`${prefix}onbackground_hlv`]: surfaces.ON_BACKGROUND,
      [`${prefix}surface_hlv`]: surfaces.SURFACE,
      [`${prefix}onsurface_hlv`]: surfaces.ON_SURFACE,
      [`${prefix}surfacevariant_hlv`]: surfaces.SURFACE_VARIANT,
      [`${prefix}onsurfacevariant_hlv`]: surfaces.ON_SURFACE_VARIANT,
      [`${prefix}outline_hlv`]: surfaces.OUTLINE,
      [`${prefix}outlinevariant_hlv`]: surfaces.OUTLINE_VARIANT,
      [`${prefix}shadow_hlv`]: surfaces.SHADOW,
      [`${prefix}scrim_hlv`]: surfaces.SCRIM,
      [`${prefix}inversesurface_hlv`]: surfaces.INVERSE_SURFACE,
      [`${prefix}inverseonsurface_hlv`]: surfaces.INVERSE_ON_SURFACE,
      [`${prefix}inverseprimary_hlv`]: this.palette.primary.adjustLightness(LIGHTNESS_ADJUSTMENTS.THEME_LIGHT).toHex(),
    };
  }

  private generateFixedColors(): Record<string, string> {
    const roles = [
      { name: "primary", color: this.palette.primary },
      { name: "secondary", color: this.palette.secondary },
      { name: "tertiary", color: this.palette.tertiary },
    ];

    const result: Record<string, string> = {};

    for (const { name, color } of roles) {
      const role = new ColorRole(color);
      const fixed = role.generateFixedColors();

      for (const theme of ["light", "dark"]) {
        result[`${theme}__${name}fixed_hlv`] = fixed.fixed;
        result[`${theme}__${name}fixeddim_hlv`] = fixed.fixedDim;
        result[`${theme}__on${name}fixed_hlv`] = fixed.onFixed;
        result[`${theme}__on${name}fixedvariant_hlv`] = fixed.onFixedVariant;
      }
    }

    return result;
  }

  generate(): ColorScheme {
    return {
      ...this.generateAllRoleColors("light"),
      ...this.generateAllRoleColors("dark"),
      ...this.generateSurfaceColors("light"),
      ...this.generateSurfaceColors("dark"),
      ...this.generateFixedColors(),
    } as ColorScheme;
  }
}

// ============================================================================
// Public API - Maintain Backward Compatibility
// ============================================================================

/**
 * Main function to generate color scheme
 */
export function generateColorScheme(
  color1: string,
  color2?: string,
  color3?: string,
  color4?: string
): ColorScheme {
  const palette = new ColorPalette(color1, color2, color3, color4);
  const generator = new ThemeGenerator(palette);
  return generator.generate();
}

/**
 * Export color scheme as JSON file
 */
export async function exportColorSchemeToJson(
  colorScheme: ColorScheme,
  filename: string = "color-scheme.json"
): Promise<void> {
  const jsonContent = JSON.stringify(colorScheme, null, 2);

  // Node.js environment - write to file system
  const fs = await import("node:fs");
  fs.writeFileSync(filename, jsonContent, "utf8");
}

/**
 * Generate CSS custom properties from color scheme
 */
export function generateCssCustomProperties(
  colorScheme: ColorScheme
): string {
  const entries = Object.entries(colorScheme);
  const cssVars = entries.map(([key, value]) => `  --${key}: ${value};`).join("\n");
  return `:root {\n${cssVars}\n}\n`;
}

/**
 * Example usage and utility function
 */
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
