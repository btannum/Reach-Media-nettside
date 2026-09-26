"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RevealWords } from "@/components/Reveal";
import { ctaHref } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

// Illustrasjoner: public/media/audit/<n>-<slug>.webp (kvadratiske, fra Bendik).
// Steg uten bilde viser tallet til bildet kommer.
const steps: { title: string; body: string; image?: string }[] = [
  {
    title: "Discovery call",
    body: "En kort videosamtale der vi blir kjent med butikken, målene og hva du bruker på annonser i dag.",
    image: "/media/audit/0-discovery-call.webp",
  },
  {
    title: "Lesetilgang",
    body: "Du legger oss til som analytiker i Meta Business Manager, Google Ads, eller begge. Vi kan ikke endre noe.",
    image: "/media/audit/1-lesetilgang.webp",
  },
  {
    title: "Ekspert-audit",
    body: "Vi går gjennom struktur, annonser, målgrupper, budsjettfordeling og sporing mot Shopify.",
    image: "/media/audit/2-ekspert-audit.webp",
  },
  {
    title: "Loom",
    body: "En videogjennomgang av det vi fant, inne i din konto, så du ser hva vi peker på. Prioritert: hva som lekker mest, og hva vi ville gjort først.",
    image: "/media/audit/3-loom.webp",
  },
  {
    title: "Gjennomgang",
    body: "Et møte der vi svarer på spørsmål og sier ærlig om vi tror vi kan flytte tallene dine.",
    image: "/media/audit/4-gjennomgang.webp",
  },
];

const TILE = 200;
const GAP = 24;

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-4 ${dir === "left" ? "rotate-180" : ""}`}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Seksjon 9. Som «Marketplace for Creativity»: tekst og piler til venstre,
// fliser som glir inn fra høyre. TODO: leveringstid (SPEC.md §7).
export function AuditSteg() {
  const rowRef = useRef<HTMLUListElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.3 });

  const scrollBy = (dir: -1 | 1) =>
    rowRef.current?.scrollBy({ left: dir * (TILE + GAP), behavior: "smooth" });

  return (
    <section id="audit" className="container-rm section-y">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <RevealWords
            text="Auditen: fem steg, ingen forpliktelse."
            className="text-headline"
          />
          <p className="measure mt-6 text-body text-fg-muted">
            Book en samtale, gi oss lesetilgang, så gjør vi resten.
            Gjennomgangen og videoen er dine uansett om vi jobber sammen
            etterpå.
          </p>
          <div className="mt-8">
            <Button href={ctaHref}>Book gratis audit</Button>
          </div>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Forrige steg"
              className="grid size-11 place-items-center rounded-full border border-hairline bg-surface text-fg transition-colors duration-[180ms] ease-state hover:border-hairline-strong hover:bg-surface-2"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Neste steg"
              className="grid size-11 place-items-center rounded-full border border-hairline bg-surface text-fg transition-colors duration-[180ms] ease-state hover:border-hairline-strong hover:bg-surface-2"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="relative">
            {/* Fade kun over bildeflaten (200px), ikke over tittel/tekst under. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 z-10 h-[200px] w-12 bg-gradient-to-l from-bg to-transparent"
            />
          <ul
            ref={rowRef}
            aria-label="Stegene i auditen"
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pe-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                className="w-[200px] shrink-0 snap-start"
                initial={{ opacity: 0, x: 80 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              >
                <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-md bg-surface-2 p-5">
                  {step.image ? (
                    <>
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                      <span className="relative z-10 inline-flex size-8 items-center justify-center rounded-full bg-surface text-small font-bold text-fg shadow-card tnum">
                        {i + 1}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="tnum text-metric text-fg">{i + 1}</span>
                      <h3 className="text-title text-fg">{step.title}</h3>
                    </>
                  )}
                </div>
                {step.image && <h3 className="mt-3 text-title text-fg">{step.title}</h3>}
                <p className={`${step.image ? "mt-1" : "mt-3"} text-small text-fg-muted`}>{step.body}</p>
              </motion.li>
            ))}
          </ul>
          </div>
          <p className="mt-3 flex items-center gap-2 text-small text-fg-muted">
            <motion.span
              aria-hidden="true"
              className="inline-flex"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Arrow dir="right" />
            </motion.span>
            Dra sidelengs, eller bruk pilene, for å se alle stegene.
          </p>
        </div>
      </div>
    </section>
  );
}
