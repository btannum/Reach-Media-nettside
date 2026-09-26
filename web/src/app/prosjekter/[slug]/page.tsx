import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { notFound } from "next/navigation";
import { AdCard } from "@/components/ads/AdCard";
import { MarketExpand } from "@/components/Flags";
import { Button } from "@/components/ui/Button";
import { getProject, projects } from "@/lib/projects";
import { ctaHref } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name}: ${p.headline}`, description: p.summary };
}

export default async function ProsjektPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <article className="container-rm section-y pt-32 lg:pt-40">
      <Link
        href="/prosjekter"
        className="text-small text-paper-muted transition-colors duration-[180ms] ease-state hover:text-paper"
      >
        Alle prosjekter
      </Link>

      <div className="grid-12 mt-6 gap-y-12">
        <header className="col-span-12 lg:col-span-7">
          <h1 className="text-headline">{p.headline}</h1>
          <p className="mt-3 text-small text-paper-muted">
            {p.name}. {p.category}
            {p.status ? `. ${p.status}` : ""}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5" aria-label="Nøkkeltall">
            {p.metrics.map((m) => (
              <li key={m.label}>
                <span className="block text-metric">{m.value}</span>
                <span className="mt-1 block text-label text-paper-muted">{m.label}</span>
              </li>
            ))}
          </ul>
          {p.markets && (
            <div className="mt-8">
              <MarketExpand markets={p.markets} size="md" />
            </div>
          )}
          {p.services && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Hva vi gjorde">
              {p.services.map((t) => (
                <li key={t} className="rounded-full bg-surface px-3.5 py-1.5 text-small text-fg shadow-card">
                  {t}
                </li>
              ))}
            </ul>
          )}
          <div className="measure mt-10 flex flex-col gap-5 text-body text-paper-muted">
            {p.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </header>

        {(p.cover || p.ads.length > 0) && (
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            {p.cover && (
              <div className="overflow-hidden rounded-md border border-hairline bg-surface shadow-card">
                <Image
                  src={p.cover.src}
                  alt={p.cover.alt}
                  width={p.cover.width}
                  height={p.cover.height}
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
            {p.ads.length > 0 && (
              <>
                <h2 className={`text-title ${p.cover ? "mt-8" : ""}`}>Annonsene</h2>
                <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
                  {p.ads.map((ad, i) => (
                    <li key={ad.id}>
                      <AdCard ad={ad} index={i} sizes="200px" interactive />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        )}
      </div>

      {p.beforeAfter && (
        <figure className="mt-16 lg:mx-auto lg:max-w-[1000px]">
          <BeforeAfter />
          <figcaption className="mt-6 text-small text-paper-muted">{p.beforeAfter.caption}</figcaption>
        </figure>
      )}

      <div className="mt-16 border-t border-hairline pt-10">
        <p className="text-title">Vil du vite hva vi ville gjort i din konto?</p>
        <div className="mt-5">
          <Button href={ctaHref}>Book gratis audit</Button>
        </div>
      </div>
    </article>
  );
}
