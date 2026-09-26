# Copy-review, SPEC.md §2–3

Gjennomgått 2026-09-25 mot PRODUCT.md. ✔ = klart bedre, ~ = smaksak. Alle [TODO]/[VERIFISER] står urørt. Ingen nye tall eller påstander.

Gjennomgående funn:
- Copyen er allerede kort og direkte. De fleste forslagene er småjusteringer.
- Ett faktisk avvik: faktalinjen i hero (SPEC) sier «100 % resultatbasert». Det bryter regelen om betaling. Koden bruker allerede «Betalt av omsetningen din». SPEC bør oppdateres.
- «Kreativ» og «kreativen» er byråspråk. ICP forstår det, men «annonser» er ordet de selv bruker. Byttet der det ikke koster presisjon.
- Semikolon og «og/eller» dukker opp et par steder. Fjernet.

---

## 1. Hero

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Betalt annonsering for Shopify-butikker over 50 000 kr i måneden. | Behold. | 9 ord, kvalifiserer hardt, sier hva og for hvem. |
| ~ | (alt. A) | Vi styrer annonsene. Du ser det i kassa. | Utbytte-ledet, setter opp Problem-H2 om kassa. Mister «Shopify» og «50 000». |
| ~ | (alt. B) | Annonser som selger, for Shopify-butikker over 50 000 kr. | Kortere, beholder terskelen, «selger» er løftet. |
| ~ | (alt. C) | Meta og Google for Shopify-butikker som allerede bruker penger. | Filtrerer bort nybegynnere uten tall. Svakere enn 50 000. |
| ~ | Vi planlegger og styrer annonsene på Meta og Google hver dag, og tar hovedsakelig betalt som en andel av omsetningen de gir. Tilpasset marginene dine. | Vi planlegger og styrer annonsene dine på Meta og Google hver dag. Betalingen er hovedsakelig en andel av omsetningen de gir, tilpasset marginene dine. | To setninger i stedet for én lang med komma. «Tilpasset marginene dine» henger på setningen den hører til. |
| ✔ | Faktalinje: 100 % resultatbasert · Meta og Google · Norsk team | Betalt av omsetningen din · Meta og Google · Norsk team, ingen juniorer | «100 % resultatbasert» strider mot betalingsregelen. Koden har allerede riktig tekst; SPEC henger etter. |
| ~ | Slik funker auditen | Se hvordan auditen funker | Verb først, som primær-CTA. Marginal. |

## 2. Problem

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Annonsene får klikk. Kassa får ikke salget. | Behold. | Best H2 på siden. Konkret, speiler ICP-ens egen frustrasjon. |
| ✔ | (mangler: «én setning» under H2 i venstre kolonne) | Hver uke det står slik, betaler du for klikk som ikke blir kjøp. | Tapsaversjon: gjør lekkasjen til en løpende kostnad, ikke et abstrakt problem. SPEC lover en setning her, men ingen er skrevet. |
| ✔ | Kreativen brenner ut. | Annonsene brenner ut. | Kundens ord. «Kreativen» er byråspråk. |
| ~ | Samme fire annonser i seks uker gir stigende CPA. Ingen lager nye fort nok. | Samme fire annonser i seks uker. CPA stiger, og ingen lager nye fort nok. | Rytme. Første setning blir et bilde, andre blir konsekvensen. |
| ~ | Ingen ser på kontoen daglig. | Ingen ser på kontoen hver dag. | «Daglig» er greit, men «hver dag» matcher hero og Løsning. Konsistens. |
| ~ | Budsjett ligger på annonsesett som sluttet å levere for ti dager siden. | Behold. | Spesifikt, sant nok som generalisering, treffer. |
| ~ | ROAS i Ads Manager er ikke omsetning i Shopify. Uten å se begge, optimaliseres det på feil tall. | ROAS i Ads Manager er ikke omsetning i Shopify. Ser du ikke begge, optimaliserer du på feil tall. | Passiv til aktiv. «Du» gjør det personlig. |
| ~ | Byrået tjener det samme uansett. Fast fee gir ingen grunn til å jage neste vinner. | Behold. | Setter opp betalingsmodellen uten å nevne den. |

