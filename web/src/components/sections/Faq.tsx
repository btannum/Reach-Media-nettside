import { site } from "@/lib/site";

const faqs = [
  {
    q: "Hvordan priser dere dere?",
    a: "Hovedsakelig prosent av omsetningen annonsene genererer. Satsen avtales etter auditen og tilpasses marginene dine. Fastpris eller hybrid er også mulig.",
  },
  {
    q: "Tar dere prosent av hele butikkens omsetning?",
    a: "Nei. Vi tar prosent av omsetningen fra annonsene vi styrer, etter avtalt modell.",
  },
  {
    q: "Lager dere annonsene, eller må vi levere kreativt selv?",
    a: "Vi planlegger og styrer. Faste grafiske designere vant med norske merkevarer produserer statics. UGC koordineres. Du godkjenner før noe går live.",
  },
  {
    q: "Hvor mange nye annonser får vi?",
    a: "Ferske annonser hver uke. Varianter av vinnere, pluss nye konsepter laget for merkevaren.",
  },
  {
    q: "Hvilke plattformer kjører dere?",
    a: "Meta og Google Ads. Ofte begge.",
  },
  {
    q: "Hva skjer i den gratis auditen?",
    a: "Du booker en kort discovery call. Der avtaler vi lesetilgang til kontoene. Så går vi gjennom dem og viser deg funnene i en Loom-video, prioritert etter hva som lekker mest, før vi tar en gjennomgang sammen. Videoen er din uansett om vi samarbeider videre.",
  },
  {
    q: "Trenger vi Shopify?",
    a: "De fleste kundene våre er på Shopify. Vi hjelper også med sporing, feed og migrering når det begrenser annonsene.",
  },
  {
    q: "Hvor mye må vi bruke på ads i måneden?",
    a: "Best fra ca. 50 000 kr i måneden.",
  },
  {
    q: "Er det bindingstid?",
    a: "Ingen bindingstid. Tre måneders oppsigelse.",
  },
  {
    q: "Hvem sitter i kontoen vår?",
    a: "Bendik og Kevin. De eier kontoen, de samme som solgte inn samarbeidet, og de du snakker med underveis. Tett samarbeid med faste kontaktpersoner, ikke en junior etter salgsmøtet.",
  },
];


/** Accordion-listen alene, til bruk inne i andre seksjoner. */
export function FaqList({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-md bg-surface px-6 shadow-card lg:px-8 ${className}`}>
      {faqs.map((item) => (
        <details
          key={item.q}
          name="faq"
          className="group border-b border-hairline last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-title [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="size-5 shrink-0 text-fg-muted transition-transform duration-[180ms] ease-state group-open:rotate-180"
            >
              <path
                d="M5 7.5 10 12.5 15 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <p className="measure pb-6 text-body text-fg-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

// FAQ som egen seksjon (ikke i bruk på forsiden; listen ligger i booking-seksjonen). <details name="faq"> gir ett åpent om gangen uten JS.
export function Faq() {
  return (
    <section id="faq" className="container-rm section-y">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <h2 className="text-headline">Spørsmål vi får ofte.</h2>
          <p className="mt-6 text-small text-fg-muted">
            Fant du ikke svaret? Send en e-post til{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-fg underline decoration-hairline-strong underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <FaqList />
        </div>
      </div>
    </section>
  );
}
