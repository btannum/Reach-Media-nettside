import Image from "next/image";
import { Reveal, RevealWords } from "@/components/Reveal";
import { BookingWidget } from "@/components/BookingWidget";
import { BookMoteCue } from "@/components/BookMoteCue";
import { FaqList } from "@/components/sections/Faq";
import { site } from "@/lib/site";

// Portretter: legg filene i public/media/team/ (kvadratiske, minst 400 px)
// og sett `photo`. Til de kommer vises initialer. Sahil får Google-ikonet.
type Member = {
  name: string;
  role: string;
  line: string;
  photo?: string;
  /** Tailwind-klasser for utsnitt i den runde rammen. */
  zoom?: string;
  icon?: "google";
  linkedin?: string;
};

const team: Member[] = [
  {
    name: "Bendik Tannum",
    role: "Co-founder, kreativ strateg",
    line: "Research, briefer, strategi. Den du snakker med først.",
    photo: "/media/team/bendik.webp",
    linkedin: "https://www.linkedin.com/in/bendik-tannum-186b80215/",
  },
  {
    name: "Kevin Johansen Zeba",
    role: "Co-founder, media buyer",
    line: "Følger med på resultatene, analyserer dataen og gjør fortløpende tiltak for å prestere bedre.",
    photo: "/media/team/kevin.webp",
    linkedin: "https://www.linkedin.com/in/kevin-johansen-85111433b/",
  },
  {
    name: "Sahil",
    role: "Senior developer og Google-ekspert",
    line: "Google Ads, sporing og backend.",
    icon: "google",
  },
];

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1C3.2 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3c-.5-1.5-.5-3.1 0-4.6V6.6H1.2c-1.6 3.3-1.6 7.2 0 10.5l4.1-2.8z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.6l4.1 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function Avatar({ m }: { m: Member }) {
  const base = "grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2";
  if (m.photo) {
    return (
      <span className={base}>
        <Image src={m.photo} alt={m.name} width={128} height={128} className={`size-full object-cover ${m.zoom ?? ""}`} />
      </span>
    );
  }
  if (m.icon === "google") {
    return (
      <span className={base}>
        <GoogleMark />
      </span>
    );
  }
  const initials = m.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <span className={`${base} text-title text-fg-muted`} aria-hidden="true">
      {initials}
    </span>
  );
}

// Seksjon 12, del 2: Om oss, personlig hilsen + stor selfie, kalender, FAQ.
export function ClosingCards() {
  return (
    <>
      <section id="om-oss" className="container-rm section-y">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <RevealWords text="Du blir ikke sendt videre til en junior." className="text-headline" />
          </div>
          <p className="col-span-12 text-body text-fg-muted lg:col-span-6 lg:col-start-7">
            I et stort byrå møter du en partner i salgsmøtet og en junior
            etterpå. Hos oss eier Bendik og Kevin kontoen: de samme som solgte
            inn, og de du har fast kontakt med. Tett samarbeid, ikke en
            account manager du aldri snakker med. Vi planlegger og håndterer
            annonsene selv. Google-eksperten sitter hos oss. Produksjonen gjør
            vi med faste grafiske designere kjent med norske merkevarer. Norsk
            byrå, kun B2C-nettbutikker, kun betalt annonsering.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} amount={0.2}>
              <li className="flex h-full flex-col rounded-md bg-surface p-6 shadow-card lg:p-7">
                <Avatar m={p} />
                <p className="mt-5 text-title">{p.name}</p>
                <p className="mt-1 text-small text-fg-muted">{p.role}</p>
                <p className="mt-4 text-body text-fg">{p.line}</p>
                {p.linkedin ? (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} på LinkedIn`}
                    className="mt-5 inline-flex size-10 items-center justify-center rounded-full border border-hairline text-fg-muted transition-colors duration-[180ms] ease-state hover:border-hairline-strong hover:bg-surface-2 hover:text-fg"
                  >
                    <LinkedInIcon />
                  </a>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="gratis-audit" className="container-rm section-y">
        <BookMoteCue>
          <div className="mx-auto max-w-3xl text-center">
            <RevealWords text="Book en discovery call. Få auditen." className="text-headline" />
            <p className="measure mx-auto mt-6 text-body text-fg-muted">
              Velg et tidspunkt som passer. I samtalen blir vi kjent med
              butikken og målene, og avtaler lesetilgang til kontoene. Så gjør
              vi auditen.
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-small text-fg">
              {[
                "30 minutter på video",
                "Ingen forpliktelse, ingen kostnad",
                "Verdien du får er din uansett",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-signal" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Personlig hilsen-kort under booking-teksten: bilde + tekst side om side. */}
          <div
            id="kontakt"
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-5 rounded-md bg-surface p-4 shadow-card sm:mt-12 sm:flex-row sm:items-center sm:gap-7 sm:p-5 lg:p-6"
          >
            <figure className="mx-auto w-[148px] shrink-0 overflow-hidden rounded-sm bg-surface-2 sm:mx-0 sm:w-[168px] lg:w-[184px]">
              <Image
                src="/media/team/bendik-hilsen.webp"
                alt="Bendik Tannum"
                width={368}
                height={400}
                className="aspect-[5/6] h-auto w-full object-cover object-[50%_18%]"
                sizes="184px"
                priority={false}
              />
            </figure>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-title sm:text-[1.25rem] lg:text-[1.35rem]">
                Bendik hjelper deg gjerne.
              </p>
              <p className="mt-2 text-body text-fg-muted">
                Kontaktperson, kreativ strateg og co-founder.
              </p>
              <div className="mt-4 flex flex-col items-center gap-1.5 text-body sm:items-start">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="w-fit text-fg underline decoration-hairline-strong underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus"
                >
                  {site.contact.email}
                </a>
                <a
                  href={site.contact.phoneHref}
                  className="w-fit text-fg underline decoration-hairline-strong underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus"
                >
                  {site.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </BookMoteCue>

        <Reveal className="mt-8 lg:mt-12" amount={0.1}>
          <div className="rounded-md bg-surface p-3 shadow-card sm:p-6">
            <BookingWidget />
          </div>
        </Reveal>

        <div id="faq" className="mt-20 border-t border-hairline pt-16 lg:mt-28 lg:pt-20">
          <h3 className="text-headline">Vanlige spørsmål.</h3>
          <FaqList className="mt-8" />
        </div>
      </section>
    </>
  );
}
