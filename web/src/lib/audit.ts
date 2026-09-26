// Kontrakt for POST /api/audit (SPEC.md §5). Deles av skjema og route handler.

export const platforms = ["meta", "google", "both"] as const;
export const spendBands = ["under50k", "50k-100k", "100k-250k", "over250k"] as const;

export type Platform = (typeof platforms)[number];
export type SpendBand = (typeof spendBands)[number];

export const platformLabel: Record<Platform, string> = {
  meta: "Meta",
  google: "Google",
  both: "Meta og Google",
};

export const spendLabel: Record<SpendBand, string> = {
  under50k: "Under 50 000 kr",
  "50k-100k": "50 000–100 000 kr",
  "100k-250k": "100 000–250 000 kr",
  over250k: "Over 250 000 kr",
};

export type AuditRequest = {
  name: string;
  email: string;
  storeUrl: string;
  platform: Platform;
  monthlySpend: SpendBand;
  message?: string;
  company?: string;
  startedAt?: number;
};

export type AuditErrors = Partial<
  Record<keyof AuditRequest | "form", string>
>;

export type AuditResponse =
  | { ok: true }
  | { ok: false; errors: AuditErrors };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Normaliserer «butikk.no» → «https://butikk.no». Returnerer null hvis ugyldig. */
export function normalizeStoreUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Validerer og normaliserer. Feilmeldinger sier hva som er galt og hva som fikser det. */
export function validateAudit(input: unknown): {
  data?: AuditRequest;
  errors: AuditErrors;
} {
  const errors: AuditErrors = {};
  const body = (typeof input === "object" && input !== null ? input : {}) as Record<
    string,
    unknown
  >;

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");

  const name = str("name");
  if (name.length < 2 || name.length > 80) errors.name = "Skriv navnet ditt.";

  const email = str("email");
  if (!emailRe.test(email)) errors.email = "Skriv en gyldig e-post, f.eks. navn@butikk.no.";

  const storeUrl = normalizeStoreUrl(str("storeUrl"));
  if (!storeUrl) errors.storeUrl = "Skriv adressen til nettbutikken, f.eks. butikk.no.";

  const platform = str("platform") as Platform;
  if (!platforms.includes(platform)) errors.platform = "Velg plattform.";

  const monthlySpend = str("monthlySpend") as SpendBand;
  if (!spendBands.includes(monthlySpend)) errors.monthlySpend = "Velg omtrent hvor mye dere bruker i måneden.";

  const message = str("message");
  if (message.length > 2000) errors.message = "Maks 2000 tegn.";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      name,
      email,
      storeUrl: storeUrl!,
      platform,
      monthlySpend,
      message: message || undefined,
      company: str("company") || undefined,
      startedAt: typeof body.startedAt === "number" ? body.startedAt : undefined,
    },
  };
}