## 3. Løsning

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Vi lukker gapet mellom annonse og kasse. | Behold. | Svarer direkte på Problem-H2. |
| ~ | Volum på kreativ. | Nye annonser hver måned. | Kundens ord, og det sier hva volumet betyr. |
| ✔ | Nye statics og UGC hver måned. Vi planlegger hver annonse, designerne vi jobber med produserer, vi tester. Vinnere skaleres, tapere byttes. | Nye statics og UGC hver måned. Vi planlegger hver annonse og tester den. Designerne vi jobber med produserer. Vinnere skaleres, tapere byttes. | Tre-leddet setning med komma leser som en oppramsing. Delt opp blir rollefordelingen tydelig: vi planlegger, de produserer. |
| ~ | Daglig styring av oss, ikke en junior. | Daglig styring. Av oss, ikke en junior. | Punktum gir trykk på «ikke en junior». |
| ~ | Budsjett, bud og annonsesett justeres hver virkedag av de samme folkene du snakket med først. | De samme folkene du snakket med først justerer budsjett, bud og annonsesett hver virkedag. | Aktiv. Folkene først, siden det er poenget. |
| ~ | Betalt etter omsetning. | Behold. | |
| ~ | Har du lave marginer eller vil ha fastpris, finner vi en modell som passer. | Har du lave marginer, eller vil ha fastpris, finner vi en modell som passer deg. | «Deg» lukker setningen. Komma gjør «eller» lettere å lese. |

## 4. Audit-steg

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Auditen: fem steg, ingen forpliktelse. | Gratis audit i fem steg. Ingen forpliktelse. | Kolon i overskrift ser ut som en etikett. To setninger er lettere. |
| ~ | Du gir oss lesetilgang. Vi gjør resten. Rapporten og videoen er dine uansett om vi jobber sammen etterpå. | Behold. | Risikoreduksjon i tre korte setninger. Fungerer. |
| ✔ | Du legger oss til som analytiker i Meta Business Manager og/eller Google Ads. Vi kan ikke endre noe. | Du legger oss til som analytiker i Meta Business Manager, Google Ads, eller begge. Vi kan ikke endre noe. | «Og/eller» er kontraktspråk. |
| ~ | Ekspert-audit. | Audit. | «Ekspert» er egenskryt. Steget forklarer seg selv i brødteksten. |
| ~ | Vi går gjennom struktur, kreativ, målgrupper, budsjettfordeling og sporing mot Shopify. | Vi går gjennom struktur, annonser, målgrupper, budsjettfordeling og sporing mot Shopify. | «Kreativ» → «annonser». |
| ~ | Rapport. Skriftlig, prioritert: hva som lekker mest, hva det koster deg, hva vi ville gjort først. | Behold. | Kolon fungerer her; det er en liste. |
| ~ | Loom. En videogjennomgang av rapporten, inne i din konto, så du ser hva vi peker på. | Loom. En video der vi går gjennom rapporten inne i kontoen din, så du ser hva vi peker på. | «Din konto» → «kontoen din». Norsk ordstilling. |
| ~ | Gjennomgang. Et møte der vi svarer på spørsmål og sier ærlig om vi tror vi kan flytte tallene dine. | Møte. Vi svarer på spørsmål og sier ærlig om vi tror vi kan flytte tallene dine. | «Gjennomgang» er brukt om Loom-steget i praksis. «Møte» skiller dem. |

## 5. Ads-gallery

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Annonsene vi lager. | Behold. | |
| ✔ | Statics og UGC fra pågående kontoer. Ikke porteføljearbeid, ikke konseptskisser. | Statics og UGC fra kontoer som kjører nå. Ingen konseptskisser. | «Ikke X, ikke Y» er en AI-tell. «Kjører nå» er sterkere enn «pågående». |

