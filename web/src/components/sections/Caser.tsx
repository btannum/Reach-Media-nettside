"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/projects";
import { MarketExpand } from "@/components/Flags";
import { clients } from "@/lib/clients";
import { RevealWords } from "@/components/Reveal";

// Seksjon 8, etter Pallet Ross «Every piece of art tells a story»: sentrert
// overskrift og 2×2 store kort. Kort 1–3 er lenker til casene.

// Kundelogo i kortet. Logofilene er hvite med alfa: inverteres på lyse kort.
function ClientLogo({ name, dark = false, className = "" }: { name: string; dark?: boolean; className?: string }) {
  const c = clients.find((x) => x.name === name);
  if (!c?.src) return <p className="text-small text-fg-muted">{name}</p>;
  return (
    <Image
      src={c.src}
      alt={name}
      width={c.width ?? 640}
      height={c.height ?? 200}
      className={`block max-w-[180px] self-start object-contain object-left ${dark ? "" : "[filter:invert(1)]"} ${className}`}
      style={{ width: "auto" }}
    />
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

const spekebua = projects.find((p) => p.slug === "spekebua")!;
const kla = projects.find((p) => p.slug === "kla")!;
const gorilla = projects.find((p) => p.slug === "gorilla-games")!;

const steps = [
  "Research",
  "Konsepter og annonser",
  "Lansering",
  "Daglig optimalisering",
  "Skalere vinnere",
  "Ukentlig rapport",
  "Månedlig møte",
];

const pill =
  "inline-flex h-9 items-center rounded-full px-4 text-small font-medium transition-colors duration-[180ms] ease-state";

function Rise({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function KlaCard() {
  const [playing, setPlaying] = useState(false);
  const video = kla.ads[0];
  return (
    <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-md bg-surface shadow-card">
      <Link
        href="/prosjekter/kla"
        aria-label={`${kla.name}: ${kla.headline}`}
        className="group flex flex-1 flex-col"
      >
        <div className="relative h-[260px]">
          {playing ? (
            <video
              src={video.video}
              poster={video.src}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full bg-fg object-contain"
              onClick={(e) => e.preventDefault()}
            />
          ) : (
            <div className="absolute inset-0">
              {kla.ads.map((ad, i) => {
                const d = i - 1;
                return (
                  <div
                    key={ad.id}
                    className="absolute top-[52px] left-1/2 w-[104px] transition-transform duration-[400ms] ease-reveal group-hover:-translate-y-2"
                    style={{
                      zIndex: i,
                      transform: `translateX(calc(-50% + ${d * 34}px)) rotate(${d * 8}deg)`,
                      transformOrigin: "50% 100%",
                    }}
                  >
                    <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-surface-2 shadow-card">
                      <Image src={ad.src} alt="" fill sizes="104px" className="object-cover" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <span className="absolute top-5 right-5 inline-flex h-8 items-center rounded-full bg-fg px-3 text-[0.8125rem] font-bold text-white shadow-lift">
            14× ROAS
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 px-6 pt-2 pb-6">
          <ClientLogo name="KLA Sport" className="h-7" />
          <h3 className="mt-1 text-title text-fg">{kla.headline}</h3>
          <p className="text-small text-fg-muted">{kla.summary}</p>
          <span className={`${pill} mt-auto w-fit border border-hairline bg-surface text-fg group-hover:border-hairline-strong`}>
            Les casen
          </span>
        </div>
      </Link>
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className={`${pill} absolute top-5 left-5 gap-2 border border-hairline bg-surface text-fg shadow-card hover:border-hairline-strong`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M4 2.5v9l7-4.5-7-4.5z" />
          </svg>
          Spill video
        </button>
      )}
    </div>
  );
}

function SpekebuaCard() {
  return (
    <Link
      href="/prosjekter/spekebua"
      aria-label={`${spekebua.name}: ${spekebua.headline}`}
      className="group flex min-h-[360px] flex-col overflow-hidden rounded-md bg-signal-soft text-fg ring-1 ring-signal/15 ring-inset"
    >
      <div className="relative h-[240px]">
        {spekebua.ads.slice(0, 3).map((ad, i) => {
          const d = i - 1;
          return (
            <div
              key={ad.id}
              className="absolute top-[36px] left-1/2 w-[112px] transition-transform duration-[400ms] ease-reveal group-hover:-translate-y-2"
              style={{
                zIndex: i,
                transform: `translateX(calc(-50% + ${d * 96}px)) rotate(${d * 8}deg)`,
                transformOrigin: "50% 100%",
              }}
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-surface-2 shadow-lift">
                <Image src={ad.src} alt="" fill sizes="112px" className="object-cover" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-6 pt-4 pb-6">
        <ClientLogo name="Spekebua" className="h-7" />
        <h3 className="mt-1 text-title text-fg">{spekebua.headline}</h3>
        <p className="text-small text-fg-muted">{spekebua.summary}</p>
        <span className={`${pill} mt-auto w-fit border border-hairline bg-surface text-fg group-hover:border-hairline-strong`}>Les casen</span>
      </div>
    </Link>
  );
}

function GorillaCard() {
  const cover = gorilla.cover!;
  return (
    <Link
      href="/prosjekter/gorilla-games"
      aria-label={`${gorilla.name}: ${gorilla.headline}`}
      className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-md bg-surface shadow-card"
    >
      <span className="absolute top-5 right-5 z-10 inline-flex h-8 items-center rounded-full border border-hairline bg-surface/95 px-3 text-label text-fg backdrop-blur-sm">
        {gorilla.status}
      </span>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-[500ms] ease-reveal group-hover:scale-[1.02]"
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pt-5 pb-6">
        <MarketExpand markets={gorilla.markets!} size="md" />
        <h3 className="text-title text-fg">{gorilla.headline}</h3>
        <p className="text-small text-fg-muted">{gorilla.summary}</p>
        <span className={`${pill} mt-auto w-fit border border-hairline bg-surface text-fg group-hover:border-hairline-strong`}>
          Les casen
        </span>
      </div>
    </Link>
  );
}

function SamarbeidCard() {
  return (
    <div className="flex min-h-[360px] flex-col rounded-md bg-surface-2 p-6">
      <h3 className="text-title text-fg">Slik ser et samarbeid ut.</h3>
      <ol className="relative mt-5 flex flex-1 flex-col justify-between border-l border-hairline-strong pl-5">
        {steps.map((step) => (
          <li key={step} className="relative flex items-baseline gap-3 py-1">
            <span
              aria-hidden="true"
              className="absolute top-1/2 -left-[25px] size-[9px] -translate-y-1/2 rounded-full bg-fg"
            />
            <span className="text-body text-fg">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Caser() {
  return (
    <section id="caser" className="container-rm section-y">
      <RevealWords
        text="Noen spennende prosjekter."
        className="mx-auto max-w-[16ch] text-center text-headline"
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Rise delay={0}>
          <KlaCard />
        </Rise>
        <Rise delay={0.1}>
          <SpekebuaCard />
        </Rise>
        <Rise delay={0.05}>
          <GorillaCard />
        </Rise>
        <Rise delay={0.15}>
          <SamarbeidCard />
        </Rise>
      </div>
    </section>
  );
}
