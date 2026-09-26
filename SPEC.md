# SPEC — reachmedia.no

Status: utkast til godkjenning (fase 1). Bygges i `web/` (Next.js 16 App Router, TS, Tailwind v4, Framer Motion). Produktfakta i PRODUCT.md, visuelle regler i DESIGN.md. Denne filen eier sidekart, seksjoner, copy-utkast, API-kontrakt og asset-liste.

Merking: **[TODO: …]** = mangler fakta eller fil fra Reach Media; bygges med plassholder. **[VERIFISER]** = påstand som må bekreftes før launch.

---

## 1. Sidekart

| Rute | Innhold | Status ved launch |
|---|---|---|
| `/` | Forside, 12 seksjoner i låst rekkefølge | Full |
| `/prosjekter` | Seks kunder, én kort tekst hver, CTA | Tynn |
| `/personvern` | Personvernerklæring (kreves for skjemaet) | Enkel tekst |
| `POST /api/audit` | Route Handler: validering, honeypot, rate limit, Resend | Fase 4 |

Nav: **Reach Media** (wordmark) · Slik funker det (`/#audit`) · Resultater (`/#resultater`) · Om oss (`/#om-oss`) · Prosjekter (`/prosjekter`) · [Gratis audit] (`/#gratis-audit`).

Footer: wordmark, post@reachmedia.no, Instagram, Facebook, lenke til /personvern, **[TODO: org.nr og adresse]**. Ingen «Bygget av»-kreditering.

Alle «Gratis audit»-CTA-er på forsiden ankrer til skjemaet i seksjon 12 (`#gratis-audit`). Ingen egen bookingside i v1.

---

## 2. Forside, seksjon for seksjon

### Endringer hentet fra Grok-sporet 2026-09-25 kveld (`Reach Media Nettside Grok/`)
Bendik jobbet i en kopi («Grok-spor»); endringene er flettet inn her. Copy-retning: **«Skaler med overskudd. 100 % resultatbasert.»** som H1, «Du skalerer ikke budsjettet. Du skalerer annonsene.» i Problem (fire punkter om annonsevolum/iterasjon), «UGC som treffer.», «Butikker vi skalerer.» med tre case-linjer og uendelig logo-karusell, Resultater-H2 «Spekebua. Ett år. Samme lønnsomhet.», tabellrad «Annonser: ferske annonser hver uke», FAQ utvidet til ti spørsmål (priser, prosent av annonseomsetning, ikke hele butikken, ukentlig nye annonser, Shopify, bindingstid, hvem sitter i kontoen), Betalingsmodell «provisjon, fastpris eller hybrid», Marquee uten tall-chips, «Konsepter og annonser» som steg 2. Gorilla Games: status «Case kommer snart», cover-bilde `public/media/cases/gorilla/google-ads-cover.png` i Caser-kortet og på case-siden, `MarketExpand`-komponent (flagg-rad) i `Flags.tsx`. `/prosjekter` viser tre annonser eller cover per case. Case-fakta og åpne spørsmål: `docs/CASE-CONTEXT.md` (inkl. Beeki «doblet på én måned», ikke bygget ennå).

### Ombygging 2026-09-25: hele Pallet Ross-strukturen, lyst tema
Bruker ba om at hele videoen (13 seksjoner, animasjoner og lyst utseende) skal brukes fra start til slutt. Ny rekkefølge på forsiden, med mapping til innhold:

