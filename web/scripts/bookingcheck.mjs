import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const m of [false, true]) {
  const ctx = await b.newContext({ viewport: m ? { width: 390, height: 844 } : { width: 1440, height: 900 }, isMobile: m });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3002/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.getElementById("gratis-audit").scrollIntoView());
  await p.waitForTimeout(8000);
  const f = p.frames().find((f) => f.url().includes("leadconnector"));
  const inner = f ? await f.evaluate(() => document.body.scrollHeight).catch(() => -1) : -1;
  const vis = await p.evaluate(() => getComputedStyle(document.querySelector("#gratis-audit iframe")).visibility);
  console.log(m ? "mobile" : "desktop", "inner", inner, "vis", vis);
  await p.evaluate((dy) => window.scrollBy(0, dy), m ? 600 : 520);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `../.impeccable/review/booking-${m ? "m" : "d"}.png` });
  await ctx.close();
}
await b.close();
