# Reach Media nettside — Claude Code bootstrap

## Før du limer inn Prompt A (gjør dette selv én gang)

1. **Mappenavn:** Bruk `~/Prosjekter/Reach Media Nettside` uten trailing space.
2. **Impeccable** (anti AI-slop):
   ```bash
   npx skills add pbakaus/impeccable
   ```
   I Claude Code etterpå: `/impeccable init` (når prosjektet er opprettet).
3. Skills som allerede er OK: `frontend-design`, `ui-ux-pro-max`.
4. **Modell:** `/model fable` (Fable 5) til SPEC/DESIGN og vanskelig arkitektur. Sonnet (eller Opus) til seksjon-for-seksjon for å spare kreditter.
5. Proof-bilder:
   - `Medier /Resultater meta og google/Skjermbilde 2026-09-24 kl. 21.23.09.png` → Meta
   - `Medier /Resultater meta og google/WhatsApp Image 2026-09-16 at 16.26.01.jpeg` → Google
6. Logoer: `Medier /Logoer RM og kunder/` — Gorilla Games, KLA, Spekebua, Beeki, CarPlay, Novito (kommer i morgen hvis tom).

---

## Plan (faser — ikke hopp)

| Fase | Hva | Stopp-kriterium |
|------|-----|-----------------|
| 0 | Stack + repo | `npm run dev` virker |
| 1 | `/impeccable init` + PRODUCT.md + DESIGN.md + SPEC.md | Du godkjenner alle tre |
| 2 | Shell: layout, nav, tokens, typografi | Ser premium dark+blue |
| 3 | Seksjoner 1→12 én om gangen | OK etter hver |
| 4 | Audit-form (backend) | E-post lander hos bendik@reachmedia.no |
| 5 | `/impeccable audit` → fix → `/impeccable polish` | Null åpenbare AI-tells |
| 6 | Deploy (Vercel) | Live URL |

### Fase 0 — stack
- Next.js 15 App Router + TypeScript + Tailwind v4 (eller v3) + Framer Motion
- Ingen CMS i v1 (statisk innhold i komponenter / MDX OK senere)
- Mappe: `public/proof/`, `public/media/logos/`

### Fase 4 — «backend» (lett, riktig for v1)
- Audit-CTA: Server Action eller Route Handler `POST /api/audit`
- Send e-post via **Resend** (anbefalt) til `bendik@reachmedia.no`
- Felter: navn, e-post, nettbutikk-URL, plattform (Meta/Google/begge), månedlig adspend, melding
- Spam: honeypot + enkel rate limit
- Env: `RESEND_API_KEY`, `AUDIT_TO_EMAIL`
- Ikke bygg dashboard/auth ennå

---

## Prompt A — lim inn først (hele blokken)

