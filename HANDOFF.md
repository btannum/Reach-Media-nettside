# Handoff: Reach Media nettside

**Sist oppdatert:** 2026-09-30
**Status:** Bendik er fornøyd med siden slik den er nå. Alt er pushet og live. Ingen lokale endringer venter.

Les denne filen først. Deretter `PRODUCT.md`, `DESIGN.md` og `SPEC.md` ved behov.
Den eldre `HANDOFF-2026-09-26.md` gjelder fortsatt for det den beskriver (Om oss, FAQ, Problem-punkter osv.), men denne filen er nyere der de overlapper.

---

## Oppsett og arbeidsflyt

| Ting | Verdi |
|---|---|
| Kode | `~/Prosjekter/Reach Media Nettside/web` (Next.js 16, React 19, Tailwind v4, Framer Motion) |
| Repo | https://github.com/btannum/Reach-Media-nettside (branch `main`) |
| Hosting | Vercel, Root Directory = `web`. Hver push til `main` deployer automatisk (1–2 min) |
| Domene | **reachmedia.no** er koblet til og live. Vercel-URL: reach-media-nettside.vercel.app |
| Analytics | Vercel Web Analytics (`<Analytics />` i `layout.tsx`). Må være slått på i Vercel-panelet |
| Lokal preview | `cd web && npm run dev -- -p 3002` → http://localhost:3002 (port 3000 er opptatt av noe annet) |
| Ikke rør | `~/Prosjekter/Reach Media Nettside Grok` (kjører på :3001) |

**Slik vil Bendik jobbe:**
1. Han sender skjermbilde + hva som skal endres (på norsk).
2. Gjør endringen lokalt, sjekk med skjermbilder (PC 1440×900 og mobil ~390–402 bredde), vis resultatet på localhost:3002.
3. **Push først når han sier «push»** (eller «push til ekte siden / orginalen»). Unntak: ting han bare kan se på telefonen må ut for at han skal kunne sjekke. Si i så fall at det er pushet.
4. Etter push: vent til endringen er live på reachmedia.no og bekreft kort.
5. Tolk korte beskjeder bokstavelig. Er noe uklart (f.eks. «gjør mindre»), gjør minst mulig endring og behold oppsettet. Eksempel: «mindre case-kort» betydde samme 2×2 og samme bildeformat, bare mindre. Ikke 4 på rad, ikke nye bildeformater.
6. Svar kort, på norsk, uten tankestreker.

**Sjekk før push:** `npx tsc --noEmit` og `npm run lint` i `web/`.
**QA-skjermbilder:** playwright-core med installert Chrome (`channel: "chrome"`), lagres i `.impeccable/review/`.
**Medier:** kildefiler i `Medier /` (merk mellomrommet i mappenavnet). `web/scripts/media.sh` konverterer til WebP/MP4 i `web/public/media/`.

---

## Hva vi gjorde 30. september (alt live)

- **Resultater:** fjernet «Skjermbilder tatt rett fra kundens annonsekontoer.» Punkter nå: annonsevolum +100 %, 10x flere konsepter, tracking. «Vinnende annonser 5x» ligger som egen linje under «Resultatet».
- **Spekebua-casen:** ingen omtale av Shopify-flytting eller server-side tracking (Bendik vil ikke nevne det). Fokus på volum i konsepter og vinkler. Tall nr. 3 er «10x flere konsepter testet». Også fjernet «For Spekebua: over 10 000 datapunkter» i Tjenester.
- **Rekkefølge:** «Butikker vi har skalert» (Kundelogoer) ligger rett etter Problem-seksjonen, før Resultater.
- **Delingsbilde:** `src/app/opengraph-image.png` (1200×630, logo på hvitt) så lenkedeling ikke viser første annonse.
- **Resultater (generell):** ingen «+2 mill.» lenger. Ingress om kreativt arbeid, «Slik gjør vi det» (4 punkter). Tall-tabellen er fjernet etter ønske fra Bendik, skjermbildene viser tallene selv.
- **UGC-karusell:** fylt blå neste-pil som dytter, «Sveip/Bla for flere» med håndikon og fremdriftslinje. Gjelder også KLA-casesiden.
- **Domene:** `site.url` er nå `https://www.reachmedia.no`. Apex `reachmedia.no` peker ikke til Vercel (videresending som bare tar forsiden, undersider gir 404). Bør flyttes til Vercel i DNS. Ikke gjort.
- **Åpent:** Spekebua-kortet i Kundelogoer har fortsatt «+2 mill på ett år». Spurt, ikke besvart.
- **KLA før/etter:** merket viser «Til» + ekte Shopify-logo (`public/media/shopify-logo.png`, transparent). Kilde: `Medier /Logoer/shopify-logo.png`.

---

## Hva vi gjorde 26.–27. september (alt live)

