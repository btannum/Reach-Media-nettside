import { chromium } from "playwright-core";
const base = "http://localhost:3002";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = [];
async function settle(p) { await p.waitForTimeout(700); let last = -1, stable = 0; for (let i = 0; i < 40; i++) { await p.waitForTimeout(200); const y = await p.evaluate(() => window.scrollY); stable = y === last ? stable + 1 : 0; last = y; if (stable >= 3) break; } }
const top = (p, id) => p.evaluate((h) => { const e = document.getElementById(h); return e ? Math.round(e.getBoundingClientRect().top) : null; }, id);
for (const m of [false, true]) {
  const L = m ? "mobil" : "desktop";
  const ctx = await b.newContext({ viewport: m ? { width: 390, height: 844 } : { width: 1440, height: 900 }, isMobile: m, hasTouch: m });
  const p = await ctx.newPage();
  const errs = []; p.on("console", (x) => x.type() === "error" && errs.push(x.text().slice(0, 100))); p.on("pageerror", (e) => errs.push("pageerror " + e.message.slice(0, 100)));
  await p.goto(base + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  out.push(`${L} overflow: ${await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)}px`);
  // 1: hero-CTA
  await p.locator('#top a[href="/#gratis-audit"]').first().click(); await settle(p); out.push(`${L} hero-CTA → #gratis-audit top ${await top(p, "gratis-audit")}`);
  // 2: nav-CTA med samme hash (skal scrolle igjen)
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  await p.locator('header a[href="/#gratis-audit"]').first().click(); await settle(p); out.push(`${L} nav-CTA (samme hash) top ${await top(p, "gratis-audit")}`);
  // 3: audit-CTA
  await p.evaluate(() => document.getElementById("audit").scrollIntoView({ block: "center", behavior: "instant" })); await p.waitForTimeout(400);
  await p.locator('#audit a[href="/#gratis-audit"]').first().click(); await settle(p); out.push(`${L} audit-CTA top ${await top(p, "gratis-audit")}`);
  // 4: hero sekundær
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  await p.locator('#top a[href="/#audit"]').first().click(); await settle(p); out.push(`${L} Slik funker auditen top ${await top(p, "audit")}`);
  if (m) {
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
    await p.getByRole("button", { name: "Meny" }).click();
    const link = p.locator('nav[aria-label="Mobilmeny"] a[href="/#resultater"]'); await link.waitFor({ state: "visible", timeout: 3000 });
    await link.click(); await settle(p);
    out.push(`mobil meny → #resultater top ${await top(p, "resultater")}, meny lukket: ${!(await p.locator('nav[aria-label="Mobilmeny"]').isVisible().catch(() => false))}`);
  } else {
    for (const h of ["/#audit", "/#resultater", "/#om-oss"]) { await p.locator(`header nav a[href="${h}"]`).click(); await settle(p); out.push(`desktop nav ${h} top ${await top(p, h.slice(2))}`); }
  }
  // 5: fra underside
  await p.goto(base + "/prosjekter/kla", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  await p.locator('main a[href="/#gratis-audit"]').first().click(); await p.waitForTimeout(2500); await settle(p);
  out.push(`${L} /prosjekter/kla → #gratis-audit top ${await top(p, "gratis-audit")}`);
  // 6: video
  await p.goto(base + "/", { waitUntil: "networkidle" }); await p.evaluate(() => document.getElementById("ugc").scrollIntoView()); await p.waitForTimeout(1200);
  await p.locator('#ugc button[aria-label^="Spill av"]').first().click(); await p.waitForTimeout(800);
  out.push(`${L} UGC video: ${await p.locator("#ugc video").count()} video-element, url ${await p.evaluate(() => location.pathname)}`);
  out.push(`${L} console-feil: ${errs.length ? errs.slice(0, 3).join(" | ") : "ingen"}`);
  await ctx.close();
}
console.log(out.join("\n"));
await b.close();
