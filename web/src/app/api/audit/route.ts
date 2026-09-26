import { NextResponse } from "next/server";
import {
  platformLabel,
  spendLabel,
  validateAudit,
  type AuditRequest,
  type AuditResponse,
} from "@/lib/audit";

// POST /api/audit (SPEC.md §5): validering, honeypot, enkel rate limit, Resend.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;

// Per instans. Godt nok i v1; bytt til Upstash om det blir misbruk.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "ukjent";
}

function json(body: AuditResponse, status: number) {
  return NextResponse.json(body, { status });
}

function buildEmail(data: AuditRequest, ip: string) {
  const lines = [
    `Navn: ${data.name}`,
    `E-post: ${data.email}`,
    `Nettbutikk: ${data.storeUrl}`,
    `Plattform: ${platformLabel[data.platform]}`,
    `Månedlig adspend: ${spendLabel[data.monthlySpend]}`,
    "",
    "Melding:",
    data.message ?? "(ingen)",
    "",
    `Sendt: ${new Date().toISOString()}`,
    `IP: ${ip}`,
  ];
  return {
    subject: `Audit-forespørsel: ${new URL(data.storeUrl).hostname} (${spendLabel[data.monthlySpend]})`,
    text: lines.join("\n"),
  };
}

async function sendWithResend(data: AuditRequest, ip: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.AUDIT_TO_EMAIL;
  const from = process.env.AUDIT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    throw new Error("Mangler RESEND_API_KEY, AUDIT_TO_EMAIL eller AUDIT_FROM_EMAIL");
  }
  const { subject, text } = buildEmail(data, ip);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject,
      text,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend svarte ${res.status}: ${await res.text()}`);
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return json(
      { ok: false, errors: { form: "For mange forsøk. Prøv igjen om ti minutter." } },
      429,
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, errors: { form: "Ugyldig forespørsel." } }, 400);
  }

  const { data, errors } = validateAudit(body);
  if (!data) return json({ ok: false, errors }, 400);

  // Honeypot og for-rask utfylling: svar som om alt gikk bra, uten å sende.
  const tooFast =
    typeof data.startedAt === "number" && Date.now() - data.startedAt < MIN_FILL_MS;
  if (data.company || tooFast) return json({ ok: true }, 200);

  try {
    await sendWithResend(data, ip);
  } catch (err) {
    console.error("[api/audit]", err);
    return json(
      {
        ok: false,
        errors: {
          form: "Skjemaet gikk ikke gjennom. Send en e-post til post@reachmedia.no i stedet.",
        },
      },
      500,
    );
  }

  return json({ ok: true }, 200);
}
