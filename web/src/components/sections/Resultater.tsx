"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { RevealWords } from "@/components/Reveal";

type Chip = {
  value: number;
  format: (n: number) => string;
  label: string;
  /** Bredde i ch så pillen ikke rister under count-up. */
  width: number;
};

type Proof = {
  id: string;
  title: string;
  src: string;
  width: number;
  height: number;
  chips: Chip[];
  caption?: string;
};

const nb = (n: number, digits: number) =>
  n.toLocaleString("nb-NO", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const meta: Proof = {
  id: "meta",
  title: "Meta Ads Manager",
  src: "/proof/meta-ads-manager.png",
  width: 1859,
  height: 847,
  chips: [
    { value: 15.51, format: (n) => n.toFixed(2), label: "ROAS", width: 5 },
    {
      value: 1073,
      format: (n) => Math.round(n).toLocaleString("nb-NO"),
      label: "kjøp",
      width: 5,
    },
    {
      value: 24.15,
      format: (n) => n.toFixed(2),
      label: "ROAS, beste annonsesett",
      width: 5,
    },
  ],
};

const google: Proof = {
  id: "google",
  title: "Google Ads",
  src: "/proof/google-ads-dashboard.jpeg",
  width: 1500,
  height: 582,
  chips: [
    { value: 10.41, format: (n) => `${nb(n, 2)} %`, label: "konverteringsrate", width: 7 },
    { value: 20.33, format: (n) => `${nb(n, 2)} kr`, label: "per konvertering", width: 8 },
  ],
  caption: "1,44 M i konverteringsverdi",
};

// Slik jobber vi (bruker 2026-09-30: generelt, ikke én kunde).
const tiltak = [
  "Nye konsepter og vinkler hver uke",
  "Mange annonser i test samtidig, så vinnerne dukker opp raskt",
  "Skalerer det som selger, og kutter det som ikke gjør det",
  "Riktig tracking i bunn, inkludert server-side",
];


// Markup er lik på server og klient (starter på 0); ved redusert bevegelse
// hoppes det rett til sluttverdien i effekten.
function CountUp({ chip, run, instant }: { chip: Chip; run: boolean; instant: boolean }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => chip.format(v));
  const [display, setDisplay] = useState(() => chip.format(0));

  useEffect(() => text.on("change", setDisplay), [text]);

  useEffect(() => {
    if (!run) return;
    if (instant) {
      mv.set(chip.value);
      return;
    }
    const controls = animate(mv, chip.value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [run, instant, mv, chip.value]);

  return <>{display}</>;
}

// Mørk pille som referansens @-badges: tall + etikett i én linje.
function MetricPill({ chip, run, instant }: { chip: Chip; run: boolean; instant: boolean }) {
  return (
    <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-hairline bg-surface px-3.5 text-[0.875rem] whitespace-nowrap shadow-card">
      <span className="tnum inline-block text-left font-bold text-pop-deep" style={{ minWidth: `${chip.width}ch` }}>
        <CountUp chip={chip} run={run} instant={instant} />
      </span>
      <span className="text-fg-muted">{chip.label}</span>
    </span>
  );
}

// Hjørner: øverst til høyre, nederst til venstre, nederst til høyre (tittelraden er øverst til venstre).
const slots = ["-top-4 -right-3", "-bottom-4 -left-3", "-right-3 -bottom-4"];

/** Svak svevebevegelse på rammene (bruker 2026-09-26). Av ved redusert bevegelse. */
const float = (delay: number, reduce: boolean) =>
  reduce
    ? {}
    : {
        animate: { y: [0, -8, 0] },
        transition: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" as const },
      };

function ProofCard({
  proof,
  run,
  instant,
  scale,
  className = "",
  floatDelay = 0,
}: {
  proof: Proof;
  run: boolean;
  instant: boolean;
  scale?: MotionValue<number>;
  className?: string;
  floatDelay?: number;
}) {
  return (
    <motion.figure
      style={scale ? { scale } : undefined}
      {...float(floatDelay, instant)}
      className={`relative ${className}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-md bg-surface shadow-proof">
        <div className="flex h-9 shrink-0 items-center gap-3 border-b border-hairline px-4">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2 rounded-full bg-hairline-strong" />
            <span className="size-2 rounded-full bg-hairline-strong" />
            <span className="size-2 rounded-full bg-hairline-strong" />
          </span>
          <span className="text-label text-fg-muted">{proof.title}</span>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center bg-surface-2">
          <Image
            src={proof.src}
            alt={`Skjermbilde fra ${proof.title} med resultater for en nettbutikk`}
            width={proof.width}
            height={proof.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>
        {proof.caption && (
          <figcaption className="shrink-0 border-t border-hairline px-4 py-2 text-label text-fg-muted">
            {proof.caption}
          </figcaption>
        )}
      </div>
      {/* Pillene henger på hjørnene utenfor rammen, ikke oppå tallene i bildet. */}
      {proof.chips.map((chip, i) => (
        <span key={chip.label} className={`absolute ${slots[i]}`}>
          <MetricPill chip={chip} run={run} instant={instant} />
        </span>
      ))}
    </motion.figure>
  );
}

// Seksjon: resultater vi har skapt, uten å navngi kunden.
// Meta-kortet vokser ut mens du scroller (som rutenettet i videoen).
export function Resultater() {
  const reduce = Boolean(useReducedMotion());
  const proofRef = useRef<HTMLDivElement>(null);
  const inView = useInView(proofRef, { once: true, amount: 0.35 });
  const { scrollYProgress } = useScroll({
    target: proofRef,
    offset: ["start 85%", "start 30%"],
  });
  const eased = useTransform(scrollYProgress, [0, 1], [0, 1], { ease: (t) => 1 - Math.pow(1 - t, 3) });
  const grow = useTransform(eased, [0, 1], [0.7, 1]);
  const scale = reduce ? undefined : grow;

  return (
    <section id="resultater" className="container-rm section-y overflow-x-clip">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="flex items-end gap-3">
            <RevealWords text="Resultatene snakker for seg selv." className="max-w-[11ch] text-headline" />
            {/* Pil mot skjermbildene: høyre på desktop, ned på mobil. */}
            <motion.span
              aria-hidden="true"
              className="mb-1 shrink-0 text-signal"
              animate={reduce ? undefined : { x: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" className="size-9 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </motion.span>
          </div>
          <p className="measure mt-6 text-body text-fg-muted">
            Tallene er hentet rett fra annonsekontoene vi styrer. Det som
            driver dem, er kreativt arbeid. Vi lager mange annonser, tester
            nye vinkler hele tiden og legger budsjettet bak det som selger.
          </p>

          <h3 className="mt-10 text-title">Slik gjør vi det</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {tiltak.map((t) => (
              <li key={t} className="flex items-start gap-3 text-body text-fg">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-signal" />
                {t}
              </li>
            ))}
          </ul>

        </div>

        <div ref={proofRef} className="col-span-12 flex flex-col gap-10 pt-4 lg:col-span-7 lg:gap-12 lg:pl-6">
          <ProofCard proof={meta} run={inView} instant={reduce} scale={scale} />
          <ProofCard proof={google} run={inView} instant={reduce} className="lg:ml-12" floatDelay={1.5} />
        </div>
      </div>
    </section>
  );
}
