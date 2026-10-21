import Link from "next/link";
import { GlowCurve } from "@/components/brand/GlowCurve";
import { Reveal } from "@/components/Reveal";
import { darkPrimary } from "./styles";

// Prismodell for tjenestebedrifter (Bendik 2026-10-20): betaling per booking,
// anbefalt annonsebudsjett 10 000 kr/mnd, som kommer i tillegg og betales til
// Meta (Bendik 2026-10-21). Ingen garantier på siden.
export function TjenestePris() {
  return (
    <section id="pris" className="border-t border-line">
      <div className="container-rm py-24 lg:py-32">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-lg bg-gradient-to-br from-night-3 via-night-2 to-night px-6 py-16 ring-1 ring-white/10 sm:px-10 lg:px-16 lg:py-24">
            <div aria-hidden="true" className="absolute -top-32 -right-20 -z-10 size-[460px] rounded-full bg-signal/35 blur-[120px]" />
            <GlowCurve className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-60" delay={0.2} />
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <h2 className="text-display lg:col-span-6">
                Du betaler <em className="text-glow pr-[0.06em]">per booking.</em>
              </h2>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="text-body text-white/85 lg:text-[1.1875rem]">
                  Vi tjener når du får bookinger. Til annonsene anbefaler vi{" "}
                  {"10\u00a0000\u00a0kr"} i måneden, gjerne mer. Det gir nok data til å se
                  hvilke tilbud og annonser som fyller kalenderen.
                </p>
                <p className="mt-4 text-small text-mist">
                  Annonsebudsjettet kommer i tillegg og betales til Meta.
                </p>
                <Link href="#book" className={`${darkPrimary} mt-8`}>
                  Book et møte
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
