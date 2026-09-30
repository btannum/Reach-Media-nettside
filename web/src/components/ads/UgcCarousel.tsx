"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Ad } from "@/lib/ads";
import { AdCard } from "@/components/ads/AdCard";

// Horisontal karusell for UGC-videoene: tre synlige på desktop, sveip på
// mobil. Pilene blar ett kort om gangen og slås av i endene.
// rows=2 (casesiden): to rader som blar sidelengs, to kolonner synlige.
export function UgcCarousel({
  ads,
  rows = 1,
  label = "UGC-videoer",
  sizes = "(min-width: 1024px) 220px, 200px",
}: {
  ads: Ad[];
  rows?: 1 | 2;
  label?: string;
  sizes?: string;
}) {
  const list = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = Boolean(useReducedMotion());

  const update = useCallback(() => {
    const el = list.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = list.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  const arrow = "grid size-11 place-items-center rounded-full border border-hairline bg-surface text-fg shadow-card transition-[opacity,border-color] duration-[180ms] ease-state hover:border-hairline-strong disabled:pointer-events-none disabled:opacity-35";
  // Neste-pilen er fylt blå så det er tydelig at det finnes flere videoer.
  const arrowNext = "grid size-12 place-items-center rounded-full bg-signal text-white shadow-lift transition-[opacity,transform] duration-[180ms] ease-state hover:scale-105 disabled:pointer-events-none disabled:bg-surface disabled:text-fg disabled:opacity-35 disabled:shadow-card";

  return (
    <div>
      <ul
        ref={list}
        onScroll={update}
        aria-label={label}
        className={
          rows === 2
            ? "grid snap-x snap-mandatory auto-cols-[calc((100%-1rem)/2)] grid-flow-col grid-rows-2 gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:auto-cols-[calc((100%-2rem)/3)] lg:auto-cols-[calc((100%-1rem)/2)] [&::-webkit-scrollbar]:hidden"
            : "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
        }
      >
        {ads.map((ad, i) => (
          <li
            key={ad.id}
            className={rows === 2 ? "min-w-0 snap-start" : "w-[200px] shrink-0 snap-start lg:w-[calc((100%-3rem)/3)]"}
          >
            <AdCard ad={ad} index={i} sizes={sizes} interactive priority={false} />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-4">
        {/* Sveip-hint + fremdriftslinje (bruker 2026-09-30: tydeligere at man kan bla). */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex shrink-0 items-center gap-2 text-small font-medium text-fg">
            <motion.svg
              viewBox="0 0 24 24"
              className="size-5 text-signal"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              animate={reduce || !atStart ? undefined : { x: [0, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0v3.5a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.6-2.1L4.2 14.6a1.5 1.5 0 0 1 2.3-1.9L9 15" />
            </motion.svg>
            <span className="lg:hidden">Sveip for flere</span>
            <span className="hidden lg:inline">Bla for flere</span>
          </span>
          <span aria-hidden="true" className="relative h-1 w-full max-w-40 overflow-hidden rounded-full bg-hairline">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-signal"
              style={{ width: `${Math.max(12, progress * 100)}%` }}
            />
          </span>
        </div>
        <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Forrige video" className={arrow}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <motion.button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Neste video"
          className={arrowNext}
          animate={reduce || !atStart ? undefined : { x: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
