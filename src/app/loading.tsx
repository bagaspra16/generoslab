"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/40 backdrop-blur-2xl backdrop-saturate-150" />
      <div className="absolute inset-0 bg-white/30" />
      <div className="relative w-64 h-64">
        <DotLottieReact
          src="https://lottie.host/c90ef101-b8d3-4fad-ba37-5c96048ad262/lki13GXY6r.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
