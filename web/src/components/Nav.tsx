"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/Wordmark";
import { ctaHref, ctaLabel, navLinks } from "@/lib/site";
import { handleAnchorClick } from "@/lib/anchor";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  // Kun rene ruter får aktiv tilstand; ankerlenker på forsiden ikke.
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color] duration-200 ease-state ${
        solid
          ? "border-b border-hairline bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-rm flex h-full items-center justify-between">
        <Wordmark imgClassName="h-8 w-auto lg:h-10" />

        <nav aria-label="Hovedmeny" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-body transition-colors duration-[180ms] ease-state hover:text-paper hover:underline hover:decoration-signal-focus ${
                    isActive(link.href)
                      ? "text-paper underline decoration-signal-focus underline-offset-[3px]"
                      : "text-paper-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Button href={ctaHref} size="sm" onClick={() => setOpen(false)}>
            <span className="sm:hidden">Gratis audit</span>
            <span className="hidden sm:inline">{ctaLabel}</span>
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className="h-11 rounded-sm px-2.5 text-[0.9375rem] font-medium text-paper transition-colors duration-[180ms] ease-state hover:bg-veil lg:hidden"
          >
            {open ? "Lukk" : "Meny"}
          </button>
        </div>
      </div>

    </header>

      {/* Mobilmenyen ligger utenfor <header>: backdrop-filter der lager et nytt
          containing block for fixed-elementer, og menyen ble 0 px høy. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id={menuId}
            aria-label="Mobilmeny"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-surface lg:hidden"
          >
            <ul className="container-rm flex flex-col py-6">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-hairline">
                  <Link
                    href={link.href}
                    onClick={(e) => { setOpen(false); handleAnchorClick(e, link.href); }}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block py-4 text-[1.375rem] font-medium tracking-[-0.01em] ${isActive(link.href) ? "text-paper underline decoration-signal-focus underline-offset-[6px]" : "text-paper"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
