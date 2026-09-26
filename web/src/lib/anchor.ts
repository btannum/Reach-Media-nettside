import type { MouseEvent } from "react";

/**
 * Klikk på anker-lenker («/#id» eller «#id») på samme side: scroll selv.
 * Next sin Link gjør ingenting når URL-en allerede har samme hash, så
 * «Book gratis audit» sluttet å virke etter første klikk. Denne scroller
 * alltid, og oppdaterer hash uten ny navigasjon.
 */
export function handleAnchorClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
  const m = href.match(/^\/?#(.+)$/);
  if (!m) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  if (window.location.pathname !== "/") return; // annen side: la Link navigere
  const el = document.getElementById(m[1]);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", `#${m[1]}`);
}
