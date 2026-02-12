import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
      include: [
        "scripts/core.ts",
        "scripts/colorSchemeGenerator.ts",
      ],
      exclude: [
        "scripts/**/*.test.ts",
        "scripts/generateScheme.ts",
        "scripts/scaffold.ts",
      ],
    },
  },
});
