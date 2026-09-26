// Klikktest: alle anker-lenker på forsiden og fra undersider, venter til smooth scroll er ferdig.
import { chromium } from "playwright-core";
const base = "http://localhost:3002";
const b = await chromium.launch({ channel: "chrome", headless: true });
const problems = [];
async function settle(p) { await p.waitForTimeout(700); let last = -1, stable = 0; for (let i = 0; i < 40; i++) { await p.waitForTimeout(200); const y = await p.evaluate(() => window.scrollY); stable = y === last ? stable + 1 : 0; last = y; if (stable >= 3) break; } }
async function targetTop(p, id) { return p.evaluate((h) => { const e = document.getElementById(h); return e ? Math.round(e.getBoundingClientRect().top) : null; }, id); }

for (const m of [false, true]) {
  const label = m ? "mobil" : "desktop";
  const ctx = await b.newContext({ viewport: m ? { width: 390, height: 844 } : { width: 1440, height: 900 }, isMobile: m, hasTouch: m });
  const p = await ctx.newPage();

  // Forsiden: alle anker-lenker
  await p.goto(base + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  const links = await p.evaluate(() => [...document.querySelectorAll('a[href^="/#"]')].map((el, i) => { el.setAttribute("data-nc", String(i)); return { i, href: el.getAttribute("href"), text: (el.innerText || "").trim().slice(0, 30), inHeader: !!el.closest("header") }; }));
  for (const l of links) {
    if (m && l.inHeader && !l.href.includes("gratis-audit")) continue; // nav-lenker ligger i mobilmenyen
    const el = p.locator(`[data-nc="${l.i}"]`).first();
    await el.evaluate((n) => n.scrollIntoView({ block: "center", behavior: "instant" })).catch(() => {}); await p.waitForTimeout(300);
    const vis = await el.isVisible();
    if (!vis) { problems.push(`${label} forside: «${l.text}» (${l.href}) er ikke synlig`); continue; }
    const r = await el.click({ timeout: 4000, trial: true }).then(() => "ok").catch((e) => e.message.split("\n")[0]);
    if (r !== "ok") { problems.push(`${label} forside: «${l.text}» (${l.href}) kan ikke klikkes: ${r.slice(0, 90)}`); continue; }
    await el.click(); await settle(p);
    const t = await targetTop(p, l.href.split("#")[1]);
    if (t === null || Math.abs(t) > 120) problems.push(`${label} forside: «${l.text}» (${l.href}) endte ${t}px fra målet`);
  }

  // Mobilmeny
  if (m) {
    await p.goto(base + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    await p.getByRole("button", { name: "Meny" }).click();
    const menuLink = p.locator('nav[aria-label="Mobilmeny"] a[href="/#audit"]');
    const ok = await menuLink.waitFor({ state: "visible", timeout: 3000 }).then(() => true).catch(() => false);
    if (!ok) { problems.push("mobil: menyen åpnet ikke (lenken ble ikke synlig)"); }
    else { await menuLink.click(); await settle(p); }
    const t = await targetTop(p, "audit"); if (t === null || Math.abs(t) > 120) problems.push(`mobil meny: Slik funker det endte ${t}px fra målet`);
    const menuStillOpen = await p.locator('nav[aria-label="Mobilmeny"]').isVisible().catch(() => false);
    if (menuStillOpen) problems.push("mobil: menyen lukket seg ikke etter klikk");
  }

  // Fra undersider
  for (const [path, sel, id] of [["/prosjekter/kla", 'main a[href="/#gratis-audit"]', "gratis-audit"], ["/prosjekter", 'main a[href="/#gratis-audit"]', "gratis-audit"], ["/personvern", 'header a[href="/#gratis-audit"]', "gratis-audit"]]) {
    await p.goto(base + path, { waitUntil: "networkidle" }); await p.waitForTimeout(800);
    const el = p.locator(sel).first();
    if (!(await el.isVisible())) { problems.push(`${label} ${path}: knapp ikke synlig`); continue; }
    await el.click(); await p.waitForURL(/\/#gratis-audit$/, { timeout: 5000 }).catch(() => problems.push(`${label} ${path}: URL byttet ikke til /#gratis-audit`));
    await p.waitForTimeout(1500); await settle(p);
    const t = await targetTop(p, id); if (t === null || Math.abs(t) > 160) problems.push(`${label} ${path} → /#${id}: endte ${t}px fra målet`);
  }
  await ctx.close();
}
console.log("PROBLEMER:", problems.length ? "\n- " + problems.join("\n- ") : "ingen");
await b.close();
