"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  easeInOut,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type Easing,
  type MotionValue,
} from "framer-motion";
import { deckAds as ads } from "@/lib/ads";
import { AdBadge, AdCard } from "@/components/ads/AdCard";

/**
 * Scroll-koreografi over Hero → Problem (SPEC.md §2), etter Pallet Ross-videoen
 * sekund 3–8. Et sticky lag holder kortene i viewporten mens de to seksjonene
 * scroller forbi; ved slutten av Problem blir kortene med seksjonen ut.
 * Framdrift 0→1 = 100 vh scroll (Problem fyller viewporten ved 1):
 *   0.00–0.03  vifte under hero-overskriften
 *   0.03–0.25  samler seg til en liten bunke midt i bildet mens hero scroller ut
 *   0.35–0.60  bunken glir til høyre kolonne når Problem kommer inn
 *   0.60–0.97  vifter ut diagonalt nedover mot høyre, etikettene kommer tilbake
 *   1.00       det sticky laget slipper: kortene står i seksjonen og følger
 *              teksten videre opp, de henger ikke igjen på skjermen
 * Under lg og ved redusert bevegelse rendres en statisk vifte i Hero i stedet.
 *
 * Innlasting (videoen sekund 0–2.3): alle kortene kommer inn som én bunke
 * nedenfra, roterer seg på plass under overskriften, og vifter så ut til hver
 * sin posisjon. Etikettene popper inn til slutt. Innlastingen ligger som et
 * offset oppå scroll-verdiene, så scroll fungerer også midt i.
 */

const INTRO = {
  riseDelay: 0.3,
  riseDuration: 0.8,
  fanDelay: 1.05,
  fanDuration: 0.55,
  fanStagger: 0.05,
  badgeDelay: 2.0,
};

const N = ads.length;
const MID = (N - 1) / 2;
const KEYS = [0, 0.03, 0.25, 0.35, 0.6, 0.97, 1];
const EASE = { ease: easeInOut };

/**
 * Viften skaleres etter viewport-høyde så den ikke krasjer med ingress og
 * knapper på lave skjermer (1366×768): full størrelse fra 900 px, ned mot
 * 0,62 på 768.
 */
function fanScale(vh: number) {
  return Math.min(1, Math.max(0.62, (vh - 540) / 360));
}

function keyframes(i: number, hs = 1) {
  const d = i - MID;
  const fan = { x: d * 8.4 * hs, y: 67 + (1 - hs) * 3 + Math.abs(d) * 1.2, r: d * 6, s: hs };
  const stack = { x: 0, y: 56, r: d * 1.5, s: 0.62 };
  const right = { x: 26, y: 52, r: d * 1.5, s: 0.62 };
  const spread = { x: 15 + i * 4.6, y: 40 + i * 4.8, r: -8 + i * 3.2, s: 0.8 };
  const seq = <T,>(a: T, b: T, c: T, e: T) => [a, a, b, b, c, e, e];
  return {
    x: seq(fan.x, stack.x, right.x, spread.x),
    y: seq(fan.y, stack.y, right.y, spread.y),
    r: seq(fan.r, stack.r, right.r, spread.r),
    s: seq(fan.s, stack.s, right.s, spread.s),
  };
}

