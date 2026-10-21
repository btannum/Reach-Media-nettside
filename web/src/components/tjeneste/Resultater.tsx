"use client";

import Image from "next/image";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

// Wellmed Hudpleieklinikk (Bendik 2026-10-20). Tallene er lest av skjermbildene:
// 91 + 103 leads, 12 877 + 14 802 kr brukt, 142,68 kr per lead i snitt.
// «Titalls nye bookinger hver uke» er Bendiks ord om kundene generelt, ikke
// Wellmed-data og ikke et kundesitat. Derfor står det ikke i tallruten.
const metrics = [
  { to: 194, suffix: "", label: "leads fra to kampanjer" },
  { to: 143, suffix: " kr", label: "i snitt per lead" },
];

const proofs = [
  { src: "/proof/wellmed-microneedling.webp", width: 2676, height: 288, title: "Microneedling" },
  { src: "/proof/wellmed-rejuvenating.webp", width: 2134, height: 292, title: "Rejuvenating Needle" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tnum">
      {n}
      {suffix}
    </span>
  );
}

export function TjenesteResultater() {
  return (
    <section id="resultater" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-signal/20 blur-[150px]" />
      <div className="container-rm relative py-24 lg:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-headline">
            Titalls nye bookinger <em className="text-glow pr-[0.06em]">hver uke.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-body text-mist lg:text-[1.1875rem]">
            Så mye booker vi inn for kundene våre, uke for uke. Under ser du to
            av kampanjene for Wellmed Hudpleieklinikk, rett fra annonsekontoen.
          </p>
        </Reveal>

        <dl className="mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-md bg-line ring-1 ring-line sm:grid-cols-2 lg:mt-20">
          {metrics.map((m) => (
            <div key={m.label} className="bg-night/80 p-8 text-center backdrop-blur lg:p-10">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-serif text-[clamp(3.5rem,8vw,5.5rem)] leading-none">
                  <CountUp to={m.to} suffix={m.suffix} />
                </span>
                <span className="mt-3 block text-body text-mist">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4">
          {proofs.map((p) => (
            <Reveal key={p.src} amount={0.2}>
              <figure className="overflow-hidden rounded-md bg-white p-1.5 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.55)] ring-1 ring-white/10">
                {/* Skjermbildet er bredt: på mobil blar det sidelengs i stedet for å krympe. */}
                <div className="overflow-x-auto rounded-[14px]">
                  <Image
                    src={p.src}
                    alt={`Skjermbilde fra Meta Ads Manager: kampanjen ${p.title} for Wellmed Hudpleieklinikk`}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1100px) 1024px, 100vw"
                    className="h-auto w-full min-w-[760px]"
                  />
                </div>
              </figure>
            </Reveal>
          ))}
          <p className="text-center text-small text-mist md:hidden">Bla sidelengs for å se hele raden.</p>
        </div>
      </div>
    </section>
  );
}
