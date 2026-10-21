import Image from "next/image";

type Logo = { name: string; src: string; width: number; height: number };

// Logoer i et rolig bånd som går sidelengs, hvite på mørk grunn.
// Listen dobles så båndet går sømløst rundt (rm-marquee flytter -50 %).
export function LogoMarquee({ logos, label }: { logos: readonly Logo[]; label: string }) {
  const row = [...logos, ...logos];
  return (
    <div>
      <p className="text-center text-label tracking-[0.08em] text-mist uppercase">{label}</p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="rm-marquee flex w-max items-center gap-14 sm:gap-20" aria-label={label}>
          {row.map((l, i) => (
            <li key={`${l.name}-${i}`} aria-hidden={i >= logos.length ? true : undefined} className="shrink-0">
              <Image
                src={l.src}
                alt={i >= logos.length ? "" : l.name}
                width={l.width}
                height={l.height}
                sizes="160px"
                className="h-10 w-auto max-w-[140px] object-contain opacity-60 [filter:brightness(0)_invert(1)] sm:h-12 sm:max-w-[160px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
