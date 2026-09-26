import { chromium } from "playwright-core";
const out = "/Users/bendik/Prosjekter/Reach Media Nettside/.impeccable/review/after";
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [w, h] of [[1366, 768], [1536, 864], [1440, 900]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto("http://localhost:3002/", { waitUntil: "networkidle" });
  await p.waitForTimeout(3000);
  await p.screenshot({ path: `${out}/hero-${w}x${h}.png` });
  await p.close();
}
await b.close();
console.log("ok");