| # | Video | Reach Media | Komponent |
|---|---|---|---|
| 1 | Hero, kort vifter ut | Hero | `Hero.tsx` + `AdStage.tsx` |
| 2 | Showcase + vifte høyre | Problem | `Problem.tsx` |
| 2b | – | Spekebua-casen «Resultatene snakker for seg selv» flyttet hit 2026-09-26 (fra etter Audit-steg) | `Resultater.tsx` |
| 3 | Stort bilde/video | UGC: tekst + de tre KLA-videoene (bruker ville ha den slik) | `Ugc.tsx` |
| 4 | Trusted by the best | Kundelogoer m/piler | `Kundelogoer.tsx` |
| 5 | Whether you’re … + bunke → trapp | Fjernet 2026-09-25 (bruker: «bare å fjerne») | – |
| 6 | Our vision, faner høyre | Sammenligning m/faner | `Sammenligning.tsx` |
| 7 | Among us, to rader | Statiske annonser | `AdsGallery.tsx` |
| 8 | Every piece, 2×2 kort | Caser + samarbeid | `Caser.tsx` |
| 9 | Marketplace, fliser | Audit-steg | `AuditSteg.tsx` |
| 10 | Grid m/voksende kort | Resultater | `Resultater.tsx` |
| 11 | Membership, 3 kort | Betalingsmodell (uten satser) | `Betalingsmodell.tsx` |
| 12 | Gult marquee + 2 kort | Blått marquee (samarbeidsstegene) + Om oss + skjema | `Marquee.tsx`, `ClosingCards.tsx` |
| 13 | Footer | Footer | `Footer.tsx` |

FAQ beholdes som kompakt seksjon mellom 12 og footer. Den gamle seksjonsbeskrivelsen under gjelder for innhold/copy; layout og bevegelse følger videoen.


Rekkefølgen er låst av brief. Copy under er utkast i sidens stemme (direkte, kompetent, ingen byrå-fluff) og kan justeres ved godkjenning. H2 er faktisk overskrift; «Innhold» er bullets som blir brødtekst, lister eller celler.

### Kort-koreografi over seksjon 1–3 (endret 2026-09-25 etter referanse fra bruker)
Referanse: Dribbble «Pallet Ross – Website Animation» (Awsmd), sekund 0–8. Seks annonsekort (`deckAds` i `web/src/lib/ads.ts`) lever i et sticky lag over Hero → Problem (`web/src/components/ads/AdStage.tsx`):
0. **Innlasting:** overskriften kommer ord for ord; ett kort stiger nedenfra, retter seg opp, og bunken vifter ut. Ingress, knapper og etiketter kommer etterpå (totalt ca. 2,3 s).
1. **Hero:** vifte under overskriften med metrikk-etiketter («15,5× ROAS» på Spekebua, «1 073 kjøp» på KLA, «10,4 % konv.rate» på Beeki; kun ekte tall fra proof).
2. **Ved scroll:** viften samler seg til en liten bunke midt i bildet og krymper, mens hero-teksten scroller ut.
3. **Problem:** bunken glir til høyre kolonne når seksjonen kommer inn, vifter ut diagonalt nedover mot høyre, og blir liggende. Kortene følger Problem ut av bildet. Løsning har ingen kort (endret 2026-09-25).
Under 1024 px og ved redusert bevegelse: statisk vifte i Hero.

### 1. Hero  `#top`
**Mode:** Persuade. Sentrert tekst over annonse-viften. Ingen Ads Manager-bilder.

- **H1:** Betalt annonsering for Shopify-butikker over 50 000 kr i måneden.
- **Ingress:** Vi planlegger og styrer annonsene på Meta og Google hver dag, og tar hovedsakelig betalt som en andel av omsetningen de gir. Tilpasset marginene dine.
- **CTA primær:** Få gratis audit → `#gratis-audit`
- **CTA sekundær:** Slik funker auditen → `#audit`
- **Komposisjon:** H1 sentrert (maks 22ch), ingress, vifte av annonser (42 vh høy sone), CTA-er nederst. Én orkestrert innlasting: H1, ingress, kort, CTA-er (totalt < 900 ms). Faktalinjen er fjernet.

### 2. Problem  `#problem`
**Tone:** Conversion Design; peker på lekkasjen, ikke på kunden.

