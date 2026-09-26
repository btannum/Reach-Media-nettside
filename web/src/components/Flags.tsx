import type { Market } from "@/lib/projects";

// Flagg som inline-SVG, tegnet geometrisk. Byttes ut hvis Bendik leverer egne.
const names: Record<Market, string> = {
  no: "Norge",
  se: "Sverige",
  dk: "Danmark",
  uk: "Storbritannia",
};

function Nordic({ bg, cross, inner }: { bg: string; cross: string; inner?: string }) {
  return (
    <svg viewBox="0 0 22 16" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <rect width="22" height="16" fill={bg} />
      <path d="M0 8h22M8 0v16" stroke={cross} strokeWidth={inner ? 4 : 2.6} />
      {inner && <path d="M0 8h22M8 0v16" stroke={inner} strokeWidth={2} />}
    </svg>
  );
}

function UnionJack() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <clipPath id="uk-quarters">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-quarters)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function Flag({ market, className = "" }: { market: Market; className?: string }) {
  return (
    <span
      role="img"
      aria-label={names[market]}
      title={names[market]}
      className={`block overflow-hidden rounded-[6px] border border-black/8 shadow-[0_1px_2px_rgba(11,18,32,0.06),0_4px_12px_-4px_rgba(11,18,32,0.18)] ${className}`}
    >
      {market === "no" && <Nordic bg="#BA0C2F" cross="#fff" inner="#00205B" />}
      {market === "se" && <Nordic bg="#006AA7" cross="#FECC02" />}
      {market === "dk" && <Nordic bg="#C8102E" cross="#fff" />}
      {market === "uk" && <UnionJack />}
    </span>
  );
}

/** Norge → øvrige markeder, som ekspansjonsrad. */
export function MarketExpand({
  markets,
  size = "md",
  className = "",
}: {
  markets: Market[];
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [home, ...next] = markets;
  if (!home) return null;
  const flag =
    size === "lg" ? "h-10 w-[58px]" : size === "sm" ? "h-6 w-9" : "h-8 w-[46px]";
  const gap = size === "lg" ? "gap-2.5" : size === "sm" ? "gap-1.5" : "gap-2";
  const arrowW = size === "lg" ? 28 : size === "sm" ? 18 : 22;
  return (
    <div
      role="group"
      aria-label={`Fra ${names[home]} til ${next.map((m) => names[m]).join(", ")}`}
      className={`flex items-center ${gap} ${className}`}
    >
      <Flag market={home} className={flag} />
      {next.length > 0 && (
        <>
          <svg
            width={arrowW}
            height="12"
            viewBox="0 0 28 12"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-fg-muted"
          >
            <path d="M0 6h22M18 1.5 24.5 6 18 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className={`flex ${gap}`}>
            {next.map((m) => (
              <Flag key={m} market={m} className={flag} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { names as marketNames };
