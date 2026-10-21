import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Reach Media-logoen. Lys tone: blå tekst. Mørk tone: hvit tekst (logo-dark.png).
// compact viser bare R-ikonet under sm, så headeren får plass til sidebryteren.
export function Wordmark({
  href = "/",
  tone = "light",
  compact = false,
  className = "",
  imgClassName = "h-6 w-auto",
}: {
  href?: string;
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
  /** Tailwind-klasser på selve bildet. Footer bruker større på desktop. */
  imgClassName?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${site.name}, til forsiden`}
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      {compact && (
        <Image src="/media/logo-mark.png" alt="" width={97} height={97} priority className="size-8 sm:hidden" />
      )}
      <Image
        src={tone === "dark" ? "/media/logo-dark.png" : "/media/logo.png"}
        alt=""
        width={384}
        height={97}
        priority
        className={`${compact ? "hidden sm:block" : ""} ${imgClassName}`}
      />
    </Link>
  );
}
