"use client";

import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const animate = pathname === "/";

  return (
    <motion.nav
      initial={animate ? { y: -20, opacity: 0 } : false}
      animate={animate ? { y: 0, opacity: 1 } : undefined}
      transition={animate ? { duration: 0.5 } : undefined}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/40 backdrop-blur-lg border border-white/50 shadow-sm rounded-full"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <img src="/G.png" alt="Generos AI Logo" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" />
          <span className="font-sans font-medium text-xl tracking-tight text-gray-900">Generos Labs</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Product", "Pricing", "About", "Contact"].map((link) => {
            const href = link === "Home" ? "/" : `/${link.toLowerCase()}`;
            return (
              <Link
                key={link}
                href={href}
                className="text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors"
              >
                {link}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link href="/contact" className="px-6 py-2.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-black transition-colors shadow-sm hover:shadow-md duration-200">
          Build now!
        </Link>
      </div>
    </motion.nav>
  );
}
