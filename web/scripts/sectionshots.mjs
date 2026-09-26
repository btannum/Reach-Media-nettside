// Viewport-skjermbilder per seksjon (scroller til id, venter på lazy-innhold).
// Bruk: node scripts/sectionshots.mjs [url] [outDir] [id ...]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const [url = "http://localhost:3002/", out = "../.impeccable/review/sections", ...ids] =
  process.argv.slice(2);
const outDir = resolve(out);
mkdirSync(outDir, { recursive: true });
const targets = ids.length
  ? ids
  : ["top", "annonser", "resultater", "sammenligning", "samarbeid", "kunder", "om-oss", "faq", "gratis-audit"];

const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const mobile of [false, true]) {
  const ctx = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: 1,
    locale: "nb-NO",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
  await page.goto(url, { waitUntil: "networkidle" });
  for (const id of targets) {
    await page.evaluate((id) => {
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
      window.scrollBy(0, -64);
    }, id);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${outDir}/${mobile ? "m" : "d"}-${id}.png` });
  }
  if (errors.length) console.log(mobile ? "mobile errors:" : "desktop errors:", errors);
  await ctx.close();
}
await browser.close();
console.log("ok", outDir);
