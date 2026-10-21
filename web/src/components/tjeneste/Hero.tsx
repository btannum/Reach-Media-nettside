"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Aurora, GlowCurve, GridFloor } from "@/components/brand/GlowCurve";
import { HeroWords } from "@/components/brand/HeroWords";
import { LogoMarquee } from "@/components/brand/LogoMarquee";
import { handleAnchorClick } from "@/lib/anchor";
import { tjenesteLogos } from "./logos";
import { darkGhost, darkPrimary } from "./styles";

const EASE = [0.22, 1, 0.36, 1] as const;


export function TjenesteHero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE } };

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Aurora />
      <GridFloor className="h-[42%]" />
      {/* Fast 2:1-flate, minst 900 px bred og festet til høyre: hele kurven og
          punktet vises på PC, og på mobil kuttes bare starten til venstre. */}
      <GlowCurve
        preserve="xMaxYMax meet"
        className="pointer-events-none absolute right-0 bottom-[9%] aspect-[2/1] w-[max(100%,900px)] max-h-[42%] sm:max-h-[78%]"
        delay={0.6}
      />

      <div className="container-rm relative flex flex-1 flex-col justify-center pt-32 pb-16 lg:pt-36">
        <motion.p {...fade(0.05)} className="text-label tracking-[0.1em] text-mist uppercase">
          For tjenestebedrifter
        </motion.p>
        <HeroWords
          className="mt-5 text-display"
          delay={0.15}
          lines={[{ words: ["Flere", "bookinger."] }, { words: ["Sterkere", "bunnlinje."], accent: [0, 1] }]}
        />
        <motion.p {...fade(0.75)} className="mt-7 max-w-[46ch] text-body text-mist lg:text-[1.1875rem]">
          Vi står for jobben med å skaffe nye kunder, fra første annonse til
          booket time. Du jobber med kundene og betaler oss per booking.
        </motion.p>
        <motion.div {...fade(0.9)} className="mt-9 flex flex-wrap gap-3">
          <Link href="#book" onClick={(e) => handleAnchorClick(e, "#book")} className={darkPrimary}>
            Book et møte
          </Link>
          <Link href="#resultater" onClick={(e) => handleAnchorClick(e, "#resultater")} className={darkGhost}>
            Se resultatene
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <div className="relative pb-10">
        <LogoMarquee logos={tjenesteLogos} label="Noen av bedriftene vi har jobbet med" />
      </div>
    </section>
  );
}
