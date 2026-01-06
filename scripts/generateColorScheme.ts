#!/usr/bin/env node

/**
 * CLI script to generate color schemes
 *
 * Usage:
 * npm run generate-colors "#ff0000"
 * npm run generate-colors "#ff0000" "#00ff00"
 * npm run generate-colors "#ff0000" "#00ff00" "#0000ff"
 * npm run generate-colors "#ff0000" "#00ff00" "#0000ff" "#ffff00"
 *
 * Refactored using practices from refactoring.guru:
 * - Extract Method: Separated validation, file operations, and summary generation
 * - Replace Magic Numbers: Named constants for array bounds
 * - Consolidate Error Handling: Centralized error messages
 * - Simplify Conditional: Clearer validation logic
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateColorSchemeFromColors } from "./colorSchemeGenerator";

// ============================================================================
// Constants
// ============================================================================

const MIN_COLORS = 1;
const MAX_COLORS = 4;
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;
const OUTPUT_DIR_NAME = "generated-colors";

const ERROR_MESSAGES = {
  INVALID_COUNT: `
❌ Invalid input: You must provide between 1 and 4 hex color codes.

Usage:
  npm run generate-colors <primary> [secondary] [tertiary] [error]

Examples:
  1 Color  (Primary only):
    npm run generate-colors "#0051e0"

  2 Colors (Primary + Secondary):
    npm run generate-colors "#0051e0" "#40617f"

  3 Colors (Primary + Secondary + Tertiary):
    npm run generate-colors "#0051e0" "#40617f" "#006878"

  4 Colors (All Roles):
    npm run generate-colors "#0051e0" "#40617f" "#006878" "#bb0e45"

Note: Colors must be in hex format (e.g. #RRGGBB).
`,
  INVALID_HEX: (color: string) =>
    `Invalid hex color: ${color}. Please use format #RRGGBB`,
  GENERATION_FAILED: "Error generating color scheme:",
} as const;

// ============================================================================
// Validation Functions - Extract Method
// ============================================================================

function validateColorCount(count: number): void {
  if (count < MIN_COLORS || count > MAX_COLORS) {
    console.error(ERROR_MESSAGES.INVALID_COUNT);
    process.exit(1);
  }
}

function validateHexColor(color: string): void {
  if (!HEX_COLOR_REGEX.test(color)) {
    console.error(ERROR_MESSAGES.INVALID_HEX(color));
    process.exit(1);
  }
}

function validateColors(colors: string[]): void {
  validateColorCount(colors.length);
  colors.forEach(validateHexColor);
}

// ============================================================================
// File System Functions - Extract Method
// ============================================================================

function ensureOutputDirectory(outputDir: string): void {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
}

function generateFilename(colors: string[]): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
  const colorSuffix = colors.map(c => c.slice(1)).join("-");
  return `color-scheme-${colorSuffix}-${timestamp}`;
}

function writeColorSchemeFiles(
  outputDir: string,
  baseFilename: string,
  json: string,
  css: string
): { jsonPath: string; cssPath: string } {
  const jsonPath = join(outputDir, `${baseFilename}.json`);
  const cssPath = join(outputDir, `${baseFilename}.css`);

  writeFileSync(jsonPath, json, "utf8");
  writeFileSync(cssPath, css, "utf8");

  return { jsonPath, cssPath };
}

// ============================================================================
// Summary Generation - Extract Method
// ============================================================================

function generateSummary(
  colors: string[],
  baseFilename: string,
  colorScheme: Record<string, string>
): string {
  const lightColorCount = Object.keys(colorScheme).filter(k =>
    k.startsWith("light__")
  ).length;
  const darkColorCount = Object.keys(colorScheme).filter(k =>
    k.startsWith("dark__")
  ).length;

  return `Color Scheme Generation Summary
Generated at: ${new Date().toISOString()}
Input colors: ${colors.join(", ")}

Files generated:
- ${baseFilename}.json (Complete color scheme object)
- ${baseFilename}.css (CSS custom properties)

Primary colors used:
- Primary: ${colors[1] || "Generated automatically"}
- Secondary: ${colors[2] || "Generated automatically"}
- Tertiary: ${colors[0]}
- Error: ${colors[3] || "Generated automatically"}

The color scheme includes:
- Light theme colors (${lightColorCount} properties)
- Dark theme colors (${darkColorCount} properties)
- Fixed colors for both themes
- Semantic colors (warning, success, info, error)
- Surface and container variants
- Proper contrast ratios for accessibility

To use in your project:
1. Copy the CSS custom properties to your stylesheet
2. Import the JSON in your JavaScript/TypeScript code
3. Apply the colors using the CSS variables (e.g., var(--light__primary_hlv))
`;
}

function writeSummary(
  outputDir: string,
  baseFilename: string,
  summary: string
): string {
  const summaryPath = join(
    outputDir,
    `${baseFilename}-summary.txt`
  );
  writeFileSync(summaryPath, summary, "utf8");
  return summaryPath;
}

// ============================================================================
// Console Output Functions - Extract Method
// ============================================================================

function logInputColors(colors: string[]): void {
  console.log(
    `Generating color scheme from ${colors.length} color(s):`
  );
  colors.forEach((color, index) => {
    console.log(`  Color ${index + 1}: ${color}`);
  });
}

function logSuccess(
  jsonPath: string,
  cssPath: string,
  summaryPath: string,
  outputDir: string
): void {
  console.log(`✅ JSON color scheme saved to: ${jsonPath}`);
  console.log(`✅ CSS custom properties saved to: ${cssPath}`);
  console.log(`📋 Summary saved to: ${summaryPath}`);
  console.log(
    "\n🎨 Color scheme generation completed successfully!"
  );
  console.log(`📁 All files saved in: ${outputDir}`);
}

function logError(error: unknown): void {
  console.error(`❌ ${ERROR_MESSAGES.GENERATION_FAILED}`, error);
  process.exit(1);
}

// ============================================================================
// Main Function - Simplified with Extracted Methods
// ============================================================================

function main(): void {
  const args = process.argv.slice(2);

  validateColors(args);

  try {
    logInputColors(args);

    const { colorScheme, json, css } =
      generateColorSchemeFromColors(args);

    const outputDir = join(process.cwd(), OUTPUT_DIR_NAME);
    ensureOutputDirectory(outputDir);

    const baseFilename = generateFilename(args);
    const { jsonPath, cssPath } = writeColorSchemeFiles(
      outputDir,
      baseFilename,
      json,
      css
    );

    const summary = generateSummary(
      args,
      baseFilename,
      colorScheme
    );
    const summaryPath = writeSummary(
      outputDir,
      baseFilename,
      summary
    );

    logSuccess(jsonPath, cssPath, summaryPath, outputDir);
  } catch (error) {
    logError(error);
  }
}

if (require.main === module) {
  main();
}
