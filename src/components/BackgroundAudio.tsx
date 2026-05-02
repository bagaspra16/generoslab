"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Sync state with actual audio element
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Try immediate autoplay
    const attemptPlay = () => {
      audio.play().catch((e) => {
        // Suppress the warning log if user just doesn't want it, but fallback will catch it
      });
    };

    attemptPlay();

    // Fallback: try autoplay on first user interaction if it hasn't started yet
    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      // Remove listeners after first interaction
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("scroll", handleFirstInteraction);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }
  };

  return (
    <>
      <audio id="global-bg-audio" ref={audioRef} src="/bg-audio.mp3" loop autoPlay />
      
      {/* Desktop-only floating button */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[60]">
        <button
          onClick={togglePlay}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 backdrop-blur-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.1)] ${
            isPlaying 
              ? "bg-white/60 border-white/60 hover:bg-white/80" 
              : "bg-white/30 border-white/40 hover:bg-white/50"
          }`}
          aria-label="Toggle background audio"
        >
          {isPlaying ? (
            <Volume2 size={22} className="text-gray-900 animate-pulse" />
          ) : (
            <VolumeX size={22} className="text-gray-600" />
          )}
          
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border-2 border-gray-800/20 animate-ping opacity-30" style={{ animationDuration: '2s' }}></span>
          )}
        </button>
      </div>
    </>
  );
}
