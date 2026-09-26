"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// UGC-kort: poster + avspillingsknapp. Video lastes først ved klikk.
// Etter start: trykk hvor som helst på videoen for pause/fortsett (egne
// kontroller, fordi nettleserens er for små i smale kort). Bare én video
// spiller om gangen på siden.
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
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  // Pause denne når en annen video på siden starter.
  useEffect(() => {
    if (!started) return;
    const onOtherPlay = (e: Event) => {
      if (e.target !== ref.current && e.target instanceof HTMLVideoElement) ref.current?.pause();
    };
    document.addEventListener("play", onOtherPlay, true);
    return () => document.removeEventListener("play", onOtherPlay, true);
  }, [started]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const PlayIcon = (
    <span className="grid size-12 place-items-center rounded-full bg-fg/80 text-white backdrop-blur-sm transition-colors duration-[180ms] ease-state group-hover:bg-signal">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
        <path d="M5 3.5v11l9-5.5-9-5.5z" />
      </svg>
    </span>
  );

  if (started) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? `Fortsett video: ${alt}` : `Pause video: ${alt}`}
        className="group absolute inset-0 cursor-pointer bg-fg"
      >
        <video
          ref={ref}
          src={src}
          poster={poster}
          autoPlay
          playsInline
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onEnded={() => setPaused(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {paused && <span className="absolute inset-0 grid place-items-center">{PlayIcon}</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStarted(true)}
      aria-label={`Spill av video: ${alt}`}
      className="group absolute inset-0 cursor-pointer"
    >
      <Image src={poster} alt="" fill sizes={sizes} className="object-cover" />
      <span className="absolute inset-0 grid place-items-center">{PlayIcon}</span>
    </button>
  );
}
