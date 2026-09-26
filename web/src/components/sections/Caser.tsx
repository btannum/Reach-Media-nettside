"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/projects";
import { MarketExpand } from "@/components/Flags";
import { clients } from "@/lib/clients";
import { RevealWords } from "@/components/Reveal";
import { AdCard } from "@/components/ads/AdCard";

// Seksjon 8, etter Pallet Ross «Every piece of art tells a story»: sentrert
// overskrift og fire like store kort: én rad på PC (får plass på én skjerm),
// 2×2 på nettbrett. Kort 1–3 er lenker til casene.

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
      className={`flex [&>*]:flex-1 ${className ?? ""}`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function KlaCard() {
  // De tre UGC-videoene side om side, spillbare, som i UGC-seksjonen.
  return (
    <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-md bg-surface shadow-card">
      {/* Samme 16:9-flate som Spekebua-bildet, i lys grå
          så kortene skilles fra hverandre. Samme hover-zoom som bildene. */}
      <div className="group/media grid aspect-[16/9] w-full place-items-center overflow-hidden bg-linear-to-b from-[#eceef1] to-[#dfe2e7]">
        <ul
          className="grid w-[86%] grid-cols-3 gap-2 transition-transform duration-[500ms] ease-reveal group-hover/media:scale-[1.02] sm:w-[80%] sm:gap-3"
          aria-label="UGC-videoer for KLA Sport"
        >
          {kla.ads.slice(0, 3).map((ad, i) => (
            <li key={ad.id}>
              <AdCard ad={ad} index={i} sizes="(min-width: 1280px) 90px, (min-width: 768px) 13vw, 26vw" interactive showKind={false} priority={false} />
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="/prosjekter/kla"
        aria-label={`${kla.name}: ${kla.headline}`}
        className="group flex flex-1 flex-col gap-2 px-5 pt-4 pb-5"
      >
        <div className="flex items-center justify-between gap-3">
          <ClientLogo name="KLA Sport" className="h-7" />
          <span className="inline-flex h-8 items-center rounded-full bg-fg px-3 text-[0.8125rem] font-bold text-white">
            14× ROAS
          </span>
        </div>
        <h3 className="mt-1 text-title text-fg">{kla.headline}</h3>
        <p className="text-small text-fg-muted">{kla.summary}</p>
        <span className={`${pill} mt-auto w-fit border border-hairline bg-surface text-fg group-hover:border-hairline-strong`}>
          Les casen
        </span>
      </Link>
    </div>
  );
}

function SpekebuaCard() {
  return (
    <Link
      href="/prosjekter/spekebua"
      aria-label={`${spekebua.name}: ${spekebua.headline}`}
      className="group flex min-h-[320px] flex-col overflow-hidden rounded-md bg-surface text-fg shadow-card"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
        <Image
          src="/proof/spekebua-case.webp"
          alt="Fire statiske annonser vi har laget for Spekebua"
          width={1600}
          height={901}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-[500ms] ease-reveal group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pt-4 pb-5">
        <div className="flex h-8 items-center">
          <ClientLogo name="Spekebua" className="h-7" />
        </div>
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
      className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-md bg-surface shadow-card"
    >
      <span className="absolute top-3 right-3 z-10 inline-flex h-8 items-center rounded-full border border-hairline bg-surface/95 px-3 text-label text-fg backdrop-blur-sm">
        {gorilla.status}
      </span>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-[500ms] ease-reveal group-hover:scale-[1.02]"
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 pt-4 pb-5">
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
    <div className="flex min-h-[320px] flex-col rounded-md bg-surface-2 p-5">
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
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