- **H2:** Annonsene får klikk. Kassa får ikke salget.
- **Setning under H2:** Hver uke det står slik, betaler du for klikk som ikke blir kjøp.
- **Innhold (fire lekkasjer som liste med hårlinjer, venstre kolonne har H2 + én setning):**
  1. **Annonsene brenner ut.** Samme fire annonser i seks uker. CPA stiger, og ingen lager nye fort nok.
  2. **Ingen ser på kontoen hver dag.** Budsjett ligger på annonsesett som sluttet å levere for ti dager siden.
  3. **ROAS i Ads Manager er ikke omsetning i Shopify.** Ser du ikke begge, optimaliserer du på feil tall.
  4. **Byrået tjener det samme uansett.** Fast fee gir ingen grunn til å jage neste vinner.
- **Ingen CTA her.**

### 3. Løsning  `#losning`
- **H2:** Vi lukker gapet mellom annonse og kasse.
- **Innhold (tre fliser i bredde 5 / 4 / 3 kolonner, ingen ikoner, ingen bakgrunn, skilt med hårlinjer):**
  - **Nye annonser hver måned.** Nye statics og UGC hver måned. Vi planlegger hver annonse og tester den. Designerne vi jobber med produserer. Vinnere skaleres, tapere byttes. **[TODO: antall per måned]**
  - **Daglig styring. Av oss, ikke en junior.** De samme folkene du snakket med først justerer budsjett, bud og annonsesett hver virkedag. Du får en Loom-video hver uke som viser hva som ble gjort og hvorfor.
  - **Betalt etter omsetning.** Hovedmodellen er provisjon av omsetningen annonsene gir. Går det dårlig, koster vi lite. Går det bra, har du råd til oss. Har du lave marginer, eller vil ha fastpris, finner vi en modell som passer deg.
- **Ingen CTA her.**

### 4. Audit-steg  `#audit`
Innholdet er en sekvens; nummer i margen er legitimt.

- **H2:** Auditen: fire steg, ingen forpliktelse. (Rapport-steget fjernet 2026-09-25; innholdet ligger i Loom-steget.)
- **Ingress:** Du gir oss lesetilgang. Vi gjør resten. Rapporten og videoen er dine uansett om vi jobber sammen etterpå.
- **Steg:**
  1. **Lesetilgang.** Du legger oss til som analytiker i Meta Business Manager, Google Ads, eller begge. Vi kan ikke endre noe.
  2. **Ekspert-audit.** Vi går gjennom struktur, annonser, målgrupper, budsjettfordeling og sporing mot Shopify.
  3. **Rapport.** Skriftlig, prioritert: hva som lekker mest, hva det koster deg, hva vi ville gjort først.
  4. **Loom.** En videogjennomgang av rapporten, inne i din konto, så du ser hva vi peker på.
  5. **Gjennomgang.** Et møte der vi svarer på spørsmål og sier ærlig om vi tror vi kan flytte tallene dine.
- **Tidslinje:** **[TODO: leveringstid, f.eks. «innen 5 virkedager»]**. Skrives ikke inn før bekreftet.
- **CTA:** Få gratis audit → `#gratis-audit`
- **Layout:** desktop horisontal stepper med 1 px linje, mobil vertikal.

### 5. Ads-gallery  `#annonser`
- **H2:** Annonsene vi lager.
- **Undertekst:** Statics og UGC fra kontoer som kjører nå. Ingen konseptskisser.
- **Innhold:** kant-til-kant rader med fliser, alle 9:16 (bruker 2026-09-25), tag «Static» eller «UGC» øverst til venstre. Horisontal scroll på mobil, to rader på desktop. UGC vises som video-poster med avspilling ved klikk (ikke autoplay med lyd).
- **Assets:** 21 statics + 3 UGC levert, se §6.
- **Ingen CTA.**

