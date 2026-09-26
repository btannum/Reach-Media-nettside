// Kundelogoer (SPEC.md §2.9). Monokrom hvit med alfa, laget av scripts/media.sh
// fra `Medier /Logoer/`. Vises dempet i hvile, full ved hover.
export type Client = {
  name: string;
  src?: string;
  width?: number;
  height?: number;
};

export const clients: Client[] = [
  { name: "Gorilla Games", src: "/media/logos/gorilla-games.png", width: 640, height: 345 },
  { name: "KLA Sport", src: "/media/logos/kla.png", width: 640, height: 360 },
  { name: "Spekebua", src: "/media/logos/spekebua.png", width: 640, height: 170 },
  { name: "Beeki", src: "/media/logos/beeki.png", width: 640, height: 193 },
  { name: "CarPlay Norge", src: "/media/logos/carplay.png", width: 640, height: 225 },
  { name: "Novito", src: "/media/logos/novito.png", width: 640, height: 213 },
];
