const moves = [
  {
    title: "Nok nye konsepter hver uke.",
    body: "Vi planlegger nye annonser fortløpende, så kontoen ikke står stille mens du skalerer.",
  },
  {
    title: "Spend som følger dataen.",
    body: "Vi justerer budsjett fortløpende etter det som faktisk presterer, ikke etter magefølelse.",
  },
  {
    title: "Design og media buying i samme løp.",
    body: "Vi planlegger og produserer annonsene selv, koblet direkte til kontoen, så tempoet matcher det butikken trenger.",
  },
  {
    title: "Datadrevne beslutninger.",
    body: "Hypoteser og valg bygger på tall og på konsepter vi har testet på tvers av mange kunder, og som vi vet fungerer.",
  },
];

// Seksjon 2. Høyre halvdel holdes tom på desktop: der lander annonsene
// fra AdStage.
export function Problem() {
  return (
    <section
      id="problem"
      className="container-rm section-y lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-16"
    >
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="text-headline">
            Dette gjør vi for å lykkes med annonseringen.
          </h2>
          <p className="measure mt-4 text-body text-paper-muted">
            Skalering handler om tempo på kreativet, spend etter data, og
            beslutninger som bygger på det som faktisk har virket.
          </p>
          <ul className="mt-10 border-t border-hairline">
            {moves.map((item) => (
              <li key={item.title} className="border-b border-hairline py-5">
                <h3 className="text-title">{item.title}</h3>
                <p className="mt-1 text-body text-paper-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
