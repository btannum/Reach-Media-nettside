import type { Metadata } from "next";
import Link from "next/link";
import { AdCard } from "@/components/ads/AdCard";
import Image from "next/image";
import { MarketExpand } from "@/components/Flags";
import { Button } from "@/components/ui/Button";
import { otherClients, projects } from "@/lib/projects";
import { ctaHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prosjekter",
  description: "Nettbutikker Reach Media jobber med, og hva det ga.",
};

export default function ProsjekterPage() {
  return (
    <section className="container-rm section-y pt-32 lg:pt-40">
      <h1 className="text-headline">Prosjekter</h1>
      <p className="measure mt-6 text-body text-paper-muted">
        Butikker vi jobber med, og hva annonsene ga. Tallene er fra
        annonsekontoene.
      </p>

      <ul className="mt-12 border-t border-hairline">
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-hairline">
            <Link
              href={`/prosjekter/${p.slug}`}
              className="group grid gap-6 py-8 transition-colors duration-[180ms] ease-state lg:grid-cols-12 lg:gap-8 lg:py-10"
            >
              <div className="lg:col-span-4">
                <h2 className="text-title">{p.name}</h2>
                <p className="mt-1 text-small text-paper-muted">
                  {p.category}
                  {p.status ? `. ${p.status}` : ""}
                </p>

                {p.ads.length > 0 && (
                  <ul
                    aria-label={`Annonser fra ${p.name}`}
                    className="mt-6 grid grid-cols-3 gap-2 lg:grid-cols-3"
                  >
                    {p.ads.slice(0, 3).map((ad, i) => (
                      <li key={ad.id}>
                        <AdCard
                          ad={ad}
                          index={i}
                          sizes="120px"
                          showKind={false}
                          priority={false}
                        />
                      </li>
                    ))}
                  </ul>
                )}

                {p.cover && (
                  <div className="mt-6 overflow-hidden rounded-sm border border-hairline bg-surface shadow-card">
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      width={p.cover.width}
                      height={p.cover.height}
                      sizes="320px"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}

                {p.markets && (
                  <div className="mt-4">
                    <MarketExpand markets={p.markets} size="sm" />
                  </div>
                )}
              </div>

              <div className="lg:col-span-8">
                <p className="text-title font-medium text-paper">{p.headline}</p>
                <ul
                  className="mt-5 flex flex-wrap gap-x-10 gap-y-4"
                  aria-label="Nøkkeltall"
                >
                  {p.metrics.map((m) => (
                    <li key={m.label}>
                      <span className="block text-metric text-[2.25rem]">
                        {m.value}
                      </span>
                      <span className="mt-1 block text-label text-paper-muted">
                        {m.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="measure mt-4 text-body text-paper-muted">
                  {p.summary}
                </p>
                <span className="mt-4 inline-block text-small text-paper underline decoration-hairline-strong underline-offset-[3px] group-hover:decoration-signal-focus">
                  Les casen
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-small text-paper-muted">
        Jobber også med: {otherClients.map((c) => c.name).join(", ")}.
      </p>

      <div className="mt-12">
        <Button href={ctaHref}>Book gratis audit</Button>
      </div>
    </section>
  );
}
