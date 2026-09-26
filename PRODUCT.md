# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router + TypeScript + Tailwind v4 + Framer Motion, i `web/`. Statisk innhold i komponenter (ingen CMS i v1). Deploy: Vercel, domene reachmedia.no. Valgt av bruker i briefen; `web/`-undermappe anbefalt av Claude og bekreftet.

## Users

**Primærbruker:** eier eller markedsansvarlig i en norsk/nordisk B2C Shopify-butikk som allerede bruker minst ca. 50 000 kr/mnd på Meta- og/eller Google-annonser. De kjenner Ads Manager, ROAS og CPA, og kjøper ikke «synlighet». Situasjon: de bruker penger på annonser som ikke gir det de burde, eller de har et byrå/frilanser som leverer for lite, for sakte, eller uten å lage annonsene selv. Jobb: finne ut om Reach Media kan få mer omsetning ut av samme eller større budsjett, med lav risiko for dem.

Sekundært: samme person som sammenligner Reach Media mot et større byrå eller Upwork/Fiverr-frilansere.

Terskel bekreftet av bruker: «meningsfullt adspend» = fra 50 000 kr/mnd. Kan nevnes i copy og brukes som intervall i audit-skjemaet.

## Product Purpose

Reach Media er et norsk performance-byrå som driver betalt annonsering (Meta + Google) for B2C Shopify-butikker, og lager annonsematerialet (statics + UGC) selv. Nettsiden skal få kvalifiserte butikker til å be om en gratis audit. Suksess = audit-forespørsler fra butikker som passer ICP, ikke trafikk eller «awareness».

Besøkende skal få svar på seks ting: hva Reach Media gjør, hvordan auditen funker, hvordan et samarbeid ser ut, hvorfor ikke et stort byrå eller Fiverr, hva «resultatbasert» betyr, og bevis.

## Positioning

**Resultatbasert, tilpasset marginene:** hovedmodellen er 100 % provisjon av omsetningen annonsene gir. Men tilbudet tilpasses alltid kundens marginer: noen vil ha fastpris, andre provisjon, og Reach Media finner en løsning uansett situasjon. Bekreftet av bruker 2026-09-25. Copy skal si «hovedsakelig provisjon av omsetning» og «tilpasset marginene dine», ikke «aldri fastpris».

**Ikke en junior hos et stort byrå:** de som selger jobben, planlegger og håndterer annonsene selv. Kunden blir ikke sendt videre til en junior partner. Dette er hovedargumentet mot store byråer.

Støttende USP-er (fra brief, låst):
- Høy annonsekapasitet: mange statics + UGC per måned, laget av Reach Media selv (ikke outsourcet).
- Norsk byrå, norsk copy, norsk marked.
- Daglig optimalisering, ukentlig Loom-video, månedlig møte.
- Én ansvarlig, ikke en account manager som videreformidler.

Sammenligningsakser (brief): Reach Media vs. vanlig byrå vs. Upwork/Fiverr.

## Operating Context

