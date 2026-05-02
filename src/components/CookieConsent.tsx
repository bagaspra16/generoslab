"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "generos.cookieConsent";

export type CookieConsentValue = "accepted" | "declined";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" ? "accepted" : null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const force =
      params.has("cookies") ||
      window.location.hash === "#cookies" ||
      window.location.hash === "#show-cookies";
    if (force) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    if (getCookieConsent() !== "accepted") {
      const t = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(t);
    }
  }, []);

  const decide = (value: CookieConsentValue) => {
    if (value === "accepted") {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem("generos.chatHistory");
    }
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: value }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-1/2 -translate-x-1/2 bottom-28 w-[92%] max-w-md md:left-auto md:right-6 md:bottom-6 md:translate-x-0 md:w-[420px] md:max-w-[calc(100vw-3rem)] z-[60]"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
        >
          <div className="relative bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)] rounded-3xl p-5 sm:p-6">
            <button
              onClick={() => decide("declined")}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/60 hover:bg-white/90 border border-white/70 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Decline cookies"
            >
              <X size={14} strokeWidth={2} />
            </button>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 border border-yellow-200/60 flex items-center justify-center text-yellow-700 flex-shrink-0 shadow-sm">
                <Cookie size={20} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight">
                  We use cookies
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-gray-700">
                  We store your chat history with our Customer Success representative
                  in your browser&apos;s local storage so you can continue the
                  conversation later. No data leaves your device through cookies.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              <button
                onClick={() => decide("declined")}
                className="px-4 py-2 rounded-full bg-white/60 hover:bg-white border border-gray-200 text-sm font-medium text-gray-800 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => decide("accepted")}
                className="px-5 py-2 rounded-full bg-gradient-to-b from-gray-900 to-black hover:from-black hover:to-black text-sm font-medium text-white shadow-md hover:shadow-lg transition-all"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
