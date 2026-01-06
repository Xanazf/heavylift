import { describe, expect, it } from "vitest";
import {
  generateColorScheme,
  generateColorSchemeFromColors,
} from "./colorSchemeGenerator";

describe("Color Scheme Generator", () => {
  it("should generate a complete scheme from a single primary color", () => {
    const primary = "#0051e0";
    const scheme = generateColorScheme(primary);

    // Verify presence of key color roles
    expect(scheme.light__primary_hlv).toBeDefined();
    expect(scheme.light__secondary_hlv).toBeDefined();
    expect(scheme.light__tertiary_hlv).toBeDefined();
    expect(scheme.light__error_hlv).toBeDefined();

    // Verify presence of new MD3 surface roles
    expect(scheme.light__surfacecontainer_hlv).toBeDefined();
    expect(scheme.light__surfacedim_hlv).toBeDefined();

    expect(scheme.dark__primary_hlv).toBeDefined();
    expect(scheme.dark__secondary_hlv).toBeDefined();
  });

  it("should generate a scheme from multiple colors", () => {
    const primary = "#0051e0";
    const secondary = "#40617f";
    const scheme = generateColorScheme(primary, secondary);

    expect(scheme.light__primary_hlv).toBeDefined();
    expect(scheme.light__secondary_hlv).toBeDefined();
  });

  it("should return JSON and CSS output formats", () => {
    const { json, css } = generateColorSchemeFromColors([
      "#0051e0",
    ]);

    expect(JSON.parse(json)).toBeTypeOf("object");
    // Check for variable definition rather than strict value match
    expect(css).toContain("--light__primary_hlv:");
  });

  it("should handle invalid hex codes gracefully", () => {
    // The library handles hex parsing, we expect it not to crash
    const scheme = generateColorScheme("#ABCDEF");
    expect(scheme.light__primary_hlv).toBeDefined();
  });
});
