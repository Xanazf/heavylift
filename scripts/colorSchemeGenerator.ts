/**
 * Node.js Entry Point for Color Scheme Generator
 * Re-exports core logic and adds file system capabilities.
 */

import { type ColorScheme } from "./core";

export * from "./core";

/**
 * Export color scheme as JSON file
 * @param colorScheme The color scheme object
 * @param filename Output filename (default: color-scheme.json)
 */
export async function exportColorSchemeToJson(
  colorScheme: ColorScheme,
  filename: string = "color-scheme.json"
): Promise<void> {
  const jsonContent = JSON.stringify(colorScheme, null, 2);
  const fs = await import("node:fs");
  fs.writeFileSync(filename, jsonContent, "utf8");
}