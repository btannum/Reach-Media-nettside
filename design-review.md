# Designgjennomgang, reachmedia.no (2026-09-25)

Vurdert mot DESIGN.md og PRODUCT.md, ikke egen smak. Skjermbilder: `.impeccable/review/design-review/` (desktop 1440×900, mobil 390×844, per seksjon) og `.impeccable/review/dr-*.png` (tilede ark). Kort-koreografien i `AdStage.tsx` er holdt utenfor.

Helhetsinntrykk: Siden er tydelig autorisert for dette produktet. Ekte annonser, ekte skjermbilder, én skrift, én blå flate og hårlinje-rytmen gjør at den ikke kan forveksles med en SaaS-mal. Hero og koreografi er det sterkeste på siden. Svakhetene er i midten: for lite luft rundt hero-knappene på vanlige skjermhøyder, for mange like små etiketter i galleriet, chips som dekker beviset de skal peke på, og åtte seksjoner på rad uten en handling.

## Topp 10

1. **Hero-knappene klemmes mot bunnen på 1440×900.** Knappene ligger 22 px fra viewport-kanten, og på 1366×768 (vanligste laptop) vil viften og knappene overlappe. Hvorfor: første inntrykk, og den eneste primær-CTA-en over folden. Forslag: erstatt `lg:h-[42vh]` på vifte-sonen med `lg:h-[min(42vh,380px)]`, sett `lg:pb-16` på seksjonen, og senk `fan.y` i AdStage tilsvarende (fra 66 til ~62 vh). Test på 1366×768 og 1536×864. Fil: `web/src/components/sections/Hero.tsx`, `AdStage.tsx` (kun y-verdien).

2. **Ingen handling mellom seksjon 4 og 12.** Fra Audit-steg (CTA) til skjemaet er det åtte seksjoner uten en knapp: galleri, UGC, Resultater, Caser, tabell, Timeline, logoer, Om oss, FAQ. Hvorfor: en som overbevises av Resultater eller tabellen må scrolle forbi fem seksjoner til for å handle. Forslag: én kompakt CTA-rad rett etter den blå Timeline-flaten (tekst «Vil du se hva vi ville gjort i din konto?» + `Button` «Få gratis audit»), 64 px padding, hårlinje over. Ikke inne i den blå flaten (Én-flate-regelen). Fil: ny `CtaRad.tsx`, `page.tsx`.

3. **Chips dekker beviset i Resultater.** Google-rammen er 5 kolonner bred og tre chips dekker ~40 % av skjermbildet; «1 073 kjøp» henger 50 px utenfor containeren til venstre. Hvorfor: seksjonen heter «Tall fra kontoene», men tallene i skjermbildet kan ikke leses. Forslag: to chips på Google (dropp «konverteringsverdi», legg tallet i bildeteksten), plasser chips på ytterkantene med `-right-3`/`-bottom-3` også på desktop (fjern `lg:-left-5`), og gi Google-rammen 6 kolonner (`lg:col-span-6`) med Meta på 6 forskjøvet. Fil: `web/src/components/sections/Resultater.tsx`.

4. **Chips har skygge i hvile.** `shadow-proof` ligger fast på `MetricChip`; DESIGN.md sier flat i hvile, skygge kun som respons. Forslag: fjern `shadow-proof` fra chip-klassen, behold 1 px hårlinje + `bg-ink-elevated`. Fil: `Resultater.tsx` linje ~115.

5. **23 identiske «Static»-tagger i seksjonen «Statiske annonser vi lager».** Taggen sier det overskriften allerede sier, 23 ganger, og dekker øvre venstre hjørne av hver annonse. Forslag: ny prop `showKind` på `AdCard` (default true), sett `showKind={false}` i `AdsGallery`. Behold taggen i koreografien, Caser og UGC der blandingen betyr noe. Fil: `web/src/components/ads/AdCard.tsx`, `AdsGallery.tsx`.

6. **To navn på samme handling.** Caser-fliser sier «Les casen», UGC-seksjonen sier «Se KLA-casen», nav-knappen sier «Gratis audit», alle andre knapper «Få gratis audit». Hvorfor: DESIGN.md: en handling beholder navnet gjennom hele flyten. Forslag: «Les casen» overalt (UGC: «Les KLA-casen»), og nav-knappen «Få gratis audit» (den er 40 px høy, det er plass). Filer: `Ugc.tsx`, `lib/site.ts` (`ctaLabel`).

7. **Kundelogoene er for små og drukner i luft.** Raden er 32 px høy (`h-8`) midt i 224 px seksjonsluft; KLA og CarPlay leses som flekker. Forslag: `h-10 lg:h-12`, `max-w-[1100px]`, `opacity-80` i hvile, og reduser til `py-16 lg:py-20` for denne seksjonen (den er en mellomrad, ikke en full seksjon). Fil: `Kundelogoer.tsx`.

