"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const productItems: CardStackItem[] = [
  {
    id: 1,
    title: "Noteon",
    description: "Your seamless workspace for knowledge and writing.",
    imageSrc: "/noteon.png",
    href: "http://noteon.gt.tc/",
  },
  {
    id: 2,
    title: "Illusion Gap",
    description: "Bridging the gap between imagination and reality.",
    imageSrc: "/illusiongap.png",
    href: "https://illusiongap.vercel.app/",
  },
  {
    id: 3,
    title: "DBoost",
    description: "Accelerate your development and boost your business performance instantly.",
    imageSrc: "/dboost.png",
    href: "https://dboost.id/",
  },
];

export default function ProductPage() {
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
      <section className="relative h-screen w-full flex flex-col items-center md:justify-center z-10 px-4 md:px-6 overflow-y-auto overflow-x-hidden pt-36 pb-32 md:py-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-6xl md:min-h-[75vh] bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-[1.75rem] md:rounded-[2rem] p-5 sm:p-8 md:p-16 flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/40 border border-white/50 text-gray-800 text-sm font-medium mb-6"
          >
            Product Features
          </motion.div>

          <div className="w-full flex items-center justify-center pt-4 sm:pt-8 pb-2 sm:pb-4 overflow-hidden">
            <CardStack
              items={productItems}
              initialIndex={0}
              autoAdvance
              intervalMs={3000}
              pauseOnHover
              showDots
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
