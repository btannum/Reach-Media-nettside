"use client";

import { useState } from "react";
import { bookingUrl } from "@/lib/site";

// HighLevel-kalenderen (discovery call) som iframe, med lenke ut som reserve.
// Skjemaet i GratisAudit.tsx er beholdt i koden, men brukes ikke lenger.
export function BookingWidget() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      {/* HighLevel sitt embed-script skjuler iframen til et handshake som ikke
          alltid kommer, så høyden settes fast: kalenderen er ca. 850 px høy på
          desktop og noe høyere på smale skjermer. */}
      <div className="relative h-[1040px] overflow-hidden rounded-sm bg-surface-2 sm:h-[800px]">
        {!loaded && (
          <p
            className="absolute inset-0 grid place-items-center text-small text-fg-muted"
            aria-live="polite"
          >
            Laster kalenderen …
          </p>
        )}
        <iframe
          src={bookingUrl}
          title="Book discovery call med Reach Media"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <p className="mt-3 px-1 text-small text-fg-muted">
        Vises ikke kalenderen?{" "}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener"
          className="text-fg underline decoration-hairline-strong underline-offset-[3px] transition-colors duration-[180ms] ease-state hover:decoration-signal-focus"
        >
          Åpne den i et nytt vindu
        </a>
        .
      </p>
    </div>
  );
}