### 6. Resultater  `#resultater`
- **H2:** Tall fra kontoene, ikke fra en pitch.
- **Ingress:** Skjermbildene er tatt rett fra Ads Manager og Google Ads. Vi har markert tallene som betyr noe.
- **Proof 1 (Meta):** `public/proof/meta-ads-manager.png`. Tittelrad: «Meta Ads Manager». Chips: **15.51** ROAS · **1 073** kjøp · **24.15** ROAS på beste annonsesett. **[VERIFISER: periode og at «peak» = beste annonsesett]**
- **Proof 2 (Google):** `public/proof/google-ads-dashboard.jpeg`. Tittelrad: «Google Ads». Chips: **10,41 %** konverteringsrate · **20,33 kr** per konvertering · **1,44 M** konverteringsverdi. Kostnad 23,1 k nevnes i bildetekst, ikke chip (fire chips er for mange). **[VERIFISER: periode]**
- **Bildetekst under hver:** «Nettbutikk, [kategori], [periode]» **[TODO: kategori og periode; ingen kundenavn uten samtykke]**
- **Interaksjon:** count-up fra 0 ved første synlighet (1,4 s), hover-tilt ±4° + Proof-løft. Reduced motion: statisk.
- **Layout:** 7 / 5 kolonner, høyre ramme forskjøvet 48 px ned.
- **Ikke:** «50+ fornøyde kunder», «doblet omsetning» eller andre tall fra gammel side uten bekreftelse.

### 7. Sammenligning  `#sammenligning`
- **H2:** Hvorfor ikke et stort byrå, eller en frilanser?
- **Tabell (rader × tre kolonner: Reach Media / Vanlig byrå / Upwork og Fiverr):**

| Kriterium | Reach Media | Vanlig byrå | Upwork / Fiverr |
|---|---|---|---|
| Betaling | Hovedsakelig provisjon av omsetning, tilpasset marginene dine | Fast månedspris, ofte + prosent av spend | Timepris eller fastpris per oppgave |
| Hvem lager annonsene | Vi planlegger og håndterer. Designerne våre produserer. | Ofte en ekstern produsent eller du selv | Du må skaffe annonsene selv |
| Hvem du snakker med | De som sitter i kontoen din | En account manager. Ofte en junior i kontoen etter salgsmøtet. | Frilanseren, til de bytter prosjekt |
| Antall annonser per måned | Høy, løpende **[TODO: tall]** | Få varianter per måned | Én og én bestilling |
| Oppfølging | Daglig i kontoen | Ukentlig eller ved rapport | Når du sender melding |
| Rapportering | Ukentlig Loom, månedlig møte | Månedlig PDF | Uformelt |
| Språk og marked | Norsk, norske kunder | Norsk | Som regel engelsk. Kjenner ikke det norske markedet. |

- Generaliseringene om «vanlig byrå» og frilansere må holde seg til «ofte»/«som regel»; ingen navngitte konkurrenter.
- **Ingen CTA** (Timeline følger).

### 8. Timeline, samarbeid  `#samarbeid`
**Den ene blå flaten.** Full bredde i Signal dyp, hvit tekst.

- **H2:** Slik ser et samarbeid ut.
- **Steg (sju, langs én linje):**
  1. **Research.** Konto, produkt, konkurrenter, kommentarfelt.
  2. **Annonser.** Første runde statics og UGC.
  3. **Launch.** Ny struktur, sporing sjekket mot Shopify.
  4. **Daglig optimalisering.** Budsjett og bud hver virkedag.
  5. **Skalere vinnere.** Nye varianter av det som virker.
  6. **Ukentlig Loom.** Hva som ble gjort, hva som kommer.
  7. **Månedlig møte.** Tall, plan, neste måned.
- **Linjen tegner seg inn** ved første synlighet (800 ms). Ingen kort inne i flaten.

### 9. Kundelogoer  `#kunder`
- **Overskrift (Title-størrelse, ikke H2):** Butikker vi jobber med
- **Logoer:** Gorilla Games, KLA, Spekebua, Beeki, CarPlay, Novito. Gråtone i hvile, farge ved hover. Én rad på desktop, to på mobil, sentrert.
- **Assets:** **[TODO: SVG/PNG i `Medier /Logoer RM og kunder/` → `web/public/media/logos/`]**. Plassholder: navn i tekst med hårlinje-ramme. Ingen «+N kunder».

