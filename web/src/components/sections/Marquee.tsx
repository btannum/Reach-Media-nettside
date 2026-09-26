"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { RevealWords } from "@/components/Reveal";

// Tjenestene vi leverer (bruker 2026-09-26).
const services = [
  "Kreativ strategi",
  "Produksjon av ads",
  "Media buying",
  "Google-optimalisering",
  "Server-side tracking",
  "Shopify-utvikling",
  "CRO",
];

// Seksjon 12, del 1. Slankt blått bånd med tjenestene. Det ene blå båndet på
// siden (DESIGN.md: Én-flate-regelen). Stopper ikke ved hover.
export function Marquee() {
  const reduce = Boolean(useReducedMotion());
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Glir 40 px/s mot venstre; halve bredden er én hel runde med teksten.
  useAnimationFrame((_, delta) => {
    if (reduce || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    if (!half) return;
    let next = x.get() - (delta / 1000) * 40;
    if (next <= -half) next += half;
    x.set(next);
  });

  return (
    <section id="samarbeid" className="py-14 lg:py-20">
      <div className="container-rm">
        <div className="grid-12 gap-y-4 lg:items-end">
          <div className="col-span-12 lg:col-span-6">
            <RevealWords text="Alt du trenger, på ett sted." className="text-headline" />
          </div>
          <p className="col-span-12 text-body text-fg-muted lg:col-span-5 lg:col-start-8">
            Fra strategi og produksjon til media buying, sporing og butikk. Ett
            team, ingen mellomledd.
          </p>
        </div>
      </div>

      <div className="mt-8 px-6 lg:mt-10">
        <div
          className="flex h-16 items-center overflow-hidden rounded-full bg-signal-deep text-white sm:h-[72px]"
          aria-label={services.join(", ")}
        >
          <motion.div
            ref={trackRef}
            style={{ x: reduce ? 0 : x }}
            className="flex w-max items-center whitespace-nowrap text-[1.0625rem] font-medium sm:text-[1.25rem]"
            aria-hidden="true"
          >
            {[...services, ...services].map((s, i) => (
              <span key={`${s}-${i}`} className="flex items-center">
                <span className="px-6 sm:px-8">{s}</span>
                <span className="size-1.5 rounded-full bg-white/60" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