8. **Audit-stegene på desktop er fem smale spalter med 25-tegns linjer.** Brødteksten (15 px, dempet) brekker i 5–6 korte linjer per steg og blir hakkete. Forslag: `lg:grid-cols-5` → `lg:grid-cols-[repeat(5,minmax(0,1fr))]` beholdes, men sett brødtekst til `text-body` med `lg:pr-10`, eller gå til 3 + 2 kolonner (`lg:grid-cols-3`, siste to steg i rad to). Fil: `AuditSteg.tsx`.

9. **`<dd>` før `<dt>` i alle metrikk-lister.** Caser/prosjekt-sidene rendrer verdi (`dd`) før etikett (`dt`); ugyldig HTML og skjermlesere leser «kr i omsetning fra annonser» etter tallet uten kobling. Forslag: `dt` først med `sr-only`-fri etikett under via CSS `order`, eller bytt til `<p>` + `<span>` (det er ikke en definisjonsliste). Filer: `app/prosjekter/page.tsx`, `app/prosjekter/[slug]/page.tsx`.

10. **«Samme» som stort nøkkeltall.** På Spekebua står «+2 mill.» og «Samme» i Metric-vekt ved siden av hverandre; et ord i 36 px leser som en feil. Forslag: ett nøkkeltall («+2 mill. kr i omsetning fra annonser») og «samme lønnsomhet som før» i undertittelen. Fil: `lib/projects.ts`.

## Per seksjon

### Nav og footer
- [middels] Mobil: «Meny»-knappen og CTA er 40 px høye (`h-10`); DESIGN.md/WCAG sier 44. Sett `size="sm"` til `h-11` eller behold `h-10` med `py` som gir 44 px treffflate.
- [middels] Ingen aktiv tilstand på undersider: på `/prosjekter` ser «Prosjekter» ut som de andre lenkene. Bruk `usePathname` og `text-paper` + understrek på aktiv.
- [lav] Footer: org.nr mangler (kjent TODO). Personvern-lenken bør også stå i skjema-samtykket, det gjør den.

### 1. Hero
- [høy] Se Topp 10 nr. 1.
- [lav] Ingressen ligger 32 px over viftens topp-etiketter; «10,4 % konv.rate» berører nesten teksten. Løses av samme y-justering.
- [lav] Mobil: statisk vifte 240 px høy med 104 px-kort gir små annonser; `w-[120px]` og `h-[280px]` gir mer.

### 2. Problem
- [lav] Setningen under H2 er riktig plassert. Listen med fire lekkasjer har god rytme. Ingenting å røre.
- [lav] Bunnen av seksjonen er tom på desktop (min-h-svh + justify-center); nødvendig for koreografien, men på mobil er `min-h-svh` unødvendig og gir luft under listen. Sett `min-h-svh` kun på `lg:`.

### 3. Løsning
- [middels] Samme `min-h-svh` på mobil som over.
- [lav] Tre pilarer i én kolonne på desktop (5 kolonner) er bra; men H3 «Daglig styring. Av oss, ikke en junior.» i 22 px konkurrerer med H2. Vurder `text-title` i vekt 500 (som nå) men `text-[1.25rem]`.

### 4. Audit-steg
- [middels] Se Topp 10 nr. 8.
- [lav] Nummeret (22 px dempet) og tittelen (22 px lys) har samme størrelse; nummeret kunne vært `text-small` for å underordne seg.
- [lav] Leveringstid mangler (kjent TODO). Uten den mangler steg-listen et løfte om «når».

### 5. Statiske annonser
- [middels] Se Topp 10 nr. 5.
- [lav] Rad 2 er forskjøvet 140 px, men begge rader klippes i høyre kant uten synlig hint om at de kan scrolles. Legg til en tynn gradient-fri hint: la siste kort stikke 40 px ut, eller vis en «Dra for å se flere»-tekst i `text-label` under raden på desktop.
- [lav] Alle bilder lastes med `priority` for index < 3 i hver rad via `AdCard` (index-basert); i galleriet gir det seks prioriterte bilder under folden. Send `priority={false}` fra galleriet.

### 5b. UGC
- [middels] Se Topp 10 nr. 6 (lenketekst).
- [lav] Tre videokort i 3-kolonners grid uten scroll på desktop er riktig. Avspillingsknappen (48 px) er OK. Vurder å vise varighet i `text-label` nederst på posteren så det er tydelig at det er video (0:47, 1:02, 0:47).
- [lav] Seksjonen har samme H2-størrelse som galleriet rett over; to headlines på 112 px avstand. Vurder å gi UGC `pt-0 lg:pt-8` så de leses som ett kapittel med to deler.

