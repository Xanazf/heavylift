#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { Command } from "commander";
import {
  type ColorStrategy,
  generateColorSchemeFromColors,
  type SchemeVariant,
} from "./colorSchemeGenerator";

const program = new Command();

program
  .name("generate-scheme")
  .description(
    "Generate a HeavyLift color scheme with color theory distributions"
  )
  .argument(
    "<colors...>",
    "1-4 hex colors (#RRGGBB). Order: primary, secondary, tertiary, error."
  )
  .option("--vibrant", "Vibrant colors (Default)", true)
  .option("--tonalspot", "Muted tonal spot colors")
  .option("--expressive", "Expressive shifted colors")
  .option("--fidelity", "High fidelity brand colors")
  .option(
    "--strategy <type>",
    "Theory: complementary (default), analogous, triadic",
    "complementary"
  )
  .action((colors: string[], options) => {
    let variant: SchemeVariant = "vibrant";
    if (options.tonalspot) variant = "tonalspot";
    else if (options.expressive) variant = "expressive";
    else if (options.fidelity) variant = "fidelity";

    const strategy = options.strategy as ColorStrategy;

    try {
      console.log(
        chalk.bold(
          `\n🎨 Generating '${variant}' scheme using '${strategy}' strategy...`
        )
      );

      const { colorScheme, json, css } =
        generateColorSchemeFromColors(colors, variant, strategy);

      const outputDir = join(process.cwd(), "generated-colors");
      if (!existsSync(outputDir))
        mkdirSync(outputDir, { recursive: true });

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, 19);
      const colorSuffix = colors.map(c => c.slice(1)).join("-");
      const baseFilename = `color-scheme-${colorSuffix}-${variant}-${timestamp}`;

      writeFileSync(
        join(outputDir, `${baseFilename}.json`),
        json,
        "utf8"
      );
      writeFileSync(
        join(outputDir, `${baseFilename}.css`),
        css,
        "utf8"
      );

      console.log(chalk.bold("\n✨ Scheme Preview:\n"));

      const roles = [
        "primary",
        "secondary",
        "tertiary",
        "success",
        "warning",
        "error",
        "info",
      ];
      const themes = ["light", "dark"];

      for (const theme of themes) {
        console.log(
          chalk.bold.black.bgWhite(
            `  ${theme.toUpperCase()} THEME  `.padEnd(60)
          )
        );
        for (const role of roles) {
          const hex = colorScheme[`${theme}__${role}_hlv`];
          const cHex =
            colorScheme[`${theme}__${role}container_hlv`];

          if (hex) {
            const onHex =
              colorScheme[`${theme}__on${role}_hlv`] ||
              (theme === "light" ? "#000000" : "#FFFFFF");
            const onCHex =
              colorScheme[`${theme}__on${role}container_hlv`] ||
              onHex;

            const mainBlock = chalk.bgHex(hex).hex(onHex)(
              ` ${role.padEnd(10)} ${hex} `
            );
            const contBlock = cHex
              ? chalk.bgHex(cHex).hex(onCHex)(
                  ` ${(`${role} container`).padEnd(20)} ${cHex} `
                )
              : "";

            console.log(`${mainBlock}  ${contBlock}`);
          }
        }
        console.log("");
      }

      console.log(chalk.green(`✅ Saved to: ${outputDir}`));
    } catch (error) {
      console.error(chalk.red("\n❌ Generation failed:"), error);
      process.exit(1);
    }
  });

program.parse();
