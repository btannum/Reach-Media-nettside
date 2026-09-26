<!-- SEED: established with the user before implementation; re-run $impeccable document once there's code to capture the actual tokens and components. -->
---
name: Reach Media
description: Lys, presis og luftig performance-side for Shopify-butikker som kan ROAS-språket. Struktur og bevegelse etter Pallet Ross-referansen.
colors:
  bg: "#F4F5F7"
  surface: "#FFFFFF"
  surface-2: "#EEF0F3"
  fg: "#0B1220"
  fg-muted: "#5A6472"
  signal: "#2563EB"
  signal-deep: "#1D4ED8"
  signal-soft: "rgba(37, 99, 235, 0.10)"
  signal-focus: "#3B82F6"
  hairline: "rgba(11, 18, 32, 0.10)"
  hairline-strong: "rgba(11, 18, 32, 0.22)"
  veil: "rgba(11, 18, 32, 0.04)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  metric:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  small:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.01em"
rounded:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "28": "112px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "#FFFFFF"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.signal-deep}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "13px 21px"
  button-secondary-hover:
    backgroundColor: "{colors.veil}"
  chip-metric:
    backgroundColor: "{colors.veil}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xs}"
    padding: "10px 14px"
  tag:
    backgroundColor: "rgba(10, 14, 23, 0.72)"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "4px 8px"
  input:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.fg}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: "14px 16px"
    height: "52px"
---

# Design System: Reach Media

## Overview

**Creative North Star: "Kontoen, lagt på bordet"**

Siden skal føles som å sitte ved siden av noen som kan Ads Manager utenat og legger annonsene og tallene rett på bordet foran deg, i et lyst rom, uten pynt. Ikke et byrå som pitcher; en operatør som viser. Derfor er grunnen lys grå med hvite kort, teksten mørk, stor og få-ordet, og den eneste fargen er signalblå: den brukes der du skal handle, og på ett sammenhengende bånd som forteller hvordan et samarbeid ser ut. Annonsene bærer fargen.

Tre kilder er blandet, med klar vekting. Fra GetConversions: mørket, ROAS/CPA-språket, typografi som bærer hele flaten. Fra ANTI: luften, at seksjoner får slutte med tomrom, og at tjeneste-flisene er art-direktet i stedet for tre like kort. Fra Conversion Design: håndverket i detaljene, metric-chips som ligger oppå ekte skjermbilder, og problem→løsning-rytmen. TRY Stockholm gir den asymmetriske heroen og prinsippet om én mettet fargeflate.

Bekreftede avvisninger (fra brief): Inter/Arial som valg, lilla eller regnbue-gradienter, kort inni kort, stockfoto, rutenett av strek-ikoner, bounce/spring-easing, generisk SaaS-layout med indigo.