- **Audit-prosess (endret 2026-09-26):** discovery call (bookes i HighLevel-kalenderen https://api.leadconnectorhq.com/widget/booking/VmE2AV3g23TVWSvtTRXj) → lesetilgang til annonsekontoene → ekspert-audit → Loom-video med funnene → gjennomgang. Gratis, ingen forpliktelse. Rapport-steget er fjernet (2026-09-25).
- **Samarbeidsløp (fast rekkefølge):** research → produksjon av annonser → launch → daglig optimalisering → skalere vinnere → ukentlig Loom → månedlig møte.
- **Plattformer:** Meta (Facebook/Instagram) og Google Ads. Butikkplattform: Shopify.
- **Tekniske tjenester (bruker 2026-09-25):** server-side tracking (kunden eier dataene selv, ikke en tredjepart), Shopify-utvikling og migrering (Spekebua: over 10 000 datapunkter), optimalisering i DataFeedWatch og Google Merchant Center, CRO. Vises i egen seksjon på forsiden og som chips på case-sidene.
- **Språk/terminologi som brukes uoversatt:** ROAS, CPA, adspend, statics, UGC, Loom, audit, Ads Manager, konverteringsrate.
- **Inntak (endret 2026-09-26):** booking av discovery call via HighLevel-kalenderen, innebygd som iframe i siste seksjon. Skjemaet (`AuditForm`, POST /api/audit via Resend) er beholdt i koden, men ikke i bruk. Tidligere: Felter: navn, e-post, nettbutikk-URL, plattform (Meta/Google/begge), månedlig adspend (intervaller), melding. Honeypot + enkel rate limit. Ingen dashboard/auth i v1.

## Capabilities and Constraints

- Sider ved launch: forside (12 seksjoner i låst rekkefølge, se SPEC.md) + `/prosjekter` (tynn ved launch).
- Ingen CMS; innhold lever i komponenter. MDX kan komme senere.
- Ingen Ads Manager-skjermbilder i hero; proof-bilder brukes kun i Resultater-seksjonen.
- **Ikke avklart:** konkret tall for annonsekapasitet per måned. Byråets interne CLAUDE.md (`~/Prosjekter/CLAUDE.md`) nevner «opptil 20 ads/uke for Spekebua» som volum-eksempel; bruk kun etter bekreftelse.
- **Team på siden (bekreftet av bruker 2026-09-25):** Bendik Tannum (co-founder, kreativ strateg), Kevin Johansen Zeba (co-founder, media buyer, Meta), Sahil (senior developer/backend og Google-ekspert). Jimmy Norberg skal **ikke** nevnes. I tillegg nevnes, uten navn: «en Google-ekspert» og «flere grafiske designere vi jobber med». Budskapet: designerne produserer, men det er Reach Media som planlegger og håndterer annonsene. Ingen oppdiktede personer eller stockbilder.
- **Vilkår (oppdatert av Bendik 2026-09-26):** ingen bindingstid, 3 måneders oppsigelse (byrå-CLAUDE.md sier 1 mnd; siden bruker 3), oppstartsdepositum 5 000 kr som trekkes fra første faktura. Eksakt prosentsats oppgis ikke på siden.
- **Betalingsmodell (avklart 2026-09-25):** hovedsakelig 100 % provisjon av omsetning, men tilpasses marginer; fastpris finnes for de som vil ha det. Se Positioning.
- Ingen fabrikkerte «+N kunder»-tall, testimonialer eller benchmarks.

## Brand Commitments

- Navn: Reach Media. Domene: reachmedia.no. Kontakt: post@reachmedia.no (footer). Kontaktblokk på forsiden (2026-09-26): Bendik Tannum, bendik@reachmedia.no, 45 86 26 46, «kontaktperson, kreativ strateg og co-founder».
- Voice: norsk, direkte, kompetent, uten byrå-fluff. Snakker ROAS/CPA-språk med folk som kan det. Ingen «vi brenner for», ingen «skreddersydd», ingen utropstegn-entusiasme.
- Visuell retning er låst av bruker og gjengitt i DESIGN.md: mørk premium + blå branding, én mettet blå flate, ingen SaaS-indigo-mal.
- Moodboard (kun disse): conversion-design.com, getconversions.com, anti.as, trystockholm.com. Strukturinspirasjon: arcads.no.
- Anti-referanser (bindende): Inter/Arial-defaults, lilla gradienter, kort-i-kort, stockfoto, Lucide-ikon-grid, bounce-easing, generisk SaaS-layout.
- Primær-CTA: «Book gratis audit» → `#gratis-audit` (kalenderen). Dagens «Book kartleggingsmøte» erstattes.
- H1 og metatittel (Grok-spor 2026-09-25): «Skaler med overskudd. 100 % resultatbasert.» Merk: «100 % resultatbasert» står nå i H1 selv om modellen kan være fastpris/hybrid; ingress og betalingsseksjon nyanserer.

## Evidence on Hand

- `web/public/proof/meta-ads-manager.png` (2022×948 etter beskjæring av mørk kant 2026-09-25; original 2028×952, fra `Medier /Resultater meta og google/Skjermbilde 2026-09-24 kl. 21.23.09.png`). Chips: ROAS 15.51 · 1073 kjøp · peak ROAS 24.15.
- `web/public/proof/google-ads-dashboard.jpeg` (1500×582, fra `Medier /Resultater meta og google/WhatsApp Image 2026-09-16 at 16.26.01.jpeg`). Chips: conv. rate 10.41 % · cost/conv kr 20.33 · conv. value 1.44M · cost kr 23.1k.
- Kundelogoer (navn bekreftet, filer mangler): Gorilla Games, KLA, Spekebua, Beeki, CarPlay, Novito. Kommer i `Medier /Logoer RM og kunder/` → `web/public/media/logos/`. Plassholdere til da.
- Annonseeksempler til ads-gallery: ikke levert ennå. Brief nevner UGC for KLA. Plassholdere merket STATIC/UGC til filene kommer.
- KLA-casen fra dagens side (+100 % omsetning, 14× ROAS, 200 000+ kr, samme budsjett) er bekreftet av bruker 2026-09-25 og brukes. «50+ fornøyde kunder» brukes ikke.
- **Spekebua-casen (bruker 2026-09-25):** ett års samarbeid, Meta + Google, Shopify-migrering med 10 000+ datapunkter, server-side tracking, DataFeedWatch og Merchant Center. +2 mill. kr omsetning på ett år med samme ROAS og 50 % mer budsjett (bruker 2026-09-26). «30 → 50 mill.» er tatt ut av siden 2026-09-26 på brukers ønske. Proof-skjermbildene (Meta/Google) er fra Spekebuas kontoer.
- **KLA, pågående:** migrering fra gammel nettbutikk til Shopify. Illustrasjon `web/public/media/kla-migrering.webp` (fra `Medier /kla-migrering.png`), brukes på forsiden (Tjenester) og på /prosjekter/kla.
- Reach Media-logo: ikke levert ennå (forventet i `Medier /Logoer RM og kunder/`). Wordmark i tekst til da.
- Ingen testimonialer, presseomtale eller casetekster levert.

## Product Principles

1. **Kvalifiser, ikke overtal.** Siden skal få riktige butikker til å be om audit og la feil butikker forstå at de ikke passer. Tall (50k+/mnd) og språk (ROAS/CPA) er filtre, ikke barrierer.
2. **Bevis før påstand.** Hver USP skal kunne pekes tilbake til noe konkret: skjermbilde, prosess-steg, mekanisme. Påstand uten bevis kuttes.
3. **Resultatbasert er forklart, ikke bare sagt.** «Vi tjener når du tjener» må følges av hva det faktisk betyr.
4. **Gratis audit er lav risiko for dem, og siden skal gjøre det tydelig.** Lesetilgang, ikke admin. Rapport og Loom uansett om de går videre.
5. **Ærlig om størrelse.** Norsk byrå med et lite team er en fordel (nærhet, ansvar, hastighet), ikke noe som skal skjules bak «vi». Du blir ikke sendt til en junior.
6. **Tilpasset, ikke låst.** Betalingen følger marginene til butikken. Siden skal si at vi finner en løsning uansett situasjon, uten å love en modell vi ikke tilbyr.

## Accessibility & Inclusion

WCAG 2.1 AA som minimum (norsk offentlig-sektor-krav gjelder ikke, men mørk bakgrunn krever bevisst kontrast: muted-tekst #94A3B8 på #0A0E17 er ≈7:1, OK; sjekk blå #3B82F6 som tekstfarge på mørk bakgrunn ≈4.6:1, OK for normal tekst, marginal for tynn liten tekst). Motion respekterer `prefers-reduced-motion`. Skjemaet skal fungere uten JavaScript-animasjoner.
