import Image from "next/image";
import type { Ad } from "@/lib/ads";
import { AdVideo } from "@/components/ads/AdVideo";

// Kortet: 9:16, 16 px radius, hårlinje. Bredde settes av forelderen.
export function AdCard({
  ad,
  index,
  sizes = "240px",
  interactive = false,
  showKind = true,
  priority = index < 3,
}: {
  ad: Ad;
  index: number;
  sizes?: string;
  /** true i galleriet: UGC kan spilles av. false i koreografien (pointer-events av). */
  interactive?: boolean;
  /** Static/UGC-taggen. Av der overskriften allerede sier det. */
  showKind?: boolean;
  /** Forhåndslast bildet. Default de tre første; av under folden. */
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md border border-hairline bg-surface-2 shadow-card">
      {ad.video && interactive ? (
        <AdVideo src={ad.video} poster={ad.src} alt={ad.alt} sizes={sizes} />
      ) : (
        <Image
          src={ad.src}
          alt={ad.alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      )}
      {showKind && (
        <span className="pointer-events-none absolute top-3 left-3 rounded-xs bg-surface/85 px-2 py-1 text-label text-fg backdrop-blur-sm">
          {ad.kind}
        </span>
      )}
    </div>
  );
}

export function AdBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex h-8 items-center rounded-full bg-fg px-3 text-[0.8125rem] font-bold whitespace-nowrap text-white shadow-lift">
      {label}
    </span>
  );
}
