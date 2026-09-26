"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const update = useCallback(() => {
    const el = list.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
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
      <div className="mt-4 flex items-center justify-end gap-2">
        <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Forrige video" className={arrow}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Neste video" className={arrow}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
