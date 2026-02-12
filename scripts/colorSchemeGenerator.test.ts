import * as fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  exportColorSchemeToJson,
  generateColorScheme,
  generateColorSchemeFromColors,
} from "./colorSchemeGenerator";

// Mock fs module
vi.mock("node:fs", () => ({
  writeFileSync: vi.fn(),
}));

describe("Color Scheme Generator", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("should generate a complete scheme from a single primary color", () => {
    const primary = "#0051e0";
    const scheme = generateColorScheme(primary);

    // Verify presence of key color roles
    expect(scheme.light__primary_hlv).toBeDefined();
    expect(scheme.light__secondary_hlv).toBeDefined();
  });

  it("should generate a scheme from multiple colors", () => {
    const primary = "#0051e0";
    const secondary = "#40617f";
    const tertiary = "#FF00FF";
    const error = "#FF0000";
    const scheme = generateColorScheme(
      primary,
      secondary,
      tertiary,
      error
    );

    expect(scheme.light__primary_hlv).toBeDefined();
    expect(scheme.light__secondary_hlv).toBeDefined();
  });

  it("should return JSON and CSS output formats", () => {
    const { json, css } = generateColorSchemeFromColors([
      "#0051e0",
    ]);

    expect(JSON.parse(json)).toBeTypeOf("object");
    expect(css).toContain("--light__primary_hlv:");
  });

  it("should throw error if no colors provided", () => {
    expect(() => generateColorSchemeFromColors([])).toThrow(
      "Please provide 1-4 colors"
    );
  });

  it("should throw error if more than 4 colors provided", () => {
    expect(() =>
      generateColorSchemeFromColors([
        "#1",
        "#2",
        "#3",
        "#4",
        "#5",
      ])
    ).toThrow("Please provide 1-4 colors");
  });

  it("should handle invalid hex codes gracefully", () => {
    const scheme = generateColorScheme("#ABCDEF");
    expect(scheme.light__primary_hlv).toBeDefined();
  });

  it("should export color scheme to JSON", async () => {
    const scheme = generateColorScheme("#0051e0");
    await exportColorSchemeToJson(scheme, "test.json");

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "test.json",
      JSON.stringify(scheme, null, 2),
      "utf8"
    );
  });

  it("should export color scheme to default JSON file if filename not provided", async () => {
    const scheme = generateColorScheme("#0051e0");
    await exportColorSchemeToJson(scheme);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "color-scheme.json",
      JSON.stringify(scheme, null, 2),
      "utf8"
    );
  });
});
