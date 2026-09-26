import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Hele Reach Media-logoen (blå på lys bakgrunn).
export function Wordmark({
  className = "",
  imgClassName = "h-6 w-auto",
}: {
  className?: string;
  /** Tailwind-klasser på selve bildet. Footer bruker større på desktop. */
  imgClassName?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, til forsiden`}
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/media/logo.png"
        alt=""
        width={384}
        height={97}
        priority
        className={imgClassName}
      />
    </Link>
  );
}
