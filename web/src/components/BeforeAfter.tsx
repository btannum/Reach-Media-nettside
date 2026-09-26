"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Fra gammel nettbutikk til Shopify (KLA). To nettleservinduer med luft
// mellom, en rett pil i gapet, og etiketter over. Vinduene svever svakt og
// reagerer på hover, som skjermbildene i Spekebua-casen.

function Browser({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-sm bg-surface ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-hairline bg-surface-2 px-3">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 h-2.5 flex-1 rounded-full bg-hairline" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 40vw, 90vw"
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}

function ShopifyMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M15.3 4.1c-.1-.1-.3-.1-.4-.1l-1.1-.1-.8-.8c-.8-.8-1.8-.9-2.7-.6-1.1.4-2 1.5-2.6 3l-2.3.7c-.4.1-.6.3-.7.7L3 19.6l11.6 2.2 4.8-1.2-2.9-15.5c0-.5-.4-1-1.2-1zm-3.9.6c.3-.1.6-.1.9 0l-1.6.5c.2-.2.4-.4.7-.5zm-1.2 1.2 1.9-.6c-.2.6-.4 1.2-.5 1.8l-2.2.7c.2-.7.5-1.4.8-1.9zM10 5.6c.4-1 .9-1.6 1.5-1.8-.4.5-.7 1.1-.9 1.6l-.6.2zm2.8 1.4c.1-.5.2-1 .4-1.4l1 .3-1.4 1.1z" />
    </svg>
  );
}

function OldLabel({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-surface font-medium text-fg ${
        small ? "h-8 px-3 text-label shadow-card" : "h-9 px-4 text-small shadow-lift"
      }`}
    >
      Fra gammel nettbutikk
    </span>
  );
}

function NewLabel({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-[#E3F5E8] font-medium text-[#0F7A3D] ${
        small ? "h-8 px-3 text-label shadow-card" : "h-9 px-4 text-small shadow-lift"
      }`}
    >
      <ShopifyMark />
      Til Shopify
    </span>
  );
}

export function BeforeAfter({ priority = false }: { priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = Boolean(useReducedMotion());
  const show = inView || reduce;

  const enter = (from: { x?: number; y?: number; scale?: number }, delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, ...from },
          animate: show ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined,
          transition: { duration: 0.7, delay, ease: EASE },
        };

  // Svak svevebevegelse, som skjermbildene i Spekebua-casen.
  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div>
      {/* Under sm: etikettene som en rad over, så de ikke kolliderer. */}
      <div className="mb-4 flex flex-wrap gap-2 sm:hidden">
        <OldLabel small />
        <NewLabel small />
      </div>

      <div ref={ref} className="relative isolate w-full" style={{ aspectRatio: "16 / 10" }}>
        {/* Gammel butikk, venstre. */}
        <motion.div {...enter({ x: -32 }, 0)} className="absolute top-[26%] left-0 z-0 w-[44%]">
          <motion.div {...float(0)}>
            <Browser
              src="/media/kla-old.webp"
              alt="KLA Sports gamle nettbutikk: produktliste med filter"
              width={708}
              height={474}
              className="shadow-card"
            />
          </motion.div>
        </motion.div>
        <motion.span
          {...enter({ y: 8, scale: 0.9 }, 0.35)}
          className="absolute top-[12%] left-[4%] z-10 hidden sm:block"
        >
          <OldLabel />
        </motion.span>

        {/* Rett pil i gapet mellom vinduene, tegnes inn. */}
        <svg
          viewBox="0 0 100 24"
          className="absolute top-[47%] left-[44%] z-20 w-[12%] text-signal"
          aria-hidden="true"
          fill="none"
        >
          <motion.path
            d="M8 12 H 88"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : show ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          />
          <motion.path
            d="M76 3 L 90 12 L 76 21"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, delay: 1.0, ease: EASE }}
          />
        </svg>

        {/* Ny Shopify-butikk, høyre, litt større. */}
        <motion.div {...enter({ x: 32 }, 0.2)} className="absolute top-[4%] right-0 z-10 w-[46%]">
          <motion.div {...float(1.2)}>
            <Browser
              src="/media/kla-new.webp"
              alt="KLA Sports nye Shopify-butikk: hero med keeperhansker og nye produkter"
              width={746}
              height={696}
              className="shadow-lift"
              priority={priority}
            />
          </motion.div>
        </motion.div>
        <motion.span
          {...enter({ y: 8, scale: 0.9 }, 0.55)}
          className="absolute top-[-2%] right-[4%] z-20 hidden sm:block"
        >
          <NewLabel />
        </motion.span>
      </div>
    </div>
  );
}
