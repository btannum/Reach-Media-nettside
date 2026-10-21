"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// Bevisst lite konkret om leveransen (Bendik 2026-10-20): vi tilpasser etter kunden.
const steps = [
  {
    title: "Kartlegging",
    body: "Vi går gjennom behandlingene, prisene og kundene dine, og finner ut hvorfor folk velger deg framfor stedet i nabogata.",
  },
  {
    title: "Tilbud og annonser",
    body: "Vi lager annonsene og sidene de leder til, bygget rundt tilbud folk har lyst til å booke.",
  },
  {
    title: "Booking",
    body: "Den som er interessert, kan booke time direkte. Vi kan også følge opp dem som ikke booker med en gang.",
  },
  {
    title: "Skalering",
    body: "Vi følger med på hva som gir bookinger, og flytter budsjettet dit de kommer fra.",
  },
];

export function SlikJobberVi() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  return (
    <section id="slik" className="relative border-t border-line bg-night-2">
      <div className="container-rm py-24 lg:py-36">
        <div className="max-w-2xl">
          <h2 className="text-headline">
            Slik jobber vi. <em className="text-glow pr-[0.06em]">Rundt bedriften din.</em>
          </h2>
          <p className="mt-6 text-body text-mist lg:text-[1.1875rem]">
            Rekkefølgen er den samme hver gang. Innholdet bygger vi rundt
            tilbudene og kundene dine.
          </p>
        </div>

        <ol ref={ref} className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-8">
          {/* Lyslinje som trekkes over stegene når de kommer i syne (desktop). */}
          <motion.span
            aria-hidden="true"
            className="absolute top-4 left-0 hidden h-px w-full origin-left bg-gradient-to-r from-signal via-glow to-glow-soft shadow-[0_0_12px_rgba(96,165,250,0.9)] lg:block"
            initial={reduce ? undefined : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative"
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative z-10 grid size-8 place-items-center rounded-full bg-night text-label text-white ring-1 ring-glow/60 tnum shadow-[0_0_18px_rgba(96,165,250,0.5)]">
                {i + 1}
              </span>
              <h3 className="mt-7 font-serif text-[1.875rem] leading-[1.1]">{s.title}</h3>
              <p className="mt-3 text-body text-mist">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
