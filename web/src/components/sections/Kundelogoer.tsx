"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { clients } from "@/lib/clients";
import { RevealWords } from "@/components/Reveal";

// Editorial colophon + uendelig logo-karusell (looper uten gap).

const EASE = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { name: "Spekebua", line: "+2 mill på ett år. Samme lønnsomhet.", href: "/prosjekter/spekebua" },
  { name: "KLA Sport", line: "Doblet med samme budsjett", href: "/prosjekter/kla" },
  {
    name: "Gorilla Games",
    line: "Norge til SE, DK og UK",
    href: "/prosjekter/gorilla-games",
  },
];

function LogoMark({
  client,
}: {
  client: (typeof clients)[number];
}) {
  if (!client.src) {
    return <span className="text-small text-fg-muted">{client.name}</span>;
  }
  return (
    <Image
      src={client.src}
      alt={client.name}
      width={client.width ?? 160}
      height={client.height ?? 48}
      className="h-8 w-auto max-w-[150px] object-contain [filter:brightness(0)] sm:h-9 sm:max-w-[170px]"
      draggable={false}
    />
  );
}

function LogoRow({
  segmentRef,
}: {
  segmentRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={segmentRef}
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5"
    >
      {clients.map((client) => (
        <div
          key={client.name}
          className="flex h-20 shrink-0 items-center justify-center rounded-md bg-surface px-8 shadow-card ring-1 ring-signal/20 ring-inset sm:h-24 sm:px-10"
        >
          <LogoMark client={client} />
        </div>
      ))}
    </div>
  );
}

function LogoCarousel() {
  const reduce = Boolean(useReducedMotion());
  const segmentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Looper på bredden av ÉN rad (ikke hele track/2), så det ikke blir gap.
  useAnimationFrame((_, delta) => {
    if (reduce || !segmentRef.current) return;
    const width = segmentRef.current.offsetWidth;
    if (!width) return;
    let next = x.get() - (delta / 1000) * 36;
    while (next <= -width) next += width;
    x.set(next);
  });

  const names = clients.map((c) => c.name).join(", ");

  return (
    <div className="mt-12 lg:mt-16">
      <div className="relative overflow-hidden py-2" aria-label={names}>
        <motion.div
          style={{ x: reduce ? 0 : x }}
          className="flex w-max items-center"
          aria-hidden="true"
        >
          {/* Tre identiske rader: alltid bredere enn viewport, sømløs wrap. */}
          <LogoRow segmentRef={segmentRef} />
          <LogoRow />
          <LogoRow />
        </motion.div>

        <ul className="sr-only">
          {clients.map((c) => (
            <li key={c.name}>{c.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Kundelogoer() {
  return (
    <section id="kunder" className="py-16 lg:py-24">
      <div className="container-rm">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-label text-fg-muted">Kunder</p>
            <RevealWords
              text="Noen av kundene våre."
              className="mt-3 max-w-[12ch] text-headline"
            />
            <p className="mt-4 max-w-[32ch] text-body text-fg-muted">
              Shopify-butikker på Meta og Google. Samme daglige oppfølging, ulike
              bransjer.
            </p>
            <Link
              href="/prosjekter"
              className="group mt-6 inline-flex items-center gap-2 text-small font-medium text-fg underline decoration-hairline underline-offset-[5px] transition-colors duration-[180ms] ease-state hover:decoration-signal"
            >
              Se noen av prosjektene våre
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-[180ms] ease-state group-hover:translate-x-0.5"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <ul
            aria-label="Tre av casene"
            className="flex flex-col gap-4 border-t border-hairline pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
          >
            {highlights.map((h, i) => (
              <motion.li
                key={h.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              >
                <Link
                  href={h.href}
                  className="group flex items-baseline justify-between gap-4 border-b border-hairline pb-4 transition-colors duration-[180ms] ease-state last:border-b-0 last:pb-0"
                >
                  <span className="text-small font-medium text-fg group-hover:text-signal">
                    {h.name}
                  </span>
                  <span className="text-right text-small text-fg-muted group-hover:text-fg">
                    {h.line}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <LogoCarousel />
    </section>
  );
}
