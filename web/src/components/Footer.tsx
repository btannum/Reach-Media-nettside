import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { navLinks, site } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.25" y="2.25" width="13.5" height="13.5" rx="4" />
      <circle cx="9" cy="9" r="3.25" />
      <circle cx="13" cy="5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M11.5 2.5h-1.75A2.75 2.75 0 0 0 7 5.25V7.5H5v2.75h2v5.25h2.75V10.25h2l.5-2.75h-2.5V5.75c0-.45.3-.75.75-.75h1.5z" />
    </svg>
  );
}

const iconBtn =
  "grid size-11 place-items-center rounded-full border border-hairline text-fg transition-colors duration-[180ms] ease-state hover:border-hairline-strong hover:bg-surface-2";

const link =
  "text-fg-muted transition-colors duration-[180ms] ease-state hover:text-fg";

// Seksjon 13. Som «Our platform, your art»: ett hvitt kort nederst på siden.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container-rm pb-6">
      <div className="rounded-lg bg-surface p-7 shadow-card lg:p-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark imgClassName="h-7 w-auto lg:h-9" />
            <p className="mt-6 text-title">Betalt annonsering for Shopify-butikker.</p>
            <p className="measure mt-3 text-small text-fg-muted">
              Vi planlegger og håndterer annonsene selv, og tar hovedsakelig
              betalt av omsetningen de gir.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={site.social.instagram} rel="noopener" aria-label="Reach Media på Instagram" className={iconBtn}>
                <InstagramIcon />
              </a>
              <a href={site.social.facebook} rel="noopener" aria-label="Reach Media på Facebook" className={iconBtn}>
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            <nav aria-label="Sider">
              <p className="text-small font-medium text-fg">Sider</p>
              <ul className="mt-3 flex flex-col gap-2.5 text-small">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-small font-medium text-fg">Kontakt</p>
              <ul className="mt-3 flex flex-col gap-2.5 text-small">
                <li>
                  <a href={`mailto:${site.contact.email}`} className={link}>
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a href={site.contact.phoneHref} className={link}>
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={site.social.instagram} rel="noopener" className={link}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={site.social.facebook} rel="noopener" className={link}>
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-small font-medium text-fg">Annet</p>
              <ul className="mt-3 flex flex-col gap-2.5 text-small">
                <li>
                  <Link href="/personvern" className={link}>
                    Personvern
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-1 border-t border-hairline pt-5 text-label text-fg-muted">
          <span>© {year} {site.name}</span>
          <span>Org.nr. {site.orgNr}</span>
        </p>
      </div>
    </footer>
  );
}
