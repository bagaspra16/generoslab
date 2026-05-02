"use client";

import React, { useEffect, useState } from "react";
import { LOADER_DONE_EVENT } from "./InitialLoader";

const STORAGE_KEY = "generos_initial_loader_shown";

export default function ContentReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(STORAGE_KEY)) {
      setRevealed(true);
      return;
    }

    const onDone = () => setRevealed(true);
    window.addEventListener(LOADER_DONE_EVENT, onDone);
    return () => window.removeEventListener(LOADER_DONE_EVENT, onDone);
  }, []);

  return (
    <div
      className={`relative w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        revealed
          ? "opacity-100 scale-100 blur-0 translate-y-0"
          : "opacity-0 scale-[1.04] blur-md translate-y-4"
      }`}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </div>
  );
}
