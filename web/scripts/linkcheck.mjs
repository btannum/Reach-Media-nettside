// Sjekker alle lenker og knapper på forsiden + undersider: mål finnes, ankere finnes,
// klikk fører dit, og ingen elementer dekker knappene.
import { chromium } from "playwright-core";
const base = "http://localhost:3002";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const problems = [];
const pages = ["/", "/prosjekter", "/prosjekter/kla", "/prosjekter/spekebua", "/prosjekter/gorilla-games", "/personvern"];

for (const path of pages) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const links = await page.evaluate(() =>
    [...document.querySelectorAll("a[href], button")].map((el) => ({
      tag: el.tagName,
      href: el.getAttribute("href"),
      text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40),
      disabled: el.disabled === true,
      type: el.getAttribute("type"),
    })),
  );
  const ids = await page.evaluate(() => [...document.querySelectorAll("[id]")].map((e) => e.id));
  for (const l of links) {
    if (!l.href) continue;
    if (l.href.startsWith("mailto:") || l.href.startsWith("tel:") || l.href.startsWith("http")) continue;
    const [p, hash] = l.href.split("#");
    if (hash) {
      const targetPath = p || path;
      if (targetPath === "/" && path === "/") {
        if (!ids.includes(hash)) problems.push(`${path}: anker #${hash} finnes ikke (lenke «${l.text}»)`);
      } else if (targetPath === "/") {
        // sjekkes på forsiden
        const r = await ctx.request.get(base + "/");
        const html = await r.text();
        if (!html.includes(`id="${hash}"`)) problems.push(`${path}: anker /#${hash} finnes ikke på forsiden (lenke «${l.text}»)`);
      }
    } else {
      const r = await ctx.request.get(base + p);
      if (r.status() >= 400) problems.push(`${path}: ${p} gir ${r.status()} (lenke «${l.text}»)`);
    }
  }
  console.log(`${path}: ${links.length} lenker/knapper sjekket`);
}

// Klikktest på forsiden: hver anker-lenke i nav + CTA-knapper skal faktisk flytte scroll,
// og elementet under musepekeren skal være knappen selv (ingen overlegg).
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const clickables = await page.evaluate(() =>
  [...document.querySelectorAll('a[href^="/#"], a[href^="#"]')].map((el, i) => {
    el.setAttribute("data-lc", String(i));
    return { i, href: el.getAttribute("href"), text: (el.innerText || "").trim().slice(0, 40) };
  }),
);
for (const c of clickables) {
  const el = page.locator(`[data-lc="${c.i}"]`).first();
  await el.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(400);
  const box = await el.boundingBox();
  if (!box) { problems.push(`klikk: «${c.text}» (${c.href}) har ingen boks (skjult?)`); continue; }
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  const top = await page.evaluate(([x, y, i]) => {
    const t = document.elementFromPoint(x, y);
    const target = document.querySelector(`[data-lc="${i}"]`);
    return t && (t === target || target.contains(t)) ? "ok" : (t ? t.tagName + "." + (t.className || "").toString().slice(0, 60) : "null");
  }, [cx, cy, c.i]);
  if (top !== "ok") { problems.push(`klikk: «${c.text}» (${c.href}) dekkes av ${top}`); continue; }
  const before = await page.evaluate(() => window.scrollY);
  await el.click({ timeout: 3000 }).catch((e) => problems.push(`klikk: «${c.text}» feilet: ${e.message.slice(0, 80)}`));
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => window.scrollY);
  const hash = c.href.split("#")[1];
  const targetTop = await page.evaluate((h) => { const e = document.getElementById(h); return e ? e.getBoundingClientRect().top : null; }, hash);
  if (targetTop === null) problems.push(`klikk: «${c.text}» mål #${hash} mangler`);
  else if (Math.abs(targetTop) > 200 && before === after) problems.push(`klikk: «${c.text}» (${c.href}) scrollet ikke (mål ${Math.round(targetTop)}px unna)`);
}
console.log("\nPROBLEMER:", problems.length ? "\n- " + problems.join("\n- ") : "ingen");
await b.close();
