"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const iconsDesktop = [
  { src: "/illusiongap-icon.png", alt: "Illusion Gap", x: -220, y: 30, delay: 0 },
  { src: "/noteon-icon.png", alt: "Noteon", x: 0, y: -40, delay: 0.3 },
  { src: "/dboost-icon.png", alt: "DBoost", x: 220, y: 30, delay: 0.6 },
];

const iconsMobile = [
  { src: "/illusiongap-icon.png", alt: "Illusion Gap", x: -90, y: 30, delay: 0 },
  { src: "/noteon-icon.png", alt: "Noteon", x: 0, y: -30, delay: 0.3 },
  { src: "/dboost-icon.png", alt: "DBoost", x: 90, y: 30, delay: 0.6 },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const icons = isMobile ? iconsMobile : iconsDesktop;

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-white py-32 md:py-0">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-100/40 rounded-[100%] blur-3xl pointer-events-none -mt-10" />

      <div className="relative z-10 flex flex-col items-center px-4 max-w-4xl mx-auto text-center w-full">
        {/* Floating Icons Halo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          {icons.map((icon, idx) => (
            <motion.div
              key={idx}
              className="absolute left-1/2 top-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50"
              style={{
                x: `calc(-50% + ${icon.x}px)`,
                y: icon.y,
              }}
              animate={{
                y: [icon.y - 10, icon.y + 10, icon.y - 10],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: icon.delay,
              }}
            >
              <img src={icon.src} alt={icon.alt} className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-lg" />
            </motion.div>
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-8 z-20 mt-32 md:mt-16"
        >
          <span className="text-sm font-medium text-gray-700">Started your business with </span>
          <span className="text-sm font-serif italic text-yellow-500">professional</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-20 text-5xl md:text-7xl tracking-tight mb-6"
        >
          <span className="block font-serif font-light text-gray-100 mb-2">
            Your <span className="font-serif italic text-yellow-300">ideas</span> needs
          </span>
          <span className="block flex flex-wrap justify-center gap-x-3">
            <span className="font-serif font-medium text-gray-100">to be</span>
            <span className="font-sans font-bold text-red-500 tracking-normal">executed.</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-20 text-white text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-sans"
        >
          We design and develop modern websites that help you achieve your business goals. The faster you build, the faster you get the profit.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-20 flex items-center justify-center gap-4"
        >
          <Link href="/contact" className="px-8 py-3.5 rounded-full bg-[#1a1a1a] text-white font-medium hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200">
            Build now!
          </Link>
        </motion.div>
      </div>

      {/* Landscape Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none">
        <div className="relative w-full h-full">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFqdmRrazFiZHFmdHlldmEwZjAyeTF5bHJ0a3hzZ28xdW1lOGR3dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j3OL6mSc2FeV0UHMDg/giphy.gif"
            alt="Animated Studio Ghibli Landscape"
            className="w-full h-full object-cover object-bottom opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
