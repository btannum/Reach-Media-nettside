"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  storeUrl: string;
  platform: "" | "meta" | "google" | "both";
  monthlySpend: "" | "under50k" | "50k-100k" | "100k-250k" | "over250k";
  message: string;
  company: string;
};

type Errors = Partial<Record<keyof Fields | "form", string>>;

const empty: Fields = {
  name: "",
  email: "",
  storeUrl: "",
  platform: "",
  monthlySpend: "",
  message: "",
  company: "",
};

const SERVER_ERROR = `Skjemaet gikk ikke gjennom. Send en e-post til ${site.email} i stedet.`;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Skriv navnet ditt.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Skriv en gyldig e-post.";
  const url = f.storeUrl.trim().replace(/^https?:\/\//, "");
  if (!url.includes(".") || /\s/.test(url))
    e.storeUrl = "Skriv adressen til nettbutikken, for eksempel butikk.no.";
  if (!f.platform) e.platform = "Velg plattform.";
  if (!f.monthlySpend) e.monthlySpend = "Velg omtrent hvor mye dere bruker.";
  if (f.message.length > 2000) e.message = "Maks 2000 tegn.";
  return e;
}

const fieldBase =
  "w-full rounded-xs border border-hairline bg-surface-2 px-4 text-body text-fg transition-[border-color,box-shadow] duration-150 ease-state placeholder:text-fg-muted/60 focus:border-signal-focus focus:shadow-[0_0_0_3px_var(--color-signal-soft)] focus:outline-none aria-[invalid=true]:border-error";

const inputCls = `${fieldBase} h-[52px]`;
const selectCls = `${fieldBase} h-[52px] appearance-none pr-11`;
const textareaCls = `${fieldBase} min-h-[128px] py-3.5`;

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-muted"
    >
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-label text-fg-muted">
        {label}
        {optional && " (valgfritt)"}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-small text-error">
          {error}
        </p>
      )}
    </div>
  );
}

// Skjemaet alene. Brukes i ClosingCards (lyst kort) og i GratisAudit.
export function AuditForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  // Settes etter mount så server og klient rendrer likt. Ref, ikke state:
  // verdien påvirker ikke rendring.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set =
    (key: keyof Fields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const id = (name: keyof Fields) => `${uid}-${name}`;
  const aria = (name: keyof Fields) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    if (Object.keys(found).length) {
      setErrors(found);
      const first = Object.keys(found)[0] as keyof Fields;
      document.getElementById(id(first))?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          storeUrl: fields.storeUrl.trim(),
          startedAt: startedAt.current || Date.now(),
        }),
      });
      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as {
          errors?: Errors;
        } | null;
        setErrors(data?.errors ?? { form: SERVER_ERROR });
        setStatus("idle");
        return;
      }
      if (res.status === 429) {
        setErrors({ form: "For mange forsøk. Prøv igjen om ti minutter." });
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setErrors({ form: SERVER_ERROR });
      setStatus("idle");
    }
  }

  return (
    <div className="relative">
        {status === "sent" ? (
          <p
            role="status"
            className="rounded-md bg-surface-2 p-6 text-body"
          >
            Takk. Vi svarer fra {site.email} innen én virkedag.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <Field id={id("name")} label="Navn" error={errors.name}>
              <input
                id={id("name")}
                name="name"
                type="text"
                autoComplete="name"
                required
                value={fields.name}
                onChange={set("name")}
                className={inputCls}
                {...aria("name")}
              />
            </Field>

            <Field id={id("email")} label="E-post" error={errors.email}>
              <input
                id={id("email")}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={fields.email}
                onChange={set("email")}
                className={inputCls}
                {...aria("email")}
              />
            </Field>

            <Field
              id={id("storeUrl")}
              label="Nettbutikk"
              error={errors.storeUrl}
            >
              <input
                id={id("storeUrl")}
                name="storeUrl"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="butikk.no"
                required
                value={fields.storeUrl}
                onChange={set("storeUrl")}
                className={inputCls}
                {...aria("storeUrl")}
              />
            </Field>

            <Field
              id={id("platform")}
              label="Plattform"
              error={errors.platform}
            >
              <div className="relative">
                <select
                  id={id("platform")}
                  name="platform"
                  required
                  value={fields.platform}
                  onChange={set("platform")}
                  className={selectCls}
                  {...aria("platform")}
                >
                  <option value="" disabled>
                    Velg plattform
                  </option>
                  <option value="meta">Meta</option>
                  <option value="google">Google</option>
                  <option value="both">Begge</option>
                </select>
                <Chevron />
              </div>
            </Field>

            <Field
              id={id("monthlySpend")}
              label="Månedlig adspend"
              error={errors.monthlySpend}
            >
              <div className="relative">
                <select
                  id={id("monthlySpend")}
                  name="monthlySpend"
                  required
                  value={fields.monthlySpend}
                  onChange={set("monthlySpend")}
                  className={selectCls}
                  {...aria("monthlySpend")}
                >
                  <option value="" disabled>
                    Velg beløp
                  </option>
                  <option value="under50k">Under 50 000 kr</option>
                  <option value="50k-100k">50 000–100 000 kr</option>
                  <option value="100k-250k">100 000–250 000 kr</option>
                  <option value="over250k">Over 250 000 kr</option>
                </select>
                <Chevron />
              </div>
            </Field>

            <Field
              id={id("message")}
              label="Melding"
              error={errors.message}
              optional
            >
              <textarea
                id={id("message")}
                name="message"
                rows={4}
                maxLength={2000}
                value={fields.message}
                onChange={set("message")}
                className={textareaCls}
                {...aria("message")}
              />
            </Field>

            {/* Honeypot: skjult for folk, synlig for roboter. */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-px w-px overflow-hidden"
            >
              <label htmlFor={id("company")}>Firma</label>
              <input
                id={id("company")}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={fields.company}
                onChange={set("company")}
              />
            </div>

            {errors.form && (
              <p role="alert" className="text-small text-error">
                {errors.form}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto sm:min-w-[200px]"
              >
                {status === "sending" ? "Sender …" : "Få gratis audit"}
              </Button>
              <p className="text-small text-fg-muted">
                Vi bruker opplysningene kun til å svare deg. Se{" "}
                <Link
                  href="/personvern"
                  className="text-fg underline decoration-hairline-strong underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus"
                >
                  personvern
                </Link>
                .
              </p>
            </div>
          </form>
        )}
    </div>
  );
}

// Frittstående seksjon (brukes ikke på forsiden lenger; ClosingCards har skjemaet).
export function GratisAudit() {
  return (
    <section id="gratis-audit" className="container-rm section-y">
      <div className="mx-auto max-w-[520px]">
        <h2 className="text-headline">Send oss lesetilgang. Få rapporten.</h2>
        <p className="mt-6 text-body text-fg-muted">
          Fyll ut, så tar vi kontakt innen én virkedag med instruks for tilgang.
        </p>
        <div className="mt-10">
          <AuditForm />
        </div>
      </div>
    </section>
  );
}
