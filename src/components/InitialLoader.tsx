"use client";

import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const STORAGE_KEY = "generos_initial_loader_shown";
export const LOADER_DONE_EVENT = "generos:loader-done";

export default function InitialLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) {
      window.dispatchEvent(new CustomEvent(LOADER_DONE_EVENT));
      return;
    }

    setMounted(true);
    setVisible(true);
    document.body.style.overflow = "hidden";

    const duration = Math.floor(Math.random() * 2001) + 4000;

    const exitTimer = setTimeout(() => {
      setExiting(true);
      window.dispatchEvent(new CustomEvent(LOADER_DONE_EVENT));
    }, duration);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, duration + 1200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden={exiting}
    >
      {/* Curtain panels — split open on exit */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-white/50 via-white/30 to-white/50 backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-[1100ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          exiting ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-white/50 via-white/30 to-white/50 backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-[1100ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          exiting ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Subtle white wash that fades out */}
      <div
        className={`absolute inset-0 bg-white/30 transition-opacity duration-700 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Soft expanding glow pulse on exit */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/40 blur-3xl transition-all duration-[1000ms] ease-out ${
          exiting
            ? "w-[1400px] h-[1400px] opacity-0"
            : "w-[400px] h-[400px] opacity-100"
        }`}
      />

      {/* Lottie — scales up & fades on exit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`relative w-64 h-64 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            exiting ? "scale-150 opacity-0 blur-xl" : "scale-100 opacity-100"
          }`}
        >
          <DotLottieReact
            src="https://lottie.host/c90ef101-b8d3-4fad-ba37-5c96048ad262/lki13GXY6r.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
