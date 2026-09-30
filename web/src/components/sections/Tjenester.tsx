import Link from "next/link";
import { Reveal, RevealWords } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";

// Seksjon 10b. Det tekniske bak annonsene: sporing, migrering, feed, CRO.
// Overskrift øverst, KLA-migreringen i full bredde, så fire tjenestebokser
// side om side (bruker 2026-09-25: tekst og bilde i balanse).

const services = [
  {
    title: "Server-side tracking",
    body: "Sporing gjennom din egen server, ikke bare nettleseren. Du eier dataene selv, og annonsekontoene får riktigere tall å optimalisere på.",
  },
  {
    title: "Shopify-utvikling og migrering",
    body: "Flytting til Shopify med produkter, varianter, kunder og ordrehistorikk intakt.",
  },
  {
    title: "Merchant Center og DataFeedWatch",
    body: "Produktfeeden avgjør hva Google viser og til hvem. Vi rydder og strukturerer den så Shopping og Performance Max får det de trenger.",
  },
  {
    title: "CRO",
    body: "Landingssider, produktsider og kasse. Små endringer som gjør at mer av trafikken vi kjøper faktisk blir kjøp.",
  },
];

export function Tjenester() {
  return (
    <section id="tjenester" className="container-rm section-y overflow-x-clip">
      <div className="grid-12 items-end gap-y-6">
        <div className="col-span-12 lg:col-span-6">
          <RevealWords text="Vi tar også det tekniske." className="text-headline" />
        </div>
        <p className="col-span-12 text-body text-fg-muted lg:col-span-5 lg:col-start-8">
          Annonser virker bare så godt som butikken og dataene bak dem. Derfor
          gjør vi også jobben under panseret, med egen Google-ekspert og
          utvikler på laget.
        </p>
      </div>

      <Reveal className="mt-12 lg:mt-16">
        <figure>
          <div className="mx-auto max-w-[1040px]">
            <BeforeAfter />
          </div>
          <figcaption className="mx-auto mt-8 flex max-w-[1040px] flex-wrap items-center justify-between gap-2 border-t border-hairline pt-5 text-small text-fg-muted">
            <span>KLA Sport flyttes fra gammel nettbutikk til Shopify. Pågående.</span>
            <Link
              href="/prosjekter/kla"
              className="text-fg underline decoration-hairline-strong underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus"
            >
              Les KLA-casen
            </Link>
          </figcaption>
        </figure>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} amount={0.2}>
            <li className="flex h-full flex-col rounded-md bg-surface p-6 shadow-card">
              <h3 className="text-title">{s.title}</h3>
              <p className="mt-3 text-small text-fg-muted">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
