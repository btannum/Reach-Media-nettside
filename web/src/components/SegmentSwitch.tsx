"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const segments = [
  { href: "/nettbutikk", label: "Nettbutikk", short: "Nettbutikk" },
  { href: "/tjenestebedrift", label: "Tjenestebedrift", short: "Tjeneste" },
] as const;

// Bryter mellom nettbutikk- og tjenestesiden i headeren (Bendik 2026-10-21).
export function SegmentSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pathname = usePathname();
  const dark = tone === "dark";

  return (
    <nav
      aria-label="Velg type bedrift"
      className={`flex shrink-0 rounded-full p-1 ${dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-veil ring-1 ring-hairline"}`}
    >
      {segments.map((s) => {
        const active = pathname.startsWith(s.href);
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-[0.875rem] font-medium leading-none transition-colors duration-[180ms] ease-state sm:px-4 sm:py-2 ${
              active
                ? dark
                  ? "bg-white text-night"
                  : "bg-fg text-white"
                : dark
                  ? "text-mist hover:text-white"
                  : "text-fg-muted hover:text-fg"
            }`}
          >
            <span className="sm:hidden">{s.short}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
