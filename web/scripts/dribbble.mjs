import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://dribbble.com/shots/25316134-Pallet-Ross-Website-Animation", { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(4000);
const data = await p.evaluate(() => ({
  title: document.title,
  desc: document.querySelector('meta[name="description"]')?.content,
  videos: [...document.querySelectorAll("video, source")].map(v => v.src || v.getAttribute("src")).filter(Boolean),
  imgs: [...document.querySelectorAll("img")].map(i => i.src).filter(s => s.includes("cdn.dribbble")).slice(0, 8),
  text: document.querySelector(".shot-description, [class*=description]")?.innerText?.slice(0, 800),
}));
console.log(JSON.stringify(data, null, 2));
await p.screenshot({ path: "/private/tmp/claude-501/-Users-bendik/f92ec174-4a18-4e55-bfb3-b53c1f9d920d/scratchpad/dribbble.png" });
await b.close();
