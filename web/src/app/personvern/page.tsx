import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Hvordan Reach Media behandler opplysningene du sender inn.",
};

// SPEC.md §4. TODO: juridisk navn og org.nr når de er bekreftet.
export default function PersonvernPage() {
  return (
    <article className="container-rm section-y pt-32 lg:pt-40">
      <h1 className="text-headline">Personvern</h1>
      <div className="measure mt-8 flex flex-col gap-8 text-body text-paper-muted">
        <section>
          <h2 className="text-title text-paper">Hva vi samler inn</h2>
          <p className="mt-2">
            Når du sender inn skjemaet for gratis audit, lagrer vi navn, e-post,
            adressen til nettbutikken, hvilke plattformer dere annonserer på,
            omtrentlig månedlig adspend og eventuell melding.
          </p>
        </section>
        <section>
          <h2 className="text-title text-paper">Hva vi bruker det til</h2>
          <p className="mt-2">
            Kun til å svare deg og gjennomføre auditen. Vi selger ikke
            opplysningene og deler dem ikke med andre enn de som leverer
            e-posttjenesten vår.
          </p>
        </section>
        <section>
          <h2 className="text-title text-paper">Hvor det lagres</h2>
          <p className="mt-2">
            Forespørselen sendes som e-post til Reach Media. Nettsiden har ingen
            egen database. Vi bruker ingen sporingscookies på siden.
          </p>
        </section>
        <section>
          <h2 className="text-title text-paper">Dine rettigheter</h2>
          <p className="mt-2">
            Du kan når som helst be om innsyn i, retting av eller sletting av
            opplysningene dine ved å sende en e-post til{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-paper underline decoration-hairline-strong underline-offset-[3px] hover:decoration-signal-focus"
            >
              {site.email}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-title text-paper">Behandlingsansvarlig</h2>
          <p className="mt-2">Reach Media, org.nr. {site.orgNr}. {site.contact.email}, {site.contact.phone}.</p>
        </section>
      </div>
    </article>
  );
}
