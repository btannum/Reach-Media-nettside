"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// reducedMotion="user": Framer dropper transform-animasjoner når OS-et ber om
// redusert bevegelse. Opacity går fortsatt, så innhold aldri blir usynlig.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
