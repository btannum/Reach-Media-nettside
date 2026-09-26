// Skjermbilder av innlastingsanimasjonen på gitte tidspunkter (ms etter load).
// Bruk: node scripts/introshots.mjs [url] [outDir] [ms ...]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const [url = "http://localhost:3002/", out = "../.impeccable/review/intro", ...ms] = process.argv.slice(2);
const outDir = resolve(out);
mkdirSync(outDir, { recursive: true });
const times = ms.length ? ms.map(Number) : [100, 400, 700, 1000, 1200, 1400, 1700, 2100, 2600];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
// Varm opp bilder/fonter først, så tidspunktene ikke måler nedlasting.
await page.goto(url, { waitUntil: "networkidle" });
await page.goto("about:blank");
const t0 = Date.now();
await page.goto(url, { waitUntil: "commit" });
for (const t of times) {
  const wait = t - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  await page.screenshot({ path: `${outDir}/t-${String(t).padStart(4, "0")}.png` });
}
console.log("ok", outDir);
await browser.close();
