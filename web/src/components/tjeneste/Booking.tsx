import Image from "next/image";
import { BookingWidget } from "@/components/BookingWidget";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

const ul = "text-white underline decoration-white/30 underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus";

// Samme HighLevel-kalender som nettbutikk-siden (Bendik 2026-10-20).
export function TjenesteBooking() {
  return (
    <section id="book" className="relative border-t border-line bg-night-2">
      <div className="container-rm grid gap-10 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <Reveal className="lg:col-span-4">
          <h2 className="text-headline">Book et <em className="text-glow pr-[0.06em]">møte.</em></h2>
          <p className="mt-6 text-body text-mist">
            Velg et tidspunkt som passer. I samtalen blir vi kjent med bedriften
            og ser på hva som skal til for å få flere kunder i kalenderen.
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-body">
            <li className="flex items-center gap-2.5"><span className="size-1.5 rounded-full bg-glow" aria-hidden="true" />30 minutter på video</li>
            <li className="flex items-center gap-2.5"><span className="size-1.5 rounded-full bg-glow" aria-hidden="true" />Ingen forpliktelse, ingen kostnad</li>
          </ul>

          <div className="mt-10 flex items-center gap-4 border-t border-line pt-6">
            <Image
              src="/media/team/bendik.webp"
              alt="Bendik Tannum"
              width={128}
              height={128}
              className="size-14 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 text-small">
              <p className="font-medium text-white">{site.contact.name}</p>
              <p className="text-mist">Co-founder og kreativ strateg</p>
              <p className="mt-1 flex flex-wrap gap-x-3">
                <a href={`mailto:${site.contact.email}`} className={ul}>{site.contact.email}</a>
                <a href={site.contact.phoneHref} className={ul}>{site.contact.phone}</a>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8" amount={0.1}>
          <div className="rounded-md bg-surface p-3 text-fg shadow-[0_30px_80px_-30px_rgba(37,99,235,0.55)] sm:p-6">
            <BookingWidget />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