### 10. Om oss  `#om-oss`
- **H2:** Du blir ikke sendt videre til en junior.
- **Tekst:** I et stort byrå møter du en partner i salgsmøtet og en junior etterpå. Hos oss er det de samme folkene hele veien. Vi planlegger og håndterer annonsene selv. Google-eksperten sitter hos oss. Produksjonen gjør vi med grafiske designere vi jobber fast med. Norsk byrå, kun B2C-nettbutikker, kun betalt annonsering.
- **Team (tekst, tre personer, ingen portretter før filer finnes):**
  - **Bendik Tannum**, co-founder, kreativ strateg. Research, briefer, strategi. Den du snakker med først.
  - **Kevin Johansen Zeba**, co-founder, media buyer. Sitter i Meta-kontoen din hver dag og lager Loom-videoen hver uke.
  - **Sahil**, senior developer og Google-ekspert. Google Ads, sporing og backend.
  - Jimmy Norberg nevnes ikke (bruker 2026-09-25).
- **Luftig layout (ANTI):** H2 på venstre 6 kolonner, team-liste på høyre 5.

### 11. FAQ  `#faq`
- **H2:** Spørsmål vi får ofte.
- Accordion, ett åpent om gangen, `<details>`-basert for tilgjengelighet.

1. **Hva koster det?** Hovedsakelig en provisjon av omsetningen annonsene gir. Satsen tilpasses marginene dine og avtales etter auditen. Noen foretrekker fastpris, andre provisjon. Vi finner en modell som passer situasjonen din.
2. **Hva om det ikke gir resultater?** Med provisjon tjener vi lite. Det er hele poenget med modellen.
3. **Hva trenger dere tilgang til?** Lesetilgang til Meta Business Manager, Google Ads og Shopify-analyse. Under auditen kan vi ikke endre noe.
4. **Lager dere annonsene selv?** Vi planlegger og håndterer alle annonsene. Produksjonen gjør vi sammen med flere grafiske designere vi jobber fast med. Du godkjenner før noe går live.
5. **Hvilke plattformer?** Meta (Facebook og Instagram) og Google Ads. Ikke TikTok i dag. **[VERIFISER]**
6. **Passer butikken min?** Best fra rundt 50 000 kr i månedlig adspend. Under det er det som regel bedre å bruke pengene på annonser og drift selv.
7. **Bindingstid?** Ingen. Én måneds oppsigelse. **[VERIFISER før publisering]**

### 12. Final CTA + audit-skjema  `#gratis-audit`
- **H2 (sentrert, eneste sentrerte seksjon):** Send oss lesetilgang. Få rapporten.
- **Ingress:** Fyll ut, så tar vi kontakt innen én virkedag med instruks for tilgang. **[VERIFISER: én virkedag]**
- **Skjema (én kolonne, maks 520 px):**
  - Navn (tekst, påkrevd)
  - E-post (email, påkrevd)
  - Nettbutikk (url, påkrevd, placeholder «butikk.no»)
  - Plattform (select: Meta / Google / Begge, påkrevd)
  - Månedlig adspend (select: Under 50 000 kr / 50 000–100 000 kr / 100 000–250 000 kr / Over 250 000 kr, påkrevd)
  - Melding (textarea, valgfri)
  - Honeypot-felt `company` (skjult, må være tomt)
  - Samtykketekst under knapp: «Vi bruker opplysningene kun til å svare deg. Se personvern.» (lenke)
  - Knapp: **Få gratis audit** → «Sender …» → suksesstilstand erstatter skjemaet: «Takk. Vi svarer fra post@reachmedia.no innen én virkedag.»
- **Feil:** per felt, i Small, under feltet. Serverfeil: «Skjemaet gikk ikke gjennom. Send en e-post til post@reachmedia.no i stedet.»

