// Annonser. Alle er 9:16 (540×960 WebP, laget av scripts/media.sh fra
// `Medier /Ads skal brukes i nettsie/`). Metrikk-etikettene bruker kun tall fra
// proof-skjermbildene (PRODUCT.md).

export type AdKind = "Static" | "UGC";

export type Ad = {
  id: string;
  kind: AdKind;
  /** Bilde (eller poster for UGC) i public/. */
  src: string;
  /** MP4 i public/ for UGC. Spilles av ved klikk. */
  video?: string;
  /** Kort beskrivelse til alt-tekst. */
  alt: string;
  /** Metrikk-etikett som henger på kortet i koreografien. */
  badge?: string;
};

const s = (n: number, alt: string): Ad => ({
  id: `static-${String(n).padStart(2, "0")}`,
  kind: "Static",
  src: `/media/ads/static-${String(n).padStart(2, "0")}.webp`,
  alt,
});

const u = (n: number, alt: string): Ad => ({
  id: `ugc-${String(n).padStart(2, "0")}`,
  kind: "UGC",
  src: `/media/ads/ugc-${String(n).padStart(2, "0")}.webp`,
  video: `/media/ads/ugc-${String(n).padStart(2, "0")}.mp4`,
  alt,
});

/** Alle annonser, til galleriet. */
export const ads: Ad[] = [
  s(1, "CarPlay Norge: moderne CarPlay uten verkstedregning"),
  s(2, "Tropicos: 778 kr avslag på tre produkter"),
  s(3, "Tropicos: sitat fra sertifisert hudterapeut"),
  s(4, "BikePlay: så enkelt er det å sette på skjermen"),
  s(5, "Tropicos: RevitaLash, 8 uker"),
  s(6, "Beeki: kundeomtale om hudrutine"),
  s(7, "Beeki: under 0 grader, ny hudrutine"),
  s(8, "Tropicos: samme hårbotten, 2 minutter senere"),
  s(9, "Tropicos: mest solgt, Kérastase"),
  s(10, "Tropicos: mest solgt på Tropicos"),
  s(11, "Tropicos: sitat fra sertifisert frisør"),
  s(12, "Spekebua: gaven til den som har alt"),
  s(13, "CarPlay Norge: CarPlay på tilbud"),
  s(14, "Kundeomtale: har aldri ligget på noe så behagelig"),
  s(15, "Tropicos: fra krus til glans i én bevegelse"),
  s(16, "Tropicos: glansen alle spør om"),
  s(17, "Spekebua: norske smaker, ekte kvalitet"),
  s(19, "Beeki: sluttet å skjule de røde partiene"),
  s(20, "KLA: endelig trening uten frosne fingre"),
  s(21, "Spekebua: påskeegg som passer alle på lista"),
  s(22, "Spekebua: den perfekte løsningen til konfirmasjonen"),
  s(23, "Spekebua: alt du trenger til konfirmasjonen, koldtbord for 10–50"),
  s(24, "BikePlay: trådløs CarPlay til MC"),
  s(25, "BikePlay: helt suveren enhet, virker som det skal"),
  s(26, "CarPlay Norge: før og etter, ble som en ny bil innvendig"),
  u(1, "UGC: sammenligning"),
  u(2, "UGC: sammenligning, ny versjon"),
  u(3, "UGC: du vet du skulle hatt den"),
  u(4, "UGC: og de er like bra som de ser ut"),
  u(5, "UGC: Extreme Contact-hanskene"),
  u(6, "UGC: keeper viser Wave Contact-hanskene"),
  u(7, "UGC: intervju på banen"),
  u(8, "UGC: anmeldelse fra keeper"),
];

const byId = (id: string) => ads.find((a) => a.id === id)!;

/** Kortene i koreografien Hero → Problem → Løsning. Én per merke der mulig. */
export const deckAds: Ad[] = [
  { ...byId("static-24") },
  { ...byId("static-12"), badge: "15,5× ROAS" },
  { ...byId("static-14") },
  { ...byId("static-20"), badge: "1\u00a0073 kjøp" },
  { ...byId("static-26"), badge: "10,4 % konv.rate" },
  { ...byId("static-23") },
  { ...byId("static-21") },
  { ...byId("static-25") },
];
