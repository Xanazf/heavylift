/**
 * CLI Tool for HeavyLift Component Scaffolding.
 *
 * Automates the creation of new CSS component files and their
 * registration in the design system's entry point.
 *
 * Usage:
 * npm run scaffold "my-component"
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import { Command } from "commander";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(
  __dirname,
  "../styles/lib-hl/components"
);
const ENTRY_FILE = path.join(COMPONENTS_DIR, "entry.css");

const program = new Command();

program
  .name("scaffold")
  .description("Scaffold a new HeavyLift component")
  .argument("<name>", "Name of the component (kebab-case)")
  .action(name => {
    // Basic validation for kebab-case
    if (!/^[a-z0-9-]+$/.test(name)) {
      console.error(
        chalk.red(
          "Error: Component name must be kebab-case (e.g., 'data-table')."
        )
      );
      process.exit(1);
    }

    const fileName = `${name}.css`;
    const filePath = path.join(COMPONENTS_DIR, fileName);

    // 1. Check if file exists
    if (fs.existsSync(filePath)) {
      console.error(
        chalk.red(
          `Error: Component "${name}" already exists at ${filePath}`
        )
      );
      process.exit(1);
    }

    /**
     * Boilerplate content for new CSS components.
     * Includes a local variable definition placeholder.
     */
    const content = `/* ${name} component */

.${name} {
  /* Define local variables */
  /* --${name}-bg: var(--hl-surface); */
}
`;
    fs.writeFileSync(filePath, content);
    console.log(chalk.green(`√ Created: ${filePath}`));

    // 3. Update entry.css (Automatic Registration)
    if (fs.existsSync(ENTRY_FILE)) {
      const entryContent = fs.readFileSync(ENTRY_FILE, "utf-8");
      // Split by newline, trim, and remove empty lines
      const lines = entryContent
        .split("\n")
        .filter(line => line.trim() !== "");
      const newImport = `@import "./${fileName}";`;

      if (!lines.includes(newImport)) {
        lines.push(newImport);
        lines.sort(); // Maintain alphabetical order for predictable bundle structure
        // Reconstruct file with single newline at the end
        fs.writeFileSync(ENTRY_FILE, `${lines.join("\n")}\n`);
        console.log(chalk.green(`√ Updated: ${ENTRY_FILE}`));
      } else {
        console.log(
          chalk.yellow(
            `! Skipped: ${ENTRY_FILE} already includes ${fileName}`
          )
        );
      }
    } else {
      console.error(
        chalk.red(`Error: Entry file not found at ${ENTRY_FILE}`)
      );
    }
  });

program.parse();