## 6. Resultater

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Tall fra kontoene, ikke fra en pitch. | Behold. | Ærlighets-signal, riktig tone. |
| ✔ | Skjermbildene er ubehandlet. Chipsene peker på det som betyr noe. | Skjermbildene er tatt rett fra Ads Manager og Google Ads. Vi har markert tallene som betyr noe. | «Chips» er UI-språk, ikke kundespråk. «Ubehandlet» høres ut som mat. |
| ~ | 24.15 ROAS på beste annonsesett | 24.15 ROAS, beste annonsesett | Kortere etikett, samme fakta. [VERIFISER] står. |
| ~ | Bildetekst: Nettbutikk, [kategori], [periode] | Behold. | Riktig å ikke navngi. |

## 7. Sammenligning

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Hvorfor ikke et stort byrå, eller en frilanser? | Behold. | Speiler spørsmålet ICP faktisk stiller seg. |
| ~ | Hovedsakelig provisjon av omsetning, tilpasset marginene dine | Behold. | Følger regelen. |
| ~ | Vi planlegger og håndterer; designerne våre produserer | Vi planlegger og håndterer. Designerne våre produserer. | Semikolon i en tabellcelle. |
| ✔ | Rad «Hvem sitter i kontoen» + rad «Kontaktperson» | Slå sammen til én rad: «Hvem du snakker med» → Reach Media: De som sitter i kontoen din. Vanlig byrå: En account manager. Ofte en junior i kontoen etter salgsmøtet. Frilans: Frilanseren, til de bytter prosjekt. | To rader sier det samme. Én rad med junior-poenget i byråkolonnen er sterkere. |
| ~ | Kreativ kapasitet | Antall annonser per måned | Kundespråk. [TODO: tall] står. |
| ~ | Som regel engelsk, kjenner ikke markedet | Som regel engelsk. Kjenner ikke det norske markedet. | «Markedet» alene er vagt. |

## 8. Timeline

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Slik ser et samarbeid ut. | Behold. | Lover ingen tidsramme. Riktig gitt [TODO]. |
| ~ | Research. Konto, produkt, konkurrenter, kommentarfelt. | Behold. | «Kommentarfelt» er den konkrete detaljen som gjør steget troverdig. |
| ~ | Launch. Ny struktur, sporing sjekket mot Shopify. | Lansering. Ny struktur, sporing sjekket mot Shopify. | Norsk ord finnes og brukes. |
| ~ | Skalere vinnere. Nye varianter av det som virker. | Behold. | |
| ~ | Månedlig møte. Tall, plan, neste måned. | Månedlig møte. Tallene, planen for neste måned. | «Tall, plan, neste måned» er tre substantiv uten setning. |

## 9. Kundelogoer

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Butikker vi jobber med | Behold. | Ingen «+N kunder». Riktig. |

## 10. Om oss

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Du blir ikke sendt videre til en junior. | Behold. | Sterkeste differensiering på siden, sagt på fem ord. |
| ✔ | Vi planlegger og håndterer annonsene selv, med en Google-ekspert på laget og flere grafiske designere vi jobber med til produksjonen. | Vi planlegger og håndterer annonsene selv. Google-eksperten sitter hos oss. Produksjonen gjør vi med grafiske designere vi jobber fast med. | Én setning med tre ledd blir tre setninger med hvert sitt poeng. «Jobber fast med» er hentet fra FAQ 4, så det er konsistent. |
| ~ | Norsk byrå, kun B2C-nettbutikker, kun betalt annonsering. | Behold. | Tre fakta, ikke pynt. |
| ~ | Bendik Tannum, co-founder, kreativ strateg. Research, briefer, strategi. Den du snakker med først. | Behold. | |
| ~ | Kevin Johansen Zeba, co-founder, media buyer. Sitter i Meta-kontoen din hver dag og lager Loom-videoen hver uke. | Behold. | Konkret. Den beste teamlinjen. |
| ~ | Sahil, senior developer og Google-ekspert. Google Ads, sporing og backend. | Behold. | |

