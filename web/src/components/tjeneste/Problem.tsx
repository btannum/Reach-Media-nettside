import { Reveal } from "@/components/Reveal";

// Hvordan eieren tenker om nye kunder (Bendik 2026-10-21): ikke «poste virker
// ikke», men at det å skaffe kunder er en egen jobb som tar tid fra faget.
const points = [
  {
    title: "Kalenderen svinger.",
    body: "Full den ene uka, ledige timer den neste. Det er vanskelig å planlegge når nye kunder kommer i rykk og napp.",
  },
  {
    title: "Kundene sammenligner.",
    body: "Mange konkurrerer på pris, og folk sjekker flere steder før de booker. Den som er tydeligst og raskest, får timen.",
  },
  {
    title: "Likes fyller ikke kalenderen.",
    body: "Rekkevidde og visninger ser fine ut i innsikten. Det er bookingene som betaler regningene.",
  },
];

export function TjenesteProblem() {
  return (
    <section className="relative border-t border-line">
      <div className="container-rm py-24 lg:py-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <h2 className="text-headline">
              Du startet ikke bedriften for å <em className="text-glow pr-[0.06em]">drive markedsføring.</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.08}>
            <p className="text-body text-mist lg:text-[1.1875rem]">
              Du startet den for faget. Likevel går timene til innlegg, tilbud og
              annonser. Å skaffe nye kunder er en egen jobb, og den kan du sette
              bort.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-md bg-line ring-1 ring-line md:grid-cols-3 lg:mt-24">
          {points.map((p, i) => (
            <li key={p.title} className="bg-night">
              <Reveal delay={i * 0.08} amount={0.2} className="h-full p-7 lg:p-9">
                <span className="font-serif text-[1.125rem] text-glow italic">0{i + 1}</span>
                <h3 className="mt-6 font-serif text-[1.75rem] leading-[1.1]">{p.title}</h3>
                <p className="mt-3 text-body text-mist">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
