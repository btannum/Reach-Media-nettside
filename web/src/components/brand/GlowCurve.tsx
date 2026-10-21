"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

// Glødende vekstkurve (inspirasjonsbilde 2, Bendik 2026-10-21): tegner seg fra
// venstre, et lys går langs streken, og punktet i enden pulserer.
const PATH =
  "M-40 520 C 80 522, 150 466, 250 468 C 350 470, 392 548, 482 546 C 576 544, 592 432, 668 424 C 742 416, 774 478, 852 468 C 958 454, 978 302, 1020 198 C 1048 130, 1068 98, 1098 88";
const END = { x: 1098, y: 88 };
const EASE = [0.65, 0, 0.35, 1] as const;

export function GlowCurve({
  className = "",
  delay = 0.3,
  preserve = "xMidYMax slice",
}: {
  className?: string;
  delay?: number;
  /** preserveAspectRatio: slice fyller flaten, meet viser hele kurven. */
  preserve?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduce = useReducedMotion();
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 2.6, delay, ease: EASE },
      };

  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio={preserve} className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`line-${id}`} x1="0" x2="1200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1d4ed8" stopOpacity="0" />
          <stop offset="0.3" stopColor="#2563eb" stopOpacity="0.75" />
          <stop offset="0.85" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#bfdbfe" />
        </linearGradient>
        <filter id={`blur-${id}`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="1600" height="1000">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <radialGradient id={`dot-${id}`}>
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#bfdbfe" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.path d={PATH} stroke={`url(#line-${id})`} strokeWidth="22" strokeLinecap="round" filter={`url(#blur-${id})`} opacity={0.75} {...draw} />
      <motion.path d={PATH} stroke={`url(#line-${id})`} strokeWidth="4.5" strokeLinecap="round" {...draw} />
      {!reduce && (
        <path d={PATH} pathLength={1} stroke="#e0f2fe" strokeWidth="3.5" strokeLinecap="round" className="rm-travel" />
      )}

      <motion.g
        initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: reduce ? 0 : delay + 2.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle cx={END.x} cy={END.y} r="15" fill="#60a5fa" className="rm-pulse" />
        <circle cx={END.x} cy={END.y} r="46" fill={`url(#dot-${id})`} opacity="0.55" />
        <circle cx={END.x} cy={END.y} r="11" fill={`url(#dot-${id})`} />
        <circle cx={END.x} cy={END.y} r="5.5" fill="#ffffff" />
      </motion.g>
    </svg>
  );
}

// Rutenett i perspektiv som sakte beveger seg mot betrakteren.
export function GridFloor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden [perspective:520px] ${className}`}>
      <div className="rm-grid absolute inset-x-[-60%] bottom-0 h-[220%] origin-bottom [transform:rotateX(64deg)] [mask-image:linear-gradient(to_top,black_0%,transparent_70%)]" />
    </div>
  );
}

// Myk lysflate bak innholdet, driver sakte.
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="rm-drift absolute top-[-30%] left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-signal/30 blur-[140px]" />
      <div className="rm-drift absolute right-[-10%] bottom-[-20%] h-[55%] w-[45%] rounded-full bg-glow/15 blur-[120px] [animation-delay:-9s]" />
    </div>
  );
}