---

## 3. `/prosjekter` (tynn ved launch)

- **H1:** Prosjekter
- Seks rader (hårlinjer), én per kunde: navn, kategori, én setning om hva vi gjør. **[TODO: tekst per kunde]**. Ingen tall uten bekreftelse.
- CTA nederst → `/#gratis-audit`.

## 4. `/personvern`

Enkel tekstside: hvilke data skjemaet samler (navn, e-post, URL, plattform, adspend, melding), formål (svare på henvendelsen), lagring (e-post hos Reach Media, ingen database i v1), behandlingsansvarlig **[TODO: juridisk navn, org.nr]**, rett til innsyn/sletting via post@reachmedia.no. Ingen cookies utover nødvendige i v1 (ingen analytics før det er bestemt; **[TODO: Plausible/GA4?]**).

---

## 5. Audit-API, kontrakt (fase 4)

**Endepunkt:** `POST /api/audit` (Route Handler, `web/src/app/api/audit/route.ts`). Kun JSON.

**Request:**
```json
{
  "name": "string, 2–80 tegn",
  "email": "string, gyldig e-post",
  "storeUrl": "string, normaliseres til https://, må ha gyldig host",
  "platform": "meta | google | both",
  "monthlySpend": "under50k | 50k-100k | 100k-250k | over250k",
  "message": "string, valgfri, maks 2000 tegn",
  "company": "honeypot, må være tom streng eller mangle",
  "startedAt": "number, epoch ms fra da skjemaet ble rendret"
}
```

**Validering (zod):** alle felt som over. `startedAt` eldre enn 3 s (bot-sjekk: menneske bruker mer). Avvis hvis `company` har innhold, men svar 200 (ikke avslør honeypot).

**Rate limit:** in-memory Map per IP, maks 5 forsøk per 10 min. Godt nok på én Vercel-instans; byttes til Upstash om det blir misbruk.

**E-post (Resend):**
- Til: `AUDIT_TO_EMAIL` (bendik@reachmedia.no)
- Fra: `AUDIT_FROM_EMAIL` (f.eks. `audit@reachmedia.no`; krever domeneverifisering i Resend, ellers `onboarding@resend.dev` i dev)
- Reply-To: innsenderens e-post
- Emne: `Audit-forespørsel: {storeUrl} ({monthlySpend})`
- Innhold: ren tekst med alle felt + IP + tidsstempel.

**Response:**
- `200 { "ok": true }`
- `400 { "ok": false, "errors": { "email": "Skriv en gyldig e-post" } }`
- `429 { "ok": false, "errors": { "form": "For mange forsøk. Prøv igjen om ti minutter." } }`
- `500 { "ok": false, "errors": { "form": "Skjemaet gikk ikke gjennom. Send e-post til post@reachmedia.no." } }`

**Env (`web/.env.example`):**
```
RESEND_API_KEY=
AUDIT_TO_EMAIL=bendik@reachmedia.no
AUDIT_FROM_EMAIL=onboarding@resend.dev
```

Skjemaet fungerer uten JS (native `<form method="post">` som fallback via Server Action er ikke valgt; Route Handler + progressiv forbedring: uten JS postes til samme rute og får et enkelt HTML-svar). Ingen dashboard, ingen database, ingen auth i v1.

---

## 6. Asset-liste

