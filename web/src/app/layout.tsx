import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Skaler med overskudd. 100 % resultatbasert`,
    template: `%s – ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: site.name,
    url: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f5f7",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nb"
      data-scroll-behavior="smooth"
      className={`${schibsted.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#innhold"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-signal focus:px-4 focus:py-2 focus:text-paper"
        >
          Hopp til innhold
        </a>
        <MotionProvider>
          <Nav />
          <main id="innhold" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
