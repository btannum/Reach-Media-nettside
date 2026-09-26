import Link from "next/link";
import { ads } from "@/lib/ads";
import { UgcCarousel } from "@/components/ads/UgcCarousel";
import { RevealWords } from "@/components/Reveal";

// Seksjon 3, UGC. Tekst til venstre, KLA-videoene til høyre i en karusell
// man kan bla i (spillbare). Bygger videre på KLA-casen.
// Blandet rekkefølge, så de nye og de gamle videoene veksler.
const order = [5, 6, 1, 7, 4, 3, 8, 2];
const ugc = order.map((n) => ads.find((ad) => ad.id === `ugc-0${n}`)!);

export function Ugc() {
  return (
    <section id="ugc" className="container-rm section-y overflow-x-clip">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <RevealWords text="UGC som treffer." className="text-headline" />
          <p className="measure mt-6 text-body text-fg-muted">
            Korte, humoristiske videoer med ekte folk. For KLA var det det som
            doblet omsetningen fra annonsene.
          </p>
          <p className="measure mt-4 text-body text-fg-muted">
            Vi lager begge deler: statics i volum, og UGC som den andre
            vinkelen. Brief, skapere, klipp, tekst og test i kontoen.
          </p>
          <Link
            href="/prosjekter/kla"
            className="mt-6 inline-block text-body text-fg underline decoration-hairline-strong underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus"
          >
            Les KLA-casen
          </Link>
        </div>

        <div className="col-span-12 min-w-0 lg:col-span-7">
          <UgcCarousel ads={ugc} />
        </div>
      </div>
    </section>
  );
}
