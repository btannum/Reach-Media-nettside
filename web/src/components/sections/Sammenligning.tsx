import { RevealWords } from "@/components/Reveal";

// Seksjon 6. Tabell (bruker 2026-09-25: «som du hadde før»). Ekte <table> på
// desktop, stablet per kriterium på mobil. Reach Media-kolonnen er tonet.

type Row = { criterion: string; rm: string; agency: string; freelance: string };

const columns = ["Reach Media", "Vanlig byrå", "Upwork / Fiverr"] as const;

const rows: Row[] = [
  {
    criterion: "Betaling",
    rm: "Hovedsakelig provisjon av omsetning, tilpasset marginene dine",
    agency: "Fast månedspris, ofte pluss prosent av spend",
    freelance: "Timepris eller fastpris per oppgave",
  },
  {
    criterion: "Hvem lager annonsene",
    rm: "Vi planlegger og håndterer. Faste grafiske designere, vant med norske merkevarer, produserer.",
    agency: "Ofte en ekstern produsent eller du selv",
    freelance: "Du må skaffe annonsene selv",
  },
  {
    criterion: "Hvem du snakker med",
    rm: "Bendik og Kevin: de samme som solgte, eier kontoen og følger deg opp",
    agency: "En account manager. Ofte en junior i kontoen etter salgsmøtet.",
    freelance: "Frilanseren, til de bytter prosjekt",
  },
  {
    criterion: "Annonser",
    rm: "Ferske annonser hver uke. Vi itererer på vinnere med nye varianter, og tester nye konsepter vi har troa på for merkevaren.",
    agency: "Få varianter per måned",
    freelance: "Én og én bestilling",
  },
  {
    criterion: "Oppfølging",
    rm: "Daglig i kontoen",
    agency: "Ukentlig eller ved rapport",
    freelance: "Når du sender melding",
  },
  {
    criterion: "Rapportering",
    rm: "Ukentlig rapport, månedlig møte",
    agency: "Månedlig PDF",
    freelance: "Uformelt",
  },
  {
    criterion: "Språk og marked",
    rm: "Norsk, norske kunder",
    agency: "Norsk",
    freelance: "Som regel engelsk. Kjenner ikke det norske markedet.",
  },
];

export function Sammenligning() {
  return (
    <section id="sammenligning" className="container-rm section-y">
      <div className="max-w-[720px]">
        <RevealWords text="Hvorfor ikke et stort byrå, eller en frilanser?" className="text-headline" />
        <p className="measure mt-6 text-body text-fg-muted">
          I et stort byrå møter du en partner i salgsmøtet og en junior etterpå.
          Hos oss er det de samme folkene hele veien.
        </p>
      </div>

      {/* Desktop: tabell i et hvitt kort. */}
      <div className="mt-12 hidden overflow-hidden rounded-md bg-surface shadow-card md:block">
        <table className="w-full border-collapse text-small">
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="w-[22%] px-5 py-4 text-left text-label font-medium text-fg-muted">
                Kriterium
              </th>
              {columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`px-5 py-4 text-left text-title text-[1.125rem] ${
                    i === 0 ? "bg-signal text-white" : "text-fg"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.criterion} className="border-b border-hairline last:border-b-0">
                <th scope="row" className="px-5 py-4 text-left align-top font-medium text-fg">
                  {r.criterion}
                </th>
                <td className="bg-signal/12 px-5 py-4 align-top font-medium text-fg">{r.rm}</td>
                <td className="px-5 py-4 align-top text-fg-muted">{r.agency}</td>
                <td className="px-5 py-4 align-top text-fg-muted">{r.freelance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil: stablet per kriterium. */}
      <dl className="mt-10 flex flex-col gap-6 md:hidden">
        {rows.map((r) => (
          <div key={r.criterion} className="rounded-md bg-surface p-5 shadow-card">
            <dt className="text-title text-[1.125rem]">{r.criterion}</dt>
            <dd className="mt-3 rounded-sm bg-signal px-3 py-2.5 text-white">
              <span className="block text-label text-white/80">Reach Media</span>
              <span className="block text-body">{r.rm}</span>
            </dd>
            <dd className="mt-2 px-3 py-1.5">
              <span className="block text-label text-fg-muted">Vanlig byrå</span>
              <span className="block text-small text-fg-muted">{r.agency}</span>
            </dd>
            <dd className="px-3 py-1.5">
              <span className="block text-label text-fg-muted">Upwork / Fiverr</span>
              <span className="block text-small text-fg-muted">{r.freelance}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
