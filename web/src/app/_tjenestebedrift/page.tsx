import type { Metadata } from "next";
import { TjenesteHero } from "@/components/tjeneste/Hero";
import { TjenesteProblem } from "@/components/tjeneste/Problem";
import { TjenesteFordeler } from "@/components/tjeneste/Fordeler";
import { TjenesteResultater } from "@/components/tjeneste/Resultater";
import { SlikJobberVi } from "@/components/tjeneste/SlikJobberVi";
import { TjenestePris } from "@/components/tjeneste/Pris";
import { TjenesteBooking } from "@/components/tjeneste/Booking";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} – Flere bookinger. Sterkere bunnlinje.` },
  description:
    "Vi tar oss av å skaffe nye kunder til tjenestebedrifter, fra annonsen til bookingen. Du bruker tiden på kundene, og betaler oss per booking.",
};

// Side for tjenestebedrifter (Bendik 2026-10-20/21). Mørk merkevareflate:
// hero med vekstkurve, innsikt, fordeler, resultater, slik jobber vi, pris, booking.
export default function Tjenestebedrift() {
  return (
    <>
      <TjenesteHero />
      <TjenesteProblem />
      <TjenesteFordeler />
      <TjenesteResultater />
      <SlikJobberVi />
      <TjenestePris />
      <TjenesteBooking />
    </>
  );
}
