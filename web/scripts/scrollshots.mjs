// Skjermbilder av kort-koreografien på ulike scrollposisjoner (desktop).
// Bruk: node scripts/scrollshots.mjs [url] [outDir]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const [url = "http://localhost:3002/", out = "../.impeccable/review/scroll", ...fr] = process.argv.slice(2);
const outDir = resolve(out);
const fractions = fr.length ? fr.map(Number) : [0, 0.35, 0.7, 1.0, 1.4, 1.8, 2.0];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const vh = 900;
for (const f of fractions) {
  await page.evaluate((y) => window.scrollTo(0, y), f * vh);
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${outDir}/s-${f.toFixed(2)}vh.png` });
}
console.log("ok", outDir);
await browser.close();
