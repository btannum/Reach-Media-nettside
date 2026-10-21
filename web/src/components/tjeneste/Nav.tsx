"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { SegmentSwitch } from "@/components/SegmentSwitch";
import { handleAnchorClick } from "@/lib/anchor";

export const tjenesteLinks = [
  { href: "#resultater", label: "Resultater" },
  { href: "#slik", label: "Slik jobber vi" },
  { href: "#pris", label: "Pris" },
] as const;

// Mørk meny for tjenestesiden: logo til startsiden, bryter mellom sidene,
// tre ankere og én knapp.
export function TjenesteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color] duration-200 ease-state ${
        scrolled ? "border-b border-line bg-night/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-rm flex h-full items-center justify-between gap-3">
        <div className="flex items-center gap-3 lg:gap-6">
          <Wordmark tone="dark" compact imgClassName="h-8 w-auto lg:h-10" />
          <SegmentSwitch tone="dark" />
        </div>
        <nav aria-label="Hovedmeny" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {tjenesteLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={(e) => handleAnchorClick(e, l.href)}
                  className="text-body text-mist transition-colors duration-[180ms] ease-state hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="#book"
          onClick={(e) => handleAnchorClick(e, "#book")}
          className="inline-flex h-10 shrink-0 items-center rounded-full bg-white px-4 text-[0.9375rem] font-medium text-night transition-colors duration-[180ms] ease-state hover:bg-glow-soft sm:h-11 sm:px-5"
        >
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Book et møte</span>
        </Link>
      </div>
    </header>
  );
}
