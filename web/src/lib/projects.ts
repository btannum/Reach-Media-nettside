import { ads, type Ad } from "@/lib/ads";

// Caser. KLA-tallene er fra dagens reachmedia.no/prosjekter/kla, Spekebua og
// Gorilla Games fra Bendik 2026-09-25. Vises i Caser-seksjonen på forsiden,
// i /prosjekter og på /prosjekter/[slug].

export type Market = "no" | "se" | "dk" | "uk";

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Kort, én linje. Brukes som tittel i tiles og H1 på detaljsiden. */
  headline: string;
  summary: string;
  metrics: { value: string; label: string }[];
  body: string[];
  /** Annonser som vises over teksten i tile og på detaljsiden. */
  ads: Ad[];
  /** Valgfritt forsidebilde (f.eks. Gorilla Google-cover). */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Markeder, for Gorilla Games. Første er hjemmemarked. */
  markets?: Market[];
  status?: "Pågående" | "Case kommer snart";
  /** Hva vi gjorde, som chips. */
  services?: string[];
  /** Viser før/etter-illustrasjonen (BeforeAfter) på detaljsiden. */
  beforeAfter?: { caption: string };
};

const byId = (id: string) => ads.find((a) => a.id === id)!;

export const projects: Project[] = [
  {
    slug: "spekebua",
    name: "Spekebua",
    category: "Spekemat, Meta og Google",
    headline: "+2 mill på ett år. Samme lønnsomhet.",
    summary:
      "Norges største utvalg av spekemat. Ett år med Meta, Google, Shopify-migrering og server-side tracking, med samme lønnsomhet som før.",
    metrics: [
      { value: "+2 mill.", label: "kr i omsetning på ett år" },
      { value: "Samme ROAS", label: "med 50 % mer budsjett" },
      { value: "10 000+", label: "datapunkter flyttet" },
    ],
    body: [
      "Hos Spekebua tok vi over Meta og Google i ett år: bygde opp volumet på statics, testet vinkler mot gaver, tilbud, konfirmasjon og sortiment, og skalerte det som solgte.",
      "Samtidig flyttet vi butikken til Shopify (over 10 000 datapunkter), satte opp server-side tracking og ryddet produktfeeden i DataFeedWatch og Merchant Center.",
      "Resultat: over 2 millioner kroner mer i omsetning med samme lønnsomhet.",
    ],
    services: [
      "Meta-annonsering",
      "Google Ads",
      "Shopify-migrering",
      "Server-side tracking",
      "DataFeedWatch",
      "Merchant Center",
    ],
    ads: [byId("static-12"), byId("static-22"), byId("static-17"), byId("static-23")],
  },
  {
    slug: "kla",
    name: "KLA Sport",
    category: "Sportsutstyr, Meta",
    headline: "Doblet omsetningen med samme budsjett.",
    summary:
      "Godt produkt, tydelig merkevare, men annonsene traff ikke. Korte, humoristiske UGC-videoer gjorde jobben.",
    metrics: [
      { value: "+100 %", label: "omsetning" },
      { value: "14×", label: "ROAS" },
      { value: "200 000+", label: "kr fra annonser" },
    ],
    body: [
      "KLA visste at de hadde noe bra, men ikke hvordan de skulle posisjonere det i annonser. Det polerte uttrykket de hadde brukt ga lite.",
      "Vi laget flere korte, humoristiske videoannonser, testet hooks og vinkler løpende, fant vinnerne raskt og skalerte dem gjennom Black Month.",
      "Resultat: dobbel omsetning fra annonser, 14× ROAS, og over 200 000 kr generert, med samme annonsebudsjett som tidligere.",
      "Nå jobber vi med neste steg: KLA flyttes fra den gamle nettbutikken til Shopify. Ny butikk, samme produkter, bedre grunnlag for annonsene.",
    ],
    services: ["Meta-annonsering", "UGC-produksjon", "Shopify-migrering"],
    beforeAfter: { caption: "Fra gammel nettbutikk til Shopify. Pågående." },
    ads: [byId("ugc-01"), byId("ugc-02"), byId("ugc-03")],
  },
  {
    slug: "gorilla-games",
    name: "Gorilla Games",
    category: "Spill og leker, Google",
    headline: "Fra Norge til Sverige, Danmark og Storbritannia.",
    summary:
      "Vi optimaliserer Google-kontoen i Norge nå, og er partneren som tar butikken ut i nye markeder.",
    metrics: [{ value: "4", label: "markeder" }],
    body: [
      "Gorilla Games kjører Google Ads i Norge. Første jobb er å få mer ut av den norske kontoen: struktur, Shopping, søk og sporing mot Shopify.",
      "Neste steg er ekspansjon. Vi setter opp og styrer kontoene for Sverige, Danmark og Storbritannia, med samme daglige oppfølging som hjemme.",
      "Prosjektet pågår. Tall kommer når de er klare.",
    ],
    ads: [],
    cover: {
      src: "/media/cases/gorilla/google-ads-cover.png",
      alt: "Gorilla Games og Google Ads",
      width: 1672,
      height: 941,
    },
    markets: ["no", "se", "dk", "uk"],
    status: "Case kommer snart",
  },
];

export const otherClients = [
  { name: "Beeki", category: "Hudpleie" },
  { name: "CarPlay Norge", category: "Bilelektronikk" },
  { name: "Novito", category: "Skjønnhet" },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
