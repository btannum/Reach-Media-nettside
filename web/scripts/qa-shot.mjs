// QA-skjermbilder: node scripts/qa-shot.mjs <ut-mappe> <sti> [sti ...]
// PC 1440×900 og mobil 390×844, hele siden. Krever at dev-serveren kjører på :3002.
import { chromium } from "playwright-core";
const [out, ...paths] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome" });
for (const [name, vp, mobile] of [["pc", { width: 1440, height: 900 }, false], ["mobil", { width: 390, height: 844 }, true]]) {
  const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  for (const p of paths) {
    await page.goto(`http://localhost:3002${p}`, { waitUntil: "networkidle" });
    // Scroll gjennom så Reveal-animasjonene trigger.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(80); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(Number(process.env.QA_WAIT ?? 700));
    const slug = p === "/" ? "valg" : p.replace(/\//g, "-").replace(/^-/, "");
    await page.screenshot({ path: `${out}/${slug}-${name}.png`, fullPage: true });
    console.log(`${slug}-${name}.png`);
  }
  await page.close();
}
await browser.close();
