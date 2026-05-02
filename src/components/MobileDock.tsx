"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, CreditCard, User, MessageSquare, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileDock() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Sync with global audio element
    const audio = document.getElementById("global-bg-audio") as HTMLAudioElement;
    if (audio) {
      setIsAudioPlaying(!audio.paused);
      
      const handlePlay = () => setIsAudioPlaying(true);
      const handlePause = () => setIsAudioPlaying(false);
      
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      
      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    const audio = document.getElementById("global-bg-audio") as HTMLAudioElement;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Product", href: "/product", icon: Package },
    { name: "Pricing", href: "/pricing", icon: CreditCard },
    { name: "About", href: "/about", icon: User },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ];

  // Avoid hydration mismatch for pathname dependent UI
  if (!mounted) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] z-50">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-[2rem] p-2 flex items-center justify-between px-2 sm:px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`relative p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ease-out ${
                isActive ? "bg-white/60 text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "scale-110" : "scale-100"} />
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gray-900"></span>
              )}
            </Link>
          );
        })}
        
        {/* Audio Toggle Button for Mobile */}
        <button
          onClick={toggleAudio}
          className={`relative p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ease-out ${
            isAudioPlaying ? "bg-white/60 text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
          }`}
          aria-label="Toggle background audio"
        >
          {isAudioPlaying ? (
            <Volume2 size={20} strokeWidth={2.5} className="scale-110 animate-pulse text-gray-900" />
          ) : (
            <VolumeX size={20} strokeWidth={2} className="scale-100 text-gray-600" />
          )}
          {isAudioPlaying && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gray-900"></span>
          )}
        </button>
      </div>
    </div>
  );
}
