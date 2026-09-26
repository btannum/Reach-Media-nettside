"use client";

import { useState } from "react";
import Image from "next/image";

// UGC-kort: poster + avspillingsknapp. Video lastes først ved klikk.
export function AdVideo({
  src,
  poster,
  alt,
  sizes,
}: {
  src: string;
  poster: string;
  alt: string;
  sizes: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Spill av video: ${alt}`}
      className="group absolute inset-0 cursor-pointer"
    >
      <Image src={poster} alt="" fill sizes={sizes} className="object-cover" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-12 place-items-center rounded-full bg-fg/80 text-white backdrop-blur-sm transition-colors duration-[180ms] ease-state group-hover:bg-signal">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
            <path d="M5 3.5v11l9-5.5-9-5.5z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
