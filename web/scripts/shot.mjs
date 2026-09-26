// Skjermbilder til .impeccable/review/ via installert Chrome.
// Bruk: node scripts/shot.mjs [url] [outDir]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const url = process.argv[2] ?? "http://localhost:3011/";
const outDir = resolve(process.argv[3] ?? "../.impeccable/review");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

const targets = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, mobile: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, mobile: true },
];

for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: t.viewport,
    deviceScaleFactor: 1,
    isMobile: t.mobile,
    hasTouch: t.mobile,
    reducedMotion: "reduce",
    locale: "nb-NO",
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  await page.screenshot({ path: `${outDir}/${t.name}.png`, fullPage: true });
  console.log(`${t.name}: ${outDir}/${t.name}.png (h-overflow ${overflow}px)`);
  await ctx.close();
}

await browser.close();
