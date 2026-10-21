import type React from "react";
import { TjenesteNav } from "@/components/tjeneste/Nav";
import { Footer } from "@/components/Footer";

// PARKERT 2026-10-21 (Bendik droppet valget mellom nettbutikk og tjeneste).
// _-mappen holder dette utenfor ruting. Flytt til app/tjenestebedrift for å ta i bruk igjen.
export default function TjenesteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-night text-white">
      <TjenesteNav />
      <main id="innhold" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
