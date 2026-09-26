"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RevealWords } from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

// Ingen satser på siden (PRODUCT.md). «Ingen bindingstid. Tre
// måneders oppsigelse.» oppdatert Bendik 2026-09-26.
const models = [
  {
    title: "Fastpris",
    body: "Fast månedspris. Forutsigbart for deg, mindre oppside for oss.",
    highlight: false,
    rotate: -8,
    x: -190,
  },
  {
    title: "Provisjon",
    body: "Hovedmodellen. Prosent av omsetningen annonsene gir. Vi tjener når du tjener.",
    highlight: true,
    rotate: 0,
    x: 0,
  },
  {
    title: "Hybrid",
    body: "Lav fastpris i bunn og provisjon på toppen. For lave marginer eller oppstart.",
    highlight: false,
    rotate: 8,
    x: 190,
  },
];

const note = "Ingen bindingstid. Tre måneders oppsigelse.";

function Card({ m }: { m: (typeof models)[number] }) {
  return (
    <div
      className={`flex h-full flex-col justify-between rounded-md p-6 shadow-card ${
        m.highlight ? "bg-signal text-white" : "bg-surface text-fg"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-title">{m.title}</h3>
          {m.highlight && (
            <span className="rounded-full bg-white px-2.5 py-0.5 text-label text-signal">
              Vanligst
            </span>
          )}
        </div>
        <p className={`mt-4 text-body ${m.highlight ? "text-white/85" : "text-fg-muted"}`}>
          {m.body}
        </p>
      </div>
      <p className={`text-small ${m.highlight ? "text-white/75" : "text-fg-muted"}`}>{note}</p>
    </div>
  );
}

// Seksjon 11. Som «Membership»: tekst til venstre, tre viftede kort til høyre.
export function Betalingsmodell() {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.5 });

  return (
    <section id="betaling" className="container-rm section-y">
      <div className="grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <span aria-hidden="true" className="mb-5 block size-3 rounded-full bg-signal" />
          <RevealWords text="Betaling som følger resultatene." className="text-headline" />
          <p className="measure mt-6 text-body text-fg-muted">
            Hovedvekten ligger på provisjon av omsetningen annonsene gir. Alle
            nettbutikker har ulike marginer og behov, så vi tilpasser modellen:
            provisjon, fastpris eller hybrid.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          {/* Desktop: vifte fra stablet. */}
          <div ref={stageRef} className="relative mx-auto hidden h-[360px] w-[680px] lg:block">
            {models.map((m, i) => (
              <motion.div
                key={m.title}
                className="absolute top-1/2 left-1/2 h-[300px] w-[240px]"
                style={{ zIndex: m.highlight ? 3 : 1, translateX: "-50%", translateY: "-50%" }}
                initial={{ x: 0, rotate: 0, y: 0 }}
                animate={
                  inView
                    ? { x: m.x, rotate: m.rotate, y: m.highlight ? -16 : 0 }
                    : undefined
                }
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              >
                <Card m={m} />
              </motion.div>
            ))}
          </div>
          {/* Mobil: stablet, ingen rotasjon. */}
          <ul className="flex flex-col gap-4 lg:hidden">
            {models.map((m) => (
              <li key={m.title} className="min-h-[200px]">
                <Card m={m} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
