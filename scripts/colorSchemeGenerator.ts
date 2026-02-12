/**
 * Node.js Entry Point for Color Scheme Generator
 * Re-exports core logic and adds file system capabilities for build scripts.
 */

import type { ColorScheme } from "./core";

export * from "./core";

/**
 * Export a generated color scheme as a formatted JSON file.
 *
 * @param colorScheme The color scheme object to export.
 * @param filename Output path/filename (default: color-scheme.json).
 */
export async function exportColorSchemeToJson(
  colorScheme: ColorScheme,
  filename: string = "color-scheme.json"
): Promise<void> {
  const jsonContent = JSON.stringify(colorScheme, null, 2);
  const fs = await import("node:fs");
  fs.writeFileSync(filename, jsonContent, "utf8");
}
