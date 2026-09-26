// Tester audit-skjemaet i headless Chrome: klientvalidering og serverfeil.
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3002/test-10-12";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
p.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text().slice(0, 300));
});
p.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 300)));

await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(800);

const form = p.locator("#gratis-audit form");
const submit = form.locator('button[type="submit"]');

// 1) Tomt skjema → feilmeldinger, fokus på første felt.
await submit.click();
await p.waitForTimeout(200);
const errs1 = await form.locator("p.text-error").allTextContents();
const focused = await p.evaluate(() => document.activeElement?.getAttribute("name"));
console.log("tomt skjema:", errs1.length, "feil; fokus på", focused);

// 2) Ugyldig e-post og URL.
await form.locator('input[name="name"]').fill("Test Testesen");
await form.locator('input[name="email"]').fill("ikke-epost");
await form.locator('input[name="storeUrl"]').fill("butikk");
await form.locator('select[name="platform"]').selectOption("both");
await form.locator('select[name="monthlySpend"]').selectOption("50k-100k");
await submit.click();
await p.waitForTimeout(200);
const errs2 = await form.locator("p.text-error").allTextContents();
console.log("ugyldig:", JSON.stringify(errs2));

// 3) Gyldig → POST /api/audit (finnes ikke → 404) → serverfeil-melding.
await form.locator('input[name="email"]').fill("test@example.com");
await form.locator('input[name="storeUrl"]').fill("butikk.no");
const [req] = await Promise.all([
  p.waitForRequest((r) => r.url().endsWith("/api/audit") && r.method() === "POST"),
  submit.click(),
]);
console.log("POST body:", req.postData());
await p.waitForTimeout(1200);
const alert = await form.locator('[role="alert"]').textContent().catch(() => null);
console.log("serverfeil:", alert);
console.log("knapp:", await submit.textContent(), "disabled:", await submit.isDisabled());
await p.screenshot({
  path: "../.impeccable/review/agent-10-12/form-error.png",
  fullPage: false,
});

console.log("console-feil:", errors.length ? errors : "ingen");
await b.close();