### Generelt
- Deploy-løype satt opp på Vercel (prosjektet måtte slettes og importeres på nytt med Root Directory `web` før første bygg).
- Favicon + Apple-ikon laget fra den ekte R-en i logoen (`src/app/icon.png`, `apple-icon.png`). Kilde: `Medier /favicon-reach-media.png`. Ikke tegn R-en på nytt som vektor, Bendik vil ha originalen.
- Meny: «Slik funker auditen» (var «Slik funker det») i `lib/site.ts`.
- Mobilmeny: mindre og ikke-fet skrift (`Nav.tsx`, `text-[1.375rem] font-medium`).
- Footer: «Betalt annonsering for norske nettbutikker.»

### Hero (`Hero.tsx`, `ads/AdStage.tsx`, `lib/ads.ts`)
- Overskrift alltid på to linjer: «Skaler med overskudd.» / «100 % resultatbasert.» Egen mindre størrelse på mobil (`clamp(1.5rem,7.6vw,2.5rem)`), uendret på PC.
- 8 annonser i vifta og trappen (`deckAds` i `lib/ads.ts`): static-24, 12, 14, 20, 26, 23, 21, 25. Bendik valgte disse.
- Mer luft mellom kortene. Trappen i seksjon 2 er smalere. Bendik: «det er bra nå i headern». Ikke legg til flere kort i trappen (han sa nei).
- Mobil viser statisk vifte med 4 kort.

### Kundelogoer
- «Butikker vi har skalert.»

### Resultater (`Resultater.tsx`)
- Overskrift «Resultatene snakker for seg selv.» med pil (høyre på PC, ned på mobil).
- **Anonymisert:** ingen Spekebua-navn her. «En nettbutikk vi har jobbet med i litt under ett år …»
- Punkter: økt kreativt volum, 10x flere konsepter, 100 % mer annonsevolum, server-side tracking.
- Rolig resultatliste: +2 mill. kr omsetning, +50 % budsjett, ROAS uendret. Ingen knapper.
- Meta-skjermbilde: `public/proof/meta-ads-manager.png` (1859×847, polstret høyre side så tallene ikke kuttes).
- Bildetekst: «Skjermbilder tatt rett fra kundens annonsekontoer.»

### UGC-seksjonen (`Ugc.tsx`, `ads/UgcCarousel.tsx`)
- 8 KLA-videoer i karusell med piler (3 synlige på PC, sveip på mobil).
- Rekkefølge satt av Bendik: `[5, 6, 1, 7, 4, 3, 8, 2]` (ugc-05 først, Wave Contact som nr. 2).
- Videoer ugc-04 til 08 er nye (kilde: `Medier /Ads skal brukes i nettsie/UGC videoer nye/`, `media.sh video_extra`). De er 10–24 MB, lastes bare ved klikk.

### «Det kreative» (`AdsGallery.tsx`)
- Overskrift «Det kreative.», undertekst «Noen av annonsene vi har laget for kundene våre.»
- Nye annonser lagt inn (BikePlay, CarPlay Norge). Harry-annonsen (Frame 2 (1).png) er fjernet.

### Prosjekter / case-kort (`Caser.tsx`)
**Bendik er fornøyd med dette oppsettet. Ikke endre uten at han ber om det.**
- 2×2 kort, like høye, 16:9-medieflate øverst, tekst under, «Les casen» på linje.
- KLA: 3 spillbare videoer på lys grå bakgrunn (`#eceef1 → #dfe2e7`), hover-zoom. Bendik likte ikke grønn, og blå ble for likt Spekebua.
- Spekebua: nytt forsidebilde `public/proof/spekebua-case.webp` (fire annonser, 1600×901). Kilde: `Medier /spekebua-case-forside.png`.
- Forsøkt og **avvist**: 4 kort på én rad, og 2×2 med lavere bildeformat (5:2). Begge rullet tilbake.

### KLA-casesiden (`/prosjekter/kla`)
- Viser alle 8 KLA-videoene i to rader som blar sidelengs (samme `UgcCarousel`, `rows={2}`). Forsidekortet viser bare de tre første (`kla.ads.slice(0, 3)`).

### Audit-steg (`AuditSteg.tsx`)
- Fjernet innglidnings-animasjonen (lagget). Bildene lastes med en gang, steg 1 synlig fra start.

### Videoer generelt (`ads/AdVideo.tsx`)
- Trykk på videoen for pause/fortsett (egne kontroller, fungerer på mobil). Bare én video spiller om gangen.

---

## Åpne tråder (ikke gjort, spør før du gjør noe)
- Spekebua-navnet står fortsatt i case-kortet og på `/prosjekter/spekebua` (bare fjernet fra Resultater). Spurt, ikke besvart.
- På telefoner ≤360 px bredde stikker hero-annonsekortene litt ut til høyre. Ikke et problem på iPhone 17 Pro (402 px).
- De nye UGC-videoene kan komprimeres mer hvis siden skal bli lettere.
- Hvis Analytics ikke viser data: slå på Web Analytics i Vercel-prosjektet.

## Låst fra før (se også eldre handoff)
- Lys Pallet Ross-retning, Reach-blått (#2563EB) + grønn pop i hero.
- Booking via HighLevel-iframe (`bookingUrl` i `lib/site.ts`).
- Ikke finn på tall/claims utover godkjente case-fakta.
