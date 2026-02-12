import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["scripts/core.ts", "scripts/colorSchemeGenerator.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: false, // Don't clean dist/global.css
    outDir: "dist",
    splitting: false,
    sourcemap: true,
    treeshake: true,
  },
  {
    // CLI needs to be ESM usually or bundled specifically, keeping it simple
    entry: ["scripts/generateScheme.ts"],
    format: ["cjs"],
    outDir: "dist",
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
]);