| Asset | Status | Sti | Brukes i |
|---|---|---|---|
| Meta-skjermbilde | Levert | `web/public/proof/meta-ads-manager.png` (optimaliser til WebP < 300 kB) | 6 |
| Google-skjermbilde | Levert | `web/public/proof/google-ads-dashboard.jpeg` | 6 |
| Reach Media-logo | Levert (`Medier /Logoer/Reach Media logo.webp`, 384×97) | `web/public/media/logo.png` + `logo-mark.png` (R-merket) | Nav, footer, OG-bilde |
| 6 kundelogoer | Levert, konvertert til monokrom hvit PNG med alfa (`scripts/media.sh logos`) | `web/public/media/logos/*.png` | 9, /prosjekter |
| 21 statics | Levert, alle til 9:16 540×960 WebP (`scripts/media.sh ads`; 4:5-kilder fylt ut med uskarp kant) | `web/public/media/ads/static-01..21.webp` | 1–3, 5 |
| 3 UGC (mp4 + poster) | Levert, H.264 720×1280 + WebP-poster (`scripts/media.sh video`). To av dem er versjoner av samme klipp. | `web/public/media/ads/ugc-01..03.mp4/.webp` | 5 |
| Teamportretter | **[TODO, valgfritt]** | `web/public/media/team/*.webp` | 10 |
| OG-bilde 1200×630 | Lages i fase 5 | `web/src/app/opengraph-image.tsx` | Meta |
| Favicon | Lages i fase 2 (RM-monogram i tekst) | `web/src/app/icon.svg` | Alle |

---

## 7. Åpne punkter før fase 3 kan bli komplett

1. Antall annonser per måned (brukes i seksjon 3, 7 og FAQ). Uten tall skrives «løpende».
2. ~~Teamnavn og roller~~ Avklart 2026-09-25: Bendik, Kevin, Sahil. Portretter mangler.
3. Leveringstid audit og svartid på skjema (seksjon 4 og 12).
4. Periode og kategori for de to proof-skjermbildene (seksjon 6).
5. ~~Bindingstid~~ Avklart: ingen bindingstid, 1 mnd oppsigelse (verifiser).
6. Analytics-verktøy (påvirker personvernside og cookie-behov).
7. ~~Juridisk navn og org.nr~~ Org.nr. 928 512 142 lagt inn i footer og personvern 2026-09-26. Juridisk navn mangler fortsatt.

Ingen av disse blokkerer fase 2 (shell) eller fase 3 (seksjoner med plassholdere).

---

## 8. Retningskontrakt (impeccable, for `web/src/app/page.tsx`)

**THESIS:** Siden er en rolig operatør som viser kontoen i et mørkt rom, ikke et byrå som pitcher. Den nekter SaaS-oppskriften «hero med gradient + tre ikon-kort + logo-rad + testimonial-karusell».

**OWN-WORLD:** Ink #0A0E17 med Veil-lag og hårlinjer; Schibsted Grotesk i hele spennet; Signal-blå kun på knapper og på én full-bredde flate (Timeline). Tall er tung typografi med tabellsifre. Flatt, uten skygger i hvile. Med alt innhold fjernet gjenkjennes siden på den ene blå flaten midt i mørket og på hårlinje-rytmen.

**STORY:** Besøkende forstår på tre sekunder: dette er for Shopify-butikker med reelt budsjett, de lager annonsene selv, og de tar betalt av omsetning. Deretter: hva som lekker hos meg (2), hvordan de tetter det (3), at auditen er gratis og trygg (4), at de faktisk produserer (5), at tallene er ekte (6), at de er bedre enn alternativene mine (7), hvordan det blir å jobbe med dem (8), hvem de er (9–10), og til slutt: send lesetilgang (12).

**FIRST VIEWPORT:** Nav 64 px. H1 sentrert (maks 22ch, 3 linjer på 1440) fra ~14 vh, ingress under, så en vifte av sju ekte annonsekort (9:16, 156 px brede) med tre metrikk-etiketter, og to knapper nederst. Ingen glow, ingen dekor. Signaturinteraksjon: kortene folder seg til en bunke som følger scrollen gjennom Problem og legger seg som en trapp i Løsning (Pallet Ross-referanse), pluss Timeline-linjen som tegner seg inn i den blå flaten.

**FORM:** Brief-pinnet retning (bruker), ikke rullet. Seed-nøkkel: ingen; concept-seed er hoppet over fordi verden, moodboard og seksjonsrekkefølge er låst i briefen.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
