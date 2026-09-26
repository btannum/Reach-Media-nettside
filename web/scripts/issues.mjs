import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const logs = [];
p.on("console", m => logs.push(`[${m.type()}] ${m.text().slice(0, 1800)}`));
await p.goto("http://localhost:3002/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
console.log(logs.filter(l => !l.startsWith("[log]") && !l.startsWith("[debug]") && !l.startsWith("[info]")).join("\n") || "(ingen warn/error)");
const txt = await p.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  return portal?.shadowRoot?.textContent?.slice(0, 400) ?? "(ingen overlay)";
});
console.log("overlay:", txt);
await b.close();
