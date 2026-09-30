import { AdStage } from "@/components/ads/AdStage";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Ugc } from "@/components/sections/Ugc";
import { Kundelogoer } from "@/components/sections/Kundelogoer";
import { Sammenligning } from "@/components/sections/Sammenligning";
import { AdsGallery } from "@/components/sections/AdsGallery";
import { Caser } from "@/components/sections/Caser";
import { AuditSteg } from "@/components/sections/AuditSteg";
import { Resultater } from "@/components/sections/Resultater";
import { Tjenester } from "@/components/sections/Tjenester";
import { Betalingsmodell } from "@/components/sections/Betalingsmodell";
import { Marquee } from "@/components/sections/Marquee";
import { ClosingCards } from "@/components/sections/ClosingCards";

// Forsiden etter Pallet Ross-strukturen (SPEC.md §2, tabellen).
// Seksjon 1–2 deler kort-koreografien i AdStage.
export default function Home() {
  return (
    <>
      <AdStage>
        <Hero />
        <Problem />
      </AdStage>
      <Kundelogoer />
      <Resultater />
      <Ugc />
      <Sammenligning />
      <AdsGallery />
      <Caser />
      <AuditSteg />
      <Tjenester />
      <Betalingsmodell />
      <Marquee />
      <ClosingCards />
    </>
  );
}
