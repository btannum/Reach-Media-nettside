import { Reveal } from "@/components/Reveal";

// Fordelene med å sette bort kundeanskaffelsen (Bendik 2026-10-21).
const benefits = [
  {
    title: "Du slipper å tenke på det.",
    body: "Fra første annonse til booket time. Hva som trengs underveis, tilpasser vi til bedriften din.",
  },
  {
    title: "Folk som gjør dette hver dag.",
    body: "Vi lager og styrer annonser for bedrifter over hele Norge. Det vi lærer ett sted, tar vi med til deg.",
  },
  {
    title: "Du betaler oss per booking.",
    body: "Ikke for timeforbruk eller rapporter. Bare for bookingene.",
  },
  {
    title: "Faste folk.",
    body: "Du snakker med de samme menneskene hele veien, ikke en ny konsulent hver gang.",
  },
];

export function TjenesteFordeler() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-night-2">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-signal/20 blur-[140px]" />
      <div className="container-rm relative grid gap-12 py-24 lg:grid-cols-12 lg:gap-8 lg:py-36">
        <Reveal className="lg:col-span-5">
          <h2 className="text-headline lg:sticky lg:top-28">
            Mer tid til kundene. <em className="text-glow pr-[0.06em]">Mindre tid på markedsføring.</em>
          </h2>
        </Reveal>
        <ul className="lg:col-span-6 lg:col-start-7">
          {benefits.map((b, i) => (
            <li key={b.title} className="border-t border-line first:border-t-0 lg:first:border-t">
              <Reveal delay={i * 0.06} amount={0.3} className="grid gap-3 py-8 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span aria-hidden="true" className="mt-1.5 grid size-8 place-items-center rounded-full bg-signal/15 ring-1 ring-glow/40">
                  <span className="size-2 rounded-full bg-glow shadow-[0_0_12px_2px_rgba(96,165,250,0.8)]" />
                </span>
                <div>
                  <h3 className="font-serif text-[1.75rem] leading-[1.1]">{b.title}</h3>
                  <p className="mt-2 text-body text-mist">{b.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
