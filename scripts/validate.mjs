import { readFile } from "node:fs/promises";

const requiredFiles = ["index.html", "src/styles.css", "src/app.js"];
const requiredPhrases = [
  "Why picked",
  "Model portfolio monitoring",
  "News + geopolitical intelligence",
  "Technical view",
  "Educational research only",
];

for (const file of requiredFiles) {
  const contents = await readFile(file, "utf8");
  if (!contents.trim()) {
    throw new Error(`${file} is empty`);
  }
}

const app = await readFile("src/app.js", "utf8");
const html = await readFile("index.html", "utf8");
const combined = `${html}\n${app}`;

for (const phrase of requiredPhrases) {
  if (!combined.includes(phrase)) {
    throw new Error(`Missing required phrase: ${phrase}`);
  }
}

const pickCount = (app.match(/signal: /g) || []).length;
if (pickCount < 5) {
  throw new Error(`Expected at least 5 stock definitions, found ${pickCount}`);
}

console.log("Static AdvisorIQ MVP validation passed.");
