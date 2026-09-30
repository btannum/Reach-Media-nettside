export const site = {
  name: "Reach Media",
  url: "https://www.reachmedia.no",
  email: "post@reachmedia.no",
  orgNr: "928 512 142",
  contact: {
    name: "Bendik Tannum",
    email: "bendik@reachmedia.no",
    phone: "45 86 26 46",
    phoneHref: "tel:+4745862646",
  },
  description:
    "Skaler Shopify-butikker med overskudd. Meta og Google Ads, 100 % resultatbasert. Vi planlegger og styrer annonsene selv.",
  social: {
    instagram: "https://www.instagram.com/reachmedia.no/",
    facebook: "https://www.facebook.com/reachmedia.no",
  },
} as const;

export const navLinks = [
  { href: "/#audit", label: "Slik funker auditen" },
  { href: "/#resultater", label: "Resultater" },
  { href: "/#om-oss", label: "Om oss" },
  { href: "/prosjekter", label: "Prosjekter" },
] as const;

export const ctaHref = "/#gratis-audit";
export const ctaLabel = "Book gratis audit";

// HighLevel-kalender for discovery call (Bendik 2026-09-26).
export const bookingUrl =
  "https://api.leadconnectorhq.com/widget/booking/VmE2AV3g23TVWSvtTRXj";