**Key Characteristics:**
- Lys grå grunn (#F4F5F7) med hvite kort og myk skygge; annonsene bærer fargen.
- Én skriftfamilie, norsk opphav, brukt i hele spennet fra 13 px til 88 px.
- Én aksentfarge med to jobber: knapper, og ett full-bredde blått bånd.
- Kort er løftet (shadow-card), alt annet flatt. Mørke piller (fg) til etiketter.
- Tall er typografi, ikke mono-etiketter. Metrics settes i tung display-vekt med tabellsifre.
- Bevegelse følger Pallet Ross-referansen seksjon for seksjon: innlasting, kort-koreografi (Hero → Problem), overskrifter ord for ord ved scroll-inn, kort som glir inn, rader som glir hver sin vei, bunke som folder ut til trapp, rutenett der beviset vokser ut, viftede kort, marquee-bånd. Easing alltid ease-out, aldri bounce.

## Colors

Lys grunn i to toner, mørk tekst i to toner, én signalfarge i tre styrker. Kort er hvite flater med myk skygge på den lyse gråen, slik referansen gjør det.

### Primary
- **Signal** (#2563EB): primærknapper (hvit tekst, kontrast 5,2:1), aktive faner, fokusfarge i lenker. Under 5 % av en vanlig skjerm.
- **Signal, dyp** (#1D4ED8): hover på primærknapp, og grunnfargen på det ene mettede blå båndet (marquee med samarbeidsstegene). Hvit tekst.
- **Signal, myk** (rgba(37,99,235,0.10)): uthevet fane/kolonne, aktiv chip-bakgrunn. Aldri som tekstfarge.
- **Signal, fokus** (#3B82F6): fokusring (2 px, offset 2 px) og lenke-understrek ved hover.

### Neutral
- **Bakgrunn** (#F4F5F7): sidens grunn. Alle seksjoner unntatt det blå båndet.
- **Flate** (#FFFFFF): kort, nav-slør, skjema, footer-kort. Med `shadow-card` eller 1 px hårlinje, aldri begge.
- **Flate 2** (#EEF0F3): innvendige felt (input-bakgrunn, plassholder bak bilder, tag-bakgrunn, fliser inne i kort).
- **Tekst** (#0B1220): all primærtekst og overskrifter. Mørke piller (etikettene, referansens @-badges) bruker denne som bakgrunn med hvit tekst. Også bakgrunn for det ene mørke kortet (Om oss / samarbeid).
- **Tekst, dempet** (#5A6472): sekundærtekst, ingress, labels. Kontrast på hvit ≈ 5,6:1.
- **Hårlinje** (rgba(11,18,32,0.10)) og **Hårlinje, sterk** (0.22) kun på hover. **Veil** (0.04) for svake felt på bakgrunnen.

Legacy-aliaser i koden: `ink` = bakgrunn, `ink-elevated` = flate, `paper` = tekst, `paper-muted` = dempet. Ny kode bruker `bg`, `surface`, `surface-2`, `fg`, `fg-muted`.

### Named Rules
**Én-flate-regelen.** Signalblå fyller nøyaktig én seksjon på hele siden (marquee-båndet). Alle andre steder er blått en knapp, en fane, en ring eller en tynn markering.

**Kort-regelen.** Et kort er hvitt på grått med `shadow-card`. Kort inni kort er forbudt; inne i et kort brukes Flate 2 eller hårlinjer.

**Aldri-grå-på-grå-regelen.** Dempet tekst står kun på Bakgrunn eller Flate, aldri på Flate 2 med lang tekst.

## Typography

**Display Font:** Schibsted Grotesk (fallback Helvetica Neue, Arial)
**Body Font:** Schibsted Grotesk
**Label/Mono Font:** ingen egen. Tall settes i Schibsted Grotesk med `font-variant-numeric: tabular-nums`.

**Character:** Schibsted Grotesk er tegnet av Bakken & Bæck for Schibsted-avisene: en norsk grotesk laget for overskrifter som skal leses fort og tåle store størrelser. Den er tett og saklig i 700 med negativ sporing, og rolig nok i 400 til brødtekst. Det gir siden én stemme, fra 88 px-hero til 13 px-tag, og et opphav som faktisk hører hjemme i norsk B2C.

Lastes via `next/font/google` med `display: swap`, vekter 400, 500, 700, 800. Kun latin + latin-ext.

### Hierarchy
- **Display** (700, clamp(2.75rem, 6.5vw, 5.5rem), 0.98, -0.03em): kun H1 i hero. Maks to linjer på desktop, tre på mobil.
- **Headline** (700, clamp(2rem, 4vw, 3.25rem), 1.05, -0.02em): H2 for hver seksjon. Venstrestilt. Maks 14 ord.
- **Title** (500, 1.375rem, 1.25): H3 i fliser, steg, FAQ-spørsmål, tabellhoder.
- **Metric** (800, clamp(2.25rem, 4.5vw, 3.75rem), 1, -0.03em, tabular-nums): tallene i metric-chips og i count-up. Enheten (kr, %, ×) settes i Title-størrelse ved siden av, ikke inni tallet.
- **Body** (400, 1.0625rem, 1.55): ingress og avsnitt. Maks 62ch bredde.
- **Small** (400, 0.9375rem, 1.5): tabellceller, footer, skjemahjelp.
- **Label** (500, 0.8125rem, 1.3, +0.01em, **sentence case**): tags (Static, UGC), feltetiketter, tidsstempel. Aldri versaler.

### Named Rules
**Ingen-eyebrow-regelen.** Seksjoner starter med H2, ikke med en liten sporet etikett over. Trenger seksjonen et nummer, er det fordi innholdet er en sekvens (audit-steg, timeline), og da står nummeret i Title-størrelse i margen, ikke som pynt.

**Hele-setningen-regelen.** Ingen enkeltord i overskrifter får egen farge eller kursiv. Betoning gjøres med linjeskift og ordvalg.

**Tabellsifre-regelen.** Alle tall som endrer seg (count-up) eller står i kolonne bruker tabellsifre. Implementasjonssjekk: bekreft at Schibsted Grotesk eksponerer `tnum`; hvis ikke, reserver bredde med `min-width` i `ch` slik at count-up ikke rister layouten.

## Layout

12-kolonners grid i en container på maks 1200 px, gutter 24 px på mobil og 32 px fra 1024 px. Innholdet er venstrestilt gjennom hele siden; ingenting sentreres utenom sluttseksjonen (Final CTA) og logo-raden.

**Asymmetri er standarden.** Hero: overskrift over kolonne 1–9, CTA-gruppe under, kolonne 10–12 tom. Problem: 5 + 6 kolonner med én tom mellom. Løsning: tre fliser på 5 / 4 / 3 kolonner, ikke 4 / 4 / 4. Resultater: to proof-rammer på 7 / 5 forskjøvet vertikalt med 48 px. Timeline: full bleed.

**Vertikal rytme.** Mellom seksjoner: 112 px desktop (spacing 28), 72 px mobil. Fra H2 til innhold: 32–48 px. Over en H2 er det alltid mer luft enn under. Inne i lister og steg: 24 px. En seksjon får slutte med tomrom; det er ikke en feil.

**Tetthet varierer med vilje.** Hero og Om oss er luftige (ANTI). Sammenligningstabell og FAQ er tette. Timeline er tett og mettet. Ads-gallery bryter containeren og går kant-til-kant med horisontal scroll på mobil.

**Breakpoints:** 640 (sm), 768 (md), 1024 (lg), 1280 (xl). Mobil først. Ingen horisontal scroll utenom gallery. Minste tap-flate 44 px.

## Elevation & Depth

Flatt system. Dybde uttrykkes med tonelag (Ink → Ink hevet → Veil) og hårlinjer, aldri med skygger i hviletilstand.

### Shadow Vocabulary
- **Proof-løft** (`box-shadow: 0 32px 64px -32px rgba(0, 0, 0, 0.7)`): kun under de to proof-rammene i Resultater, kun ved hover sammen med tilt. Forsvinner ved `prefers-reduced-motion`.
- **Nav-slør** (`backdrop-filter: blur(12px)` over `rgba(10,14,23,0.80)`): kun på sticky nav etter 24 px scroll.

### Named Rules
**Flat-i-hvile-regelen.** Ingen komponent har skygge før brukeren gjør noe. Skygge er respons, ikke dekor.

**Ingen-glød-regelen.** Ingen blur-glow bak knapper, ingen radial gradient «lyskilde» i hjørnet av hero. Siden er mørk fordi rommet er mørkt, ikke fordi det er neon.

## Shapes

Tre radier med hierarki, ikke én radius på alt. 6 px på små flater som skal føles presise (chips, tags, input, tabellceller). 10 px på knapper. 16 px på store rammer (proof-mockups, gallery-fliser). Timeline-flaten og seksjoner har 0 px; de er ikke kort, de er rom.

Rammer tegnes alltid med 1 px hårlinje, aldri med 2 px eller med farget kant. Unntak: fokusring (2 px signal-fokus) og uthevet kolonne i tabellen (1 px signal ved 40 % opasitet).

Ingen skråkanter, ingen blob-former, ingen `clip-path`-polygoner som pynt. Den eneste gjentakende geometrien er en horisontal linje: hårlinjer mellom rader, og Timeline-linjen som tegnes gjennom stegene.

## Components

Komponentene finnes ikke i kode ennå. Reglene under er bindende for fase 2 og 3 og oppdateres av `$impeccable document` når koden finnes.

### Buttons
- **Shape:** 10 px radius, høyde 48 px (52 px i skjema), tekst i Body-størrelse, vekt 500.
- **Primary:** Signal-bakgrunn, Paper-tekst, padding 14 px 22 px. Tekst sier hva som skjer: «Få gratis audit», ikke «Send» og ikke «Kom i gang». Ingen pil-glyph på slutten.
- **Hover / Focus:** bakgrunn til Signal dyp på 180 ms `cubic-bezier(0.4, 0, 0.2, 1)`. Ingen løft, ingen skala. Fokus: 2 px Signal-fokus ring med 2 px offset.
- **Secondary:** transparent, 1 px hårlinje, Paper-tekst. Hover: bakgrunn Veil, kant Hårlinje sterk. Brukes til anker-lenker som «Slik funker auditen».
- **Loading:** tekst byttes til «Sender …», knapp deaktiveres, bredde låses så den ikke hopper.

### Chips (metric)
- **Style:** Veil-bakgrunn, 1 px hårlinje, 6 px radius, padding 10 px 14 px. Tallet i Metric-typografi (kan skaleres ned til Title inne i chips på mobil), etiketten i Label under, dempet. Eksempel: `15.51` / `ROAS`.
- **Placement:** ligger oppå proof-rammen, forankret til hjørnet med 16 px inset, forskjøvet 8–12 px utenfor rammen for å se lagt-oppå ut (Conversion Design). Maks tre chips per ramme.
- **State:** count-up fra 0 ved første synlighet (1,4 s, ease-out). Under reduced-motion vises sluttverdien direkte.

### Tags
- **Style:** `rgba(10,14,23,0.72)` bakgrunn med `backdrop-filter: blur(8px)`, Paper-tekst i Label, 6 px radius, padding 4 px 8 px. Tekst «Static» eller «UGC» i sentence case. Plasseres øverst til venstre på gallery-fliser, 12 px inset.

### Cards / Containers
- **Corner Style:** 16 px på proof-rammer og gallery-fliser; 6 px på tabellceller; tjeneste-fliser i Løsning har **ingen** kant og ingen bakgrunn (art-direktet med luft, ANTI), skilt med hårlinjer.
- **Background:** Veil på Ink. Aldri Veil på Veil.
- **Shadow Strategy:** ingen, se Elevation.
- **Border:** 1 px hårlinje.
- **Internal Padding:** 24 px mobil, 32 px desktop.

### Inputs / Fields
- **Style:** Ink-bakgrunn, 1 px hårlinje, 6 px radius, høyde 52 px, Paper-tekst, synlig etikett over feltet i Label. Placeholder kun som eksempel («butikk.no»), aldri som etikett.
- **Focus:** kant til Signal-fokus + 3 px ring i Signal myk. 150 ms.
- **Error:** kant `#F87171`, feilmelding i Small rett under feltet, sier hva som er galt og hva som fikser det. Ikke kun farge; feltet får også `aria-invalid`.
- **Select (plattform, adspend):** samme skall som input, med egen chevron i inline-SVG (16 px, 1,5 px strek).

### Navigation
- Transparent over hero. Etter 24 px scroll: Nav-slør + 1 px hårlinje under. Høyde 64 px.
- Venstre: wordmark «Reach Media» i Title-vekt 700 til logo-fil finnes. Midt: tre lenker i Body, dempet, Paper ved hover med 3 px understrek-offset. Høyre: primærknapp «Gratis audit» (kompakt, 40 px høy).
- Mobil (< 1024): wordmark + primærknapp synlig; lenker i en full-høyde meny på Ink hevet som åpnes fra en knapp med tekst «Meny» (ikke bare ikon).

### Comparison table (signatur)
Tre kolonner: Reach Media, Vanlig byrå, Upwork/Fiverr. Reach Media-kolonnen har Signal myk-bakgrunn og 1 px Signal-kant ved 40 %. Cellene inneholder korte setninger, ikke bare haker; der en hake er nok, brukes én egen inline-SVG (18 px) og en tynn strek for «nei». På mobil kollapser tabellen til stablede rader per kriterium med de tre svarene under hverandre.

### Timeline-flate (signatur)
Full-bredde seksjon i Signal dyp. All tekst Paper. Syv steg langs en 1 px linje i Paper ved 40 %; punktene er 10 px sirkler i Paper. Desktop: horisontal, stegene fordeles jevnt, linjen tegner seg inn fra venstre når seksjonen kommer i view (800 ms). Mobil: vertikal linje i venstre marg. Ingen andre komponenter fra det mørke systemet (ingen Veil-kort) inne i flaten; kun tekst og linje.

### Annonsekort og metrikk-etikett (signatur)
Kort: 4:5, 16 px radius, 1 px hårlinje, tag «Static»/«UGC» øverst til venstre. Desktop-bredde 200 px i koreografien, 128 px i statisk vifte. Etikett: pille (`rounded-full`) i Paper med Ink-tekst, 13 px fet, 32 px høy, `shadow-proof`; henger utenfor kortets hjørne og roterer ikke med kortet. Kun tall fra proof-bildene. Referanse: @-navnene i Pallet Ross-videoen.

### Proof-ramme (signatur)
Skjermbildet ligger i en 16 px ramme med 1 px hårlinje og en 36 px «tittelrad» i Ink hevet med tre 8 px sirkler i hårlinje-farge og en tekst i Label (f.eks. «Meta Ads Manager · siste 30 dager» uten punktum-separator; bruk mellomrom eller «,»). Hover: `rotateX(-3deg) rotateY(4deg)` med `perspective(1200px)`, 400 ms, ease-out, pluss Proof-løft-skygge. Bildet lastes med `next/image`, eksplisitt bredde/høyde, `sizes` satt, lazy.

## Do's and Don'ts

### Do:
- **Do** sett overskrifter i Schibsted Grotesk 700 med -0.02 til -0.03em sporing; det er der personligheten sitter.
- **Do** bruk 112 px luft mellom seksjoner på desktop og la seksjoner slutte med tomrom.
- **Do** bruk tall som typografi: Metric-vekt 800, tabellsifre, enhet ved siden av i mindre grad.
- **Do** legg metric-chips oppå proof-skjermbildene, forankret til hjørner.
- **Do** bruk kun `cubic-bezier(0.22, 1, 0.36, 1)` (reveal) og `cubic-bezier(0.4, 0, 0.2, 1)` (state) som easing.
- **Do** orkestrer bevegelse på tre steder: kort-koreografien (Hero → Problem → Løsning, scroll-styrt, med statisk fallback under 1024 px og ved redusert bevegelse), Resultater count-up/tilt, og Timeline-linjen som tegner seg én gang.
- **Do** respekter `prefers-reduced-motion`: sluttilstand direkte, ingen tilt, ingen count-up.
- **Do** hold kontrast ≥ 4,5:1 for all tekst, også dempet tekst på Veil.

### Don't:
- **Don't** bruk Inter, Arial, Geist eller system-ui som synlig font.
- **Don't** bruk gradienter som dekor. Ingen lilla, ingen indigo, ingen radial «glow».
- **Don't** legg kort inni kort, eller Veil på Veil.
- **Don't** bruk stockfoto eller AI-genererte «team»-bilder. Mangler bildet, står det tekst.
- **Don't** bygg et rutenett av like ikon-fliser. Løsning-seksjonen er tre ulike bredder uten ikoner.
- **Don't** bruk bounce, spring eller overshoot i noen animasjon.
- **Don't** legg en sporet versal-etikett over overskrifter, eller en «→» på slutten av lenketekst.
- **Don't** fade-og-slide-inn hver eneste seksjon ved scroll.
- **Don't** bruk mono-font på små etiketter eller tall.
- **Don't** legg til en blå flate nummer to. Timeline eier den.
