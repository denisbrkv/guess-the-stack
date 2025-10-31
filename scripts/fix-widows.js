/* eslint-disable @typescript-eslint/no-require-imports */
const glob = require("fast-glob");
const fs = require("fs");

const shortWords = [
  "в",
  "во",
  "к",
  "ко",
  "с",
  "со",
  "у",
  "о",
  "об",
  "по",
  "из",
  "за",
  "на",
  "и",
  "а",
  "но",
];

const widowRegex = new RegExp(`(^|\\s)(${shortWords.join("|")}) `, "gi");
const stringRegex = /(["'`])((?:\\.|(?!\1).)*?)\1/gs;

const filePatterns = ["src/**/*.ts", "src/**/*.tsx"];
const ignore = [
  "**/node_modules/**",
  "**/.next/**",
  "**/dist/**",
  "**/build/**",
];

async function fixWidowsInFile(filePath) {
  const content = await fs.promises.readFile(filePath, "utf8");

  const fixed = content.replace(stringRegex, (match, quote, inner) => {
    const replaced = inner.replace(widowRegex, (fullMatch, before, word) => {
      if (word[0] === word[0].toUpperCase()) return fullMatch;
      return `${before}${word}\u00A0`;
    });

    return `${quote}${replaced}${quote}`;
  });

  if (content !== fixed) {
    await fs.promises.writeFile(filePath, fixed, "utf8");
    console.log(`✔️ Fixed widows in: ${filePath}`);
  }
}

async function run() {
  const files = await glob(filePatterns, { ignore });
  if (files.length === 0) {
    console.log("No matching files.");
    return;
  }

  await Promise.all(files.map(fixWidowsInFile));
  console.log("✅ Widow words fixed in constants.");
}

run().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
