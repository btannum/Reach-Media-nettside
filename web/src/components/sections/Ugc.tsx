import Link from "next/link";
import { ads } from "@/lib/ads";
import { AdCard } from "@/components/ads/AdCard";
import { RevealWords } from "@/components/Reveal";

// Seksjon 3, UGC. Tekst til venstre, de tre KLA-videoene til høyre
// (spillbare). Bygger videre på KLA-casen.
const ugc = ads.filter((ad) => ad.kind === "UGC");

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

        <ul
          aria-label="UGC-videoer"
          className="col-span-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:col-span-7 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {ugc.map((ad, i) => (
            <li key={ad.id} className="w-[200px] shrink-0 snap-start lg:w-auto">
              <AdCard ad={ad} index={i} sizes="(min-width: 1024px) 220px, 200px" interactive priority={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
