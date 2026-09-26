"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ads, type Ad } from "@/lib/ads";
import { RevealWords } from "@/components/Reveal";

// Seksjon 7, etter Pallet Ross «You will find yourself among us»: to rader
// kvadratiske fliser som glir hver sin vei mens du scroller, overskrift i
// midten. Bryter containeren. UGC har egen seksjon.

const EASE = [0.22, 1, 0.36, 1] as const;
const statics = ads.filter((ad) => ad.kind === "Static");
const half = Math.ceil(statics.length / 2);
const rows = [statics.slice(0, half), statics.slice(half)];

// Deterministisk «tilfeldig» spredning, lik på server og klient.
function scatter(i: number) {
  const f = (n: number) => n - Math.floor(n);
  const a = f(Math.sin(i * 12.9898) * 43758.5453);
  const b = f(Math.sin(i * 78.233) * 43758.5453);
  // Hele tall, så server og klient serialiserer transformen likt.
  return {
    x: Math.round((a - 0.5) * 40),
    y: Math.round((b - 0.5) * 40),
    r: Math.round((f(a + b) - 0.5) * 12),
  };
}

function Tile({ ad, index, inView }: { ad: Ad; index: number; inView: boolean }) {
  const s = scatter(index);
  return (
    <motion.li
      className="aspect-[9/16] w-[96px] shrink-0 overflow-hidden rounded-sm bg-surface-2 shadow-card sm:w-[120px]"
      initial={{ opacity: 0, x: s.x, y: s.y, rotate: s.r }}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.03, ease: EASE }}
    >
      <Image
        src={ad.src}
        alt={ad.alt}
        width={540}
        height={960}
        sizes="120px"
        className="size-full object-cover"
      />
    </motion.li>
  );
}

export function AdsGallery() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shift = reduce ? 0 : 160;
  const x1 = useTransform(scrollYProgress, [0, 1], [shift, -shift]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-shift, shift]);

  return (
    <section id="annonser" ref={ref} className="section-y overflow-x-clip">
      {/* Radene sentreres om midten og er bredere enn viewporten. */}
      <div className="flex justify-center">
        <motion.ul
          aria-label="Statiske annonser, rad 1"
          style={{ x: x1 }}
          className="flex w-max gap-4"
        >
          {rows[0].map((ad, i) => (
            <Tile key={ad.id} ad={ad} index={i} inView={inView} />
          ))}
        </motion.ul>
      </div>

      <div className="container-rm my-12 text-center lg:my-16">
        <RevealWords
          text="Statiske annonser vi lager."
          className="mx-auto max-w-[16ch] text-headline"
        />
        <p className="mx-auto mt-4 max-w-[40ch] text-small text-fg-muted">
          Fra kontoer som kjører nå. Ingen konseptskisser.
        </p>
      </div>

      <div className="flex justify-center pl-[68px]">
        <motion.ul
          aria-label="Statiske annonser, rad 2"
          style={{ x: x2 }}
          className="flex w-max gap-4"
        >
          {rows[1].map((ad, i) => (
            <Tile key={ad.id} ad={ad} index={half + i} inView={inView} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
