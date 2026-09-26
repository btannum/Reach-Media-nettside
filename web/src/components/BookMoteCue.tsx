"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Store nedpile på hver side av discovery-teksten / hilsen-kortet —
// signaliserer at kalenderen ligger litt lenger ned.

function DownArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 96"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 8 V 72"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 54 L 32 78 L 50 54"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SideCue({ side }: { side: "left" | "right" }) {
  const reduce = Boolean(useReducedMotion());
  const bounce = reduce
    ? {}
    : {
        animate: { y: [0, 10, 0] },
        transition: {
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: side === "right" ? 0.25 : 0,
        },
      };

  return (
    <div
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 text-signal lg:flex ${
        side === "left" ? "left-0 xl:left-2" : "right-0 xl:right-2"
      }`}
      aria-hidden="true"
    >
      <motion.div {...bounce}>
        <DownArrow className="h-20 w-14 text-signal xl:h-24 xl:w-16" />
      </motion.div>
      <p className="text-label font-semibold tracking-[0.18em] text-signal uppercase [writing-mode:vertical-rl]">
        Book møte
      </p>
    </div>
  );
}

export function BookMoteCue({ children }: { children: ReactNode }) {
  const reduce = Boolean(useReducedMotion());
  const bounce = reduce
    ? {}
    : {
        animate: { y: [0, 8, 0] },
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <div className="relative">
      <SideCue side="left" />
      <SideCue side="right" />

      <div className="relative z-10 px-0 lg:px-24 xl:px-28">{children}</div>

      {/* Mobil/tablet: én cue under kortet før kalenderen */}
      <div className="mt-8 flex flex-col items-center gap-2 text-signal lg:hidden" aria-hidden="true">
        <p className="text-label font-semibold tracking-[0.12em] uppercase">Book møte</p>
        <motion.div {...bounce}>
          <DownArrow className="h-14 w-10" />
        </motion.div>
      </div>
    </div>
  );
}