## 11. FAQ

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ✔ | Noen foretrekker fastpris, andre provisjon; vi finner en modell som passer situasjonen din. | Noen foretrekker fastpris, andre provisjon. Vi finner en modell som passer situasjonen din. | Semikolon. |
| ~ | Hva om det ikke gir resultater? Med provisjon tjener vi lite. Det er hele poenget med modellen. | Behold. | |
| ~ | Lesetilgang til Meta Business Manager og/eller Google Ads, og Shopify-analyse. Til auditen kan vi ikke endre noe. | Lesetilgang til Meta Business Manager, Google Ads og Shopify-analyse. Under auditen kan vi ikke endre noe. | «Og/eller» ut. «Under» er tydeligere enn «til». |
| ~ | Vi planlegger og håndterer alle annonsene. Produksjonen gjør vi sammen med flere grafiske designere vi jobber fast med. | Behold. | |
| ~ | Ikke TikTok i dag. | Behold. | Ærlig og kort. [VERIFISER] står. |
| ✔ | Passer vi for dere? | Passer butikken min? | Spørsmålet stilles av besøkende. «Vi» blir tvetydig i et FAQ. |
| ~ | Under det er det som regel bedre å bruke pengene på kreativ og drift selv. | Under det er det som regel bedre å bruke pengene på annonser og drift selv. | «Kreativ» → «annonser». |
| ~ | Bindingstid? Ingen. Én måneds oppsigelse. | Behold. | [VERIFISER] står. |

## 12. Final CTA + skjema

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Send oss lesetilgang. Få rapporten. | Behold. | Beskriver byttehandelen. Skjemaet gir ikke tilgang direkte, men ingressen forklarer det. |
| ~ | Fyll ut, så tar vi kontakt innen én virkedag med instruks for tilgang. | Fyll ut, så sender vi deg instruks for tilgang innen én virkedag. | «Tar kontakt med instruks» er omvei. [VERIFISER] står. |
| ~ | Vi bruker opplysningene kun til å svare deg. Se personvern. | Vi bruker opplysningene bare til å svare deg. Les mer om personvern. | «Se personvern» er en etikett, ikke en setning. |
| ~ | Takk. Vi svarer fra post@reachmedia.no innen én virkedag. | Behold. | Sier hvor svaret kommer fra, så det ikke havner i søppelpost. |
| ~ | Skjemaet gikk ikke gjennom. Send en e-post til post@reachmedia.no i stedet. | Behold. | Navngir problemet og utveien. |

## §3 /prosjekter

| | Nå | Forslag | Hvorfor |
|---|---|---|---|
| ~ | Prosjekter | Butikker vi jobber med | Samme ordlyd som logo-seksjonen. «Prosjekter» høres ut som et designbyrå. Nav-lenken må i så fall også byttes. |

---

## De 10 endringene med størst effekt

1. Hero-faktalinje i SPEC: bytt «100 % resultatbasert» til «Betalt av omsetningen din». Faktafeil mot betalingsregelen.
2. Problem: skriv inn setningen under H2: «Hver uke det står slik, betaler du for klikk som ikke blir kjøp.» Tapsaversjon på siden der det hører hjemme.
3. Om oss: del den lange setningen om Google-ekspert og designere i tre. Rollefordelingen er hele poenget, og den drukner nå.
4. Løsning, flis 1: del opp «Vi planlegger hver annonse, designerne vi jobber med produserer, vi tester.» Samme grunn.
5. Sammenligning: slå sammen «Hvem sitter i kontoen» og «Kontaktperson» til én rad med junior-poenget i byråkolonnen.
6. Resultater-ingress: bytt «Chipsene» og «ubehandlet» med kundespråk.
7. FAQ 6: «Passer vi for dere?» → «Passer butikken min?».
8. Ads-gallery: fjern «Ikke porteføljearbeid, ikke konseptskisser».
9. Fjern «og/eller» i audit-steg 1 og FAQ 3.
10. «Kreativ/kreativen» → «annonser» i Problem 1, Løsning 1, Audit-steg 2 og FAQ 6. Kundens ord, ikke byråets.

Utenfor oppdraget, men verdt å nevne: Hero-koden har «Norsk team, ingen juniorer» i faktalinjen. Det er bra og bør inn i SPEC så dokument og kode stemmer.
