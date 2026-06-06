import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const requiredFiles = ["index.html", "src/advisoriq-styles.css", "src/advisoriq-app.js"];
const requiredPhrases = [
  "Why picked",
  "Model portfolio monitoring",
  "News + geopolitical intelligence",
  "Technical view",
  "Educational research only",
];

const ignoredDirectories = new Set([".git", "node_modules", ".next", "dist", "build", "coverage"]);
const textFileExtensions = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".txt", ".ts", ".tsx"]);
const conflictMarkers = ["<".repeat(7), "=".repeat(7), ">".repeat(7)];

function hasTextExtension(filePath) {
  const index = filePath.lastIndexOf(".");
  if (index === -1) return false;
  return textFileExtensions.has(filePath.slice(index));
}

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      files.push(...(await collectTextFiles(join(directory, entry.name))));
      continue;
    }

    if (entry.isFile()) {
      const filePath = join(directory, entry.name);
      if (hasTextExtension(filePath)) files.push(filePath);
    }
  }

  return files;
}

for (const file of requiredFiles) {
  const contents = await readFile(file, "utf8");
  if (!contents.trim()) {
    throw new Error(`${file} is empty`);
  }
}

const app = await readFile("src/advisoriq-app.js", "utf8");
const html = await readFile("index.html", "utf8");
const combined = `${html}\n${app}`;

for (const phrase of requiredPhrases) {
  if (!combined.includes(phrase)) {
    throw new Error(`Missing required phrase: ${phrase}`);
  }
}

const allTextFiles = await collectTextFiles(".");
for (const file of allTextFiles) {
  const info = await stat(file);
  if (info.size > 1_000_000) continue;
  const contents = await readFile(file, "utf8");
  for (const marker of conflictMarkers) {
    if (contents.includes(marker)) {
      throw new Error(`Merge conflict marker found in ${file}: ${marker}`);
    }
  }
}

const instrumentCount = (app.match(/createInstrument\(\{/g) || []).length;
if (instrumentCount < 15) {
  throw new Error(`Expected at least 15 Indian stock/ETF definitions, found ${instrumentCount}`);
}

const requiredEnginePhrases = ["runScreener", "calculateScore", "monthlyPickLimit", "minLiquidityScore"];
for (const phrase of requiredEnginePhrases) {
  if (!app.includes(phrase)) {
    throw new Error(`Missing screener engine phrase: ${phrase}`);
  }
}

console.log("Static AdvisorIQ MVP validation passed.");