### 6. Resultater
- [høy] Se Topp 10 nr. 3 og 4.
- [middels] Bildetekstene «Nettbutikk, Meta, periode kommer» er plassholdere (kjent TODO). Skriv «Meta Ads Manager, siste 30 dager» så snart perioden er bekreftet.
- [lav] Hover-tilt fungerer, men shadow legges på inner-div mens tilt ligger på ytre; skyggen roterer ikke med rammen. Flytt `hover:shadow-proof` til `motion.div`.

### 6b. Caser
- [middels] Se Topp 10 nr. 9 og 10.
- [lav] Gorilla-flisen: flaggraden + setningen «Norge nå. Sverige, Danmark og Storbritannia neste.» gjentar overskriften. Dropp setningen, la flaggene og pilen tale.
- [lav] Bildefeltet er 260 px høyt og viftekortene klippes i bunn; det ser bevisst ut, men på mobil (390) blir det tre 128 px-kort klemt i 342 px bredde. Sett `w-[112px]` under `sm`.

### 7. Sammenligning
- [lav] Reach Media-kolonnen som tonet søyle fungerer og bryter ikke Én-flate-regelen. Ingen haker brukes; `Check`/`Dash` er død kode, fjern eller bruk i «Oppfølging»-raden.
- [lav] Mobil: «Reach Media»-etiketten gjentas sju ganger i `text-paper/75` på blått; kunne vært sterkere (`text-paper`) siden det er kolonnen vi vil de skal lese.

### 8. Timeline
- [lav] «Launch» er eneste engelske ord på siden utenom bransjetermer. «Lansering».
- [lav] Sju kolonner på 1440 gir titler som brekker («Daglig optimalisering», «Månedlig møte»); `text-title` i `text-[1.25rem]` her holder alle på én linje unntatt én.
- [lav] Linjen tegner seg fra venstre, bra. Prikkene (11 px) og tallene (13 px) er små, men det er riktig i en flate som skal være stille.

### 9. Kundelogoer
- [middels] Se Topp 10 nr. 7.

### 10. Om oss
- [lav] Fungerer. Teamlisten uten portretter holder seg til DESIGN.md. Én ting: «Sahil» uten etternavn skiller seg fra de to andre; bekreft om det er med vilje.

### 11. FAQ
- [lav] Venstre kolonne (4 av 12) har bare H2 og 700 px tomrom under på desktop. Det er ANTI-luft og innenfor DESIGN.md, men vurder å legge kontaktlinjen «Fant du ikke svaret? post@reachmedia.no» der i `text-small`.
- [lav] `<details name="faq">` gir ett åpent om gangen; Safari < 17.2 ignorerer `name`, som bare betyr flere åpne. Greit.

### 12. Skjema
- [lav] «Velg» som første option i to selects ser ut som en verdi; bruk «Velg plattform» / «Velg beløp» så feltet forklarer seg selv når det er tomt.
- [lav] Etiketter i 13 px dempet over 52 px-felt er lesbare (kontrast ≈ 7:1). Suksesstilstanden er et Veil-kort med tekst; fint.
- [lav] Mobil: skjemaet starter 112 px under FAQ; med sentrert H2 på 3 linjer blir første felt synlig først etter én scroll. Akseptabelt.

### Undersider
- [middels] `/prosjekter/[slug]`: metalinjen «KLA Sport. Sportsutstyr, Meta» over H1 er en etikett over overskriften (craft-floor: eyebrow). Flytt den under H1 som `text-small`.
- [lav] `/prosjekter`: to fulle caser + Gorilla + tre «Case kommer»-rader. De tre tomme radene svekker siden; vis dem som logoer i én rad under listen («Jobber også med: Beeki, CarPlay Norge, Novito») til tekst finnes.
- [lav] `/personvern`: ryddig. Mangler org.nr (kjent TODO).

## Fungerer godt, ikke rør
- Innlastingen (ord for ord + kort som stiger og vifter ut) og scroll-koreografien er sidens signatur og ser ut som håndverk.
- Én skrift i hele spennet. Schibsted Grotesk 700 med negativ sporing bærer alle overskriftene uten pynt.
- Den blå Timeline-flaten som eneste mettede felt. Ikke legg til en blå flate nr. 2, heller ikke for en CTA-rad.
- Problem-seksjonens liste med hårlinjer, og Om oss-teamlisten: tekst, ikke kort.
- Sammenligningstabellen som ekte `<table>` med tonet Reach Media-kolonne.
- Caser-flisene med tekst over bilder er en egen løsning, ikke en kopi av referansen.
- Skjemaet: synlige etiketter, feil per felt, honeypot, låst knappbredde under sending.
