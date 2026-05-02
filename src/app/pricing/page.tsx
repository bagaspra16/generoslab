"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const currencies = [
  { text: "$0", font: "font-sans" },
  { text: "€0", font: "font-serif italic" },
  { text: "£0", font: "font-mono tracking-tight" },
  { text: "¥0", font: "font-sans font-light" },
  { text: "Rp0", font: "font-serif font-bold" },
  { text: "₩0", font: "font-mono" },
];

export default function PricingPage() {
  const [currencyIndex, setCurrencyIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrencyIndex((prev) => (prev + 1) % currencies.length);
    }, 350); // ganti setiap 0.35 detik (lebih stabil)
    return () => clearInterval(timer);
  }, []);

  const current = currencies[currencyIndex];

  return (
    <main className="h-screen w-full overflow-hidden bg-white">
      <Navbar />

      {/* Landscape Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none">
        <div className="relative w-full h-full">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFqdmRrazFiZHFmdHlldmEwZjAyeTF5bHJ0a3hzZ28xdW1lOGR3dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j3OL6mSc2FeV0UHMDg/giphy.gif"
            alt="Animated Background"
            className="w-full h-full object-cover object-bottom opacity-80"
          />
        </div>
      </div>

      {/* Centered Content */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center z-10 px-4 overflow-y-auto overflow-x-hidden pt-24 pb-28 md:py-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-[2rem] p-12 md:p-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/40 border border-white/50 text-gray-800 text-sm font-medium mb-6"
          >
            Pricing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-gray-900 mb-6 tracking-tight flex items-center justify-center min-h-[1.5em]"
          >
            <div className="w-[120px] md:w-[160px] flex justify-end">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.text}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                  transition={{ duration: 0.1 }}
                  className={`inline-block animate-magic-colors drop-shadow-md ${current.font}`}
                >
                  {current.text}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="w-[160px] md:w-[220px] flex justify-start pl-3">
              <span className="text-2xl md:text-3xl text-gray-700 font-medium font-serif italic">
                / lifetime
              </span>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            It's free to do a consultation with us, but if you want to make the project real, it will cost you, and if you want to appreciate my work, you can donate here.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="px-8 py-3.5 rounded-full bg-white/50 border border-gray-300 text-gray-900 font-medium hover:bg-white transition-colors shadow-sm hover:shadow hover:-translate-y-0.5 duration-200"
          >
            Donate (Optional)
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
