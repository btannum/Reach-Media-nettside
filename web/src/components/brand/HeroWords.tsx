"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Overskrift som kommer ord for ord ved innlasting. accent = indekser i linja
// som settes i kursiv serif med blå glød.
export function HeroWords({
  lines,
  as: Tag = "h1",
  className = "",
  delay = 0.15,
}: {
  lines: { words: string[]; accent?: number[] }[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const label = lines.map((l) => l.words.join(" ")).join(" ");
  let n = 0;

  return (
    <Tag className={className} aria-label={label}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.words.map((word, wi) => {
            const i = n++;
            const accent = line.accent?.includes(wi);
            return (
              <motion.span
                key={wi}
                className={`inline-block ${accent ? "text-glow pr-[0.06em] italic" : ""}`}
                initial={reduce ? undefined : { opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: delay + i * 0.09, ease: EASE }}
              >
                {word}
                {wi < line.words.length - 1 ? " " : ""}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