function DeckCard({
  index,
  progress,
  hs,
}: {
  index: number;
  progress: MotionValue<number>;
  hs: number;
}) {
  const k = keyframes(index, hs);
  const d = index - MID;
  const fan = { x: k.x[0], y: k.y[0], r: k.r[0] };
  // Startposisjon: samlet bunke under viewporten, skråstilt. Mellomposisjon:
  // bunken står rett under overskriften med lett helning, før den vifter ut.
  const ox = useMotionValue(-fan.x);
  const oy = useMotionValue(118 - fan.y);
  const or = useMotionValue(-22 - fan.r);
  const intro = useMotionValue(0);

  useEffect(() => {
    // Én keyframe-animasjon per verdi: to animate()-kall på samme MotionValue
    // avbryter hverandre, også med delay.
    const fanStart = INTRO.fanDelay + Math.abs(d) * INTRO.fanStagger;
    const total = fanStart + INTRO.fanDuration - INTRO.riseDelay;
    const t1 = INTRO.riseDuration / total;
    const t2 = (fanStart - INTRO.riseDelay) / total;
    const ease: Easing = [0.22, 1, 0.36, 1];
    const opts = {
      duration: total,
      delay: INTRO.riseDelay,
      times: [0, t1, t2, 1],
      ease: [ease, "linear", ease] as Easing[],
    };
    const controls = [
      animate(oy, [118 - fan.y, fan.y - 4 - fan.y, fan.y - 4 - fan.y, 0], opts),
      animate(or, [-22 - fan.r, 8 - fan.r, 8 - fan.r, 0], opts),
      animate(ox, [-fan.x, -fan.x, -fan.x, 0], opts),
      animate(intro, 1, { duration: 0.35, delay: INTRO.badgeDelay, ease }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [d, fan.x, fan.y, fan.r, ox, oy, or, intro]);

  const sx = useTransform(progress, KEYS, k.x, EASE);
  const sy = useTransform(progress, KEYS, k.y, EASE);
  const sr = useTransform(progress, KEYS, k.r, EASE);
  const s = useTransform(progress, KEYS, k.s, EASE);
  const x = useTransform([sx, ox], ([a, b]) => (a as number) + (b as number));
  const y = useTransform([sy, oy], ([a, b]) => (a as number) + (b as number));
  const r = useTransform([sr, or], ([a, b]) => (a as number) + (b as number));
  const scrollBadge = useTransform(progress, [0.01, 0.06, 0.88, 0.97], [1, 0, 0, 1]);
  const badge = useTransform([scrollBadge, intro], ([a, b]) => (a as number) * (b as number));
  const badgeScale = useTransform(intro, [0, 1], [0.7, 1]);
  const transform = useMotionTemplate`translate(-50%, -50%) translate(${x}vw, ${y}vh) rotate(${r}deg) scale(${s})`;
  const ad = ads[index];

  return (
    <motion.div
      className="absolute top-0 left-1/2 w-[156px] will-change-transform"
      style={{ transform, zIndex: index }}
    >
      <AdCard ad={ad} index={index} />
      {ad.badge && (
        <motion.div
          style={{ opacity: badge, scale: badgeScale }}
          className={`absolute ${index % 2 ? "-top-4 -right-6" : "-bottom-4 -left-6"}`}
        >
          <AdBadge label={ad.badge} />
        </motion.div>
      )}
    </motion.div>
  );
}

function Deck({ track }: { track: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const [hs, setHs] = useState(1);
  useEffect(() => {
    const update = () => setHs(fanScale(window.innerHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    // Overlegget dekker hele sporet; det sticky laget inni det kan aldri
    // henge lenger enn sporet (en negativ marg ga én skjermhøyde ekstra).
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <div className="sticky top-0 h-svh overflow-hidden">
        {ads.map((ad, i) => (
          <DeckCard key={ad.id} index={i} progress={scrollYProgress} hs={hs} />
        ))}
      </div>
    </div>
  );
}

/** Statisk vifte til mobil og redusert bevegelse. Ligger i flyten i Hero. */
export function AdFanStatic() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[280px] w-full max-w-[420px]"
    >
      {ads.map((ad, i) => {
        const d = i - MID;
        return (
          <div
            key={ad.id}
            className="absolute top-1/2 left-1/2 w-[104px] sm:w-[120px]"
            style={{
              zIndex: i,
              transform: `translate(-50%, -50%) translate(${d * 44}px, ${Math.abs(d) * 6}px) rotate(${d * 6}deg)`,
            }}
          >
            <AdCard ad={ad} index={i} />
          </div>
        );
      })}
    </div>
  );
}

export function useStaticDeck() {
  const [isStatic, setIsStatic] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 1023px), (prefers-reduced-motion: reduce)",
    );
    const update = () => setIsStatic(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isStatic;
}

export function AdStage({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const isStatic = useStaticDeck();
  return (
    <div ref={track} className="relative" data-static-deck={isStatic}>
      {!isStatic && <Deck track={track} />}
      {children}
    </div>
  );
}