```
Vi skal lage en ny nettside for Reach Media (reachmedia.no) — norsk performance-byrå for B2C Shopify-butikker.

## Skills (bruk aktivt)
- frontend-design
- ui-ux-pro-max
- impeccable (installer/init hvis mangler: npx skills add pbakaus/impeccable)

## Arbeidsregler
1. IKKE skriv produksjonskode før jeg har godkjent SPEC.md + DESIGN.md + PRODUCT.md.
2. Jobb i faser. Stopp og vent på OK etter hver fase.
3. Norsk copy. Tone: direkte, kompetent, uten byrå-fluff.
4. Unngå AI-slop: Inter/Arial defaults, purple gradients, nested cards, stock photos, Lucide-ikon-grid, bounce easing, generisk SaaS-layout.
5. Modell-hint: planlegg grundig; implementer seksjon for seksjon.

## Moodboard (kun disse)
1. conversion-design.com — metric chips på mockups, capacity ticker, problem→løsning
2. getconversions.com — mørk premium, type-over-products, ROAS/CPA-språk
3. anti.as — negativ space, art-directed service tiles
4. trystockholm.com — asymmetrisk hero, ett mettet fargefelt
Struktur-inspirasjon: arcads.no (audit-steg, ads-gallery, comparison-tabell, prosess, 100% resultatbasert)

## Visuell retning (låst)
- Dark premium + blå branding
- bg: #0A0E17 / elevated #111827
- text: #F8FAFC / muted #94A3B8
- accent: #3B82F6 (CTA), hover #2563EB, soft #60A5FA/20
- borders white/10, cards white/5
- Én mettet blå flate for primær CTA eller timeline (TRY-stil)
- Føles: GetConversions-mørke + ANTI-luft + Conversion Design craft
- IKKE SaaS indigo-template

## ICP
Norske/nordiske B2C Shopify-butikker med meningsfullt adspend. De skal få svar på: hva dere gjør, hvordan audit funker, hvordan samarbeid ser ut, hvorfor ikke stort byrå / Fiverr, hva «resultatbasert» betyr, bevis.

## Forside — seksjonsrekkefølge (låst)
1. Hero — ICP + CTA «Gratis audit» (rent; ingen Ads Manager-bilder)
2. Problem — lekkasje mellom ads og store (Conversion Design-tone)
3. Løsning — hvordan vi lukker gapet
4. Audit-steg — lesetilgang → ekspert-audit → rapport → Loom → gjennomgang
5. Ads-gallery — mange statics + få UGC (KLA); tags STATIC/UGC
6. Resultater — to proof-mockups + metric chips + scroll count-up + mild hover tilt
7. Comparison — Reach Media vs vanlig byrå vs Upwork/Fiverr (USP: 100% resultatbasert, høy ad-kapasitet, vi lager ads selv, norsk, daglig oppfølging, ukentlig Loom, månedlig møte)
8. Timeline samarbeid — research → ads → launch → daglig opt → skalere vinnere → ukentlig Loom → månedlig møte
9. Kundelogos — Gorilla Games, KLA, Spekebua, Beeki, CarPlay, Novito (placeholders til filene kommer)
10. Om oss — norsk byrå, hvem som gjør jobben
11. FAQ
12. Final CTA
+ /prosjekter (thin ved launch)

## Proof-assets
- Medier /Resultater meta og google/Skjermbilde 2026-09-24 kl. 21.23.09.png → public/proof/meta-ads-manager.png
  Chips: ROAS 15.51 · 1073 kjøp · peak ROAS 24.15
- Medier /Resultater meta og google/WhatsApp Image 2026-09-16 at 16.26.01.jpeg → public/proof/google-ads-dashboard.jpeg
  Chips: conv. rate 10.41% · cost/conv kr 20.33 · conv. value 1.44M · cost kr 23.1k
- Logoer: Medier /Logoer RM og kunder/

## Fase 0 (gjør nå)
Scaffold Next.js App Router + TS + Tailwind + Framer Motion i denne mappa (eller undermappe `web/` hvis du anbefaler det — foreslå og spør).
Sett opp public/proof + public/media/logos.
Bekreft `npm run dev`.

## Fase 1 (deretter — ingen UI-kode ennå)
Kjør /impeccable init.
Skriv:
- PRODUCT.md (ICP, job-to-be-done, voice, anti-references)
- DESIGN.md (tokens, type, motion, komponentregler, anti-slop)
- SPEC.md (sidekart, seksjoner med headline+bullets, audit API-kontrakt, asset-liste)

Stopp. Vis meg de tre filene. Vent på godkjenning.
```

---

## Prompt B — etter at du har godkjent SPEC (lim inn neste)

```
SPEC/DESIGN/PRODUCT er godkjent. Implementer fase for fase. Stopp etter hver.

Fase 2: app shell — layout, nav, footer, tokens i globals/CSS, typografi. Ingen seksjonsinnhold ennå.
Fase 3: bygg forsiden seksjon 1→12 i rekkefølge. Én seksjon per svar. Etter Resultater: kopier proof-filene til public/proof/ og wire count-up + hover.
Fase 4: audit-form → Server Action/Route Handler + Resend. Env-eksempel i .env.example. Honeypot + validering.
Fase 5: /impeccable audit, fiks funn, /impeccable polish. Mobile + desktop.
Fase 6: foreslå Vercel-deploy + domene-steg for reachmedia.no.

Bruk frontend-design + ui-ux-pro-max + impeccable i hver UI-fase.
```

---

## Prompt C — når logoer ligger i media/

```
Logoer er lastet opp i media/. Wire kundelogos-seksjonen:
Gorilla Games, KLA, Spekebua, Beeki, CarPlay, Novito.
Grayscale → full farge på hover. Optimaliser SVG/PNG. Ingen fake «+N kunder».
```
