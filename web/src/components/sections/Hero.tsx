"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AdFanStatic } from "@/components/ads/AdStage";
import { ctaHref } from "@/lib/site";

// Innlasting som i Pallet Ross-videoen: overskriften kommer ord for ord
// (0,2–0,9 s) mens kortene stiger nedenfra (AdStage). Ingress 1,4 s, knapper
// 1,6 s. Samme props på server og klient, ellers hydration-feil.

const EASE = [0.22, 1, 0.36, 1] as const;
const headline = ["Skaler", "med", "overskudd."];
const emphasis = ["100 %", "resultatbasert."];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export function Hero() {
  return (
    <section
      id="top"
      className="container-rm flex min-h-svh flex-col items-center overflow-x-clip pt-28 pb-10 text-center lg:pt-28 lg:pb-16"
    >
      <h1 className="max-w-[18ch] lg:max-w-[20ch] text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1] font-bold tracking-[-0.03em]">
        {headline.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
          >
            {word}
            {"\u00a0"}
          </motion.span>
        ))}
        {/* «100 % resultatbasert.» i pop-farge, med understrek som tegner seg
            fra venstre etter at ordene har landet. */}
        <span className="relative inline-block">
          {emphasis.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (headline.length + i) * 0.08, ease: EASE }}
            >
              {word}
              {i < emphasis.length - 1 ? "\u00a0" : ""}
            </motion.span>
          ))}
          {/* Buet grønn strek som avdekkes fra venstre (clip, så kurven
              holder formen uansett bredde). */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-[-0.16em] left-0 block h-[0.18em] w-full"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
          >
            <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-full w-full overflow-visible text-pop">
              <path
                d="M1 7 C 25 1.5, 75 1.5, 99 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </motion.span>
        </span>
      </h1>

      <motion.p
        {...fade(1.4)}
        className="mt-6 max-w-[52ch] text-body text-fg-muted lg:text-[1.125rem]"
      >
        Vi planlegger og styrer annonsene på Meta og Google hver dag. Ingen
        oppstartskostnad og en prisløsning som er snill mot marginene dine.
      </motion.p>

      {/* Desktop: kortene ligger i det sticky laget (AdStage) og fyller
          dette rommet. Mobil/redusert bevegelse: statisk vifte i flyten. */}
      <motion.div {...fade(0.6)} className="mt-8 w-full lg:mt-0 lg:min-h-[160px] lg:flex-1">
        <div className="lg:hidden">
          <AdFanStatic />
        </div>
      </motion.div>

      <motion.div
        {...fade(1.6)}
        className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-auto"
      >
        <Button href={ctaHref}>Book gratis audit</Button>
        <Button href="/#audit" variant="secondary">
          Slik funker auditen
        </Button>
      </motion.div>
    </section>
  );
}
