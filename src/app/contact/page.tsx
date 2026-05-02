"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Send, User, Loader2 } from "lucide-react";
import { getCookieConsent } from "@/components/CookieConsent";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_STORAGE_KEY = "generos.chatHistory";
const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Welcome to my executive workspace. I am Bagas's Customer Success representative. How may I assist you today? \n\n(Halo! Saya representatif Customer Success Bagas. Ada yang bisa saya bantu?)",
};

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<"accepted" | "pending">("pending");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Message[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      } catch {}
    };

    if (getCookieConsent() === "accepted") {
      setConsent("accepted");
      loadFromStorage();
    }
    setHydrated(true);

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<"accepted" | "declined">).detail;
      if (detail === "accepted") {
        setConsent("accepted");
        loadFromStorage();
      } else {
        setConsent("pending");
        window.localStorage.removeItem(CHAT_STORAGE_KEY);
      }
    };
    window.addEventListener("cookie-consent-change", onConsent);
    return () => window.removeEventListener("cookie-consent-change", onConsent);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (consent !== "accepted") return;
    try {
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, hydrated, consent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const renderMessageContent = (content: string): ReactNode[] => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      parts.push(
        <a 
          key={match.index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline inline-flex items-center"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsTyping(false);

    try {
      // API call runs in background immediately
      const fetchPromise = fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      // Calculate highly randomized human-like delays
      let waitDelay = 0;
      const randWait = Math.random();
      if (randWait < 0.25) {
        // 25% chance of a long wait (10 to 30 seconds)
        waitDelay = 10000 + Math.random() * 20000;
      } else {
        // 75% chance of normal wait (1 to 5 seconds)
        waitDelay = 1000 + Math.random() * 4000;
      }



      // Await the "waiting to read/reply" phase
      await new Promise(resolve => setTimeout(resolve, waitDelay));

      // Resolve the API call to get the actual response length
      const res = await fetchPromise;
      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that request at this moment.";

      // User starts typing
      setIsTyping(true);

      // Typing delay based on text length (assume ~30ms per character + base random delay)
      // Cap the maximum typing delay at 12 seconds so the user doesn't wait forever
      const calculatedDelay = 1500 + (aiResponse.length * 30) + (Math.random() * 1000);
      const typingDelay = Math.min(calculatedDelay, 12000); 

      // Await the "typing" phase
      await new Promise(resolve => setTimeout(resolve, typingDelay));

      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "A network error occurred. Please attempt your request again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-white relative">
      <Navbar />

      {/* Premium Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none">
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFqdmRrazFiZHFmdHlldmEwZjAyeTF5bHJ0a3hzZ28xdW1lOGR3dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j3OL6mSc2FeV0UHMDg/giphy.gif"
          alt="Animated Background"
          className="w-full h-full object-cover object-bottom opacity-80"
        />
      </div>

      <section className="relative h-screen w-full flex flex-col items-center justify-center z-10 px-3 sm:px-4 md:px-8 pt-32 pb-28 md:py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl h-full md:h-[78vh] bg-white/10 backdrop-blur-[32px] border border-white/20 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.15)] rounded-[1.5rem] md:rounded-[2rem] flex flex-col overflow-hidden relative"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 pointer-events-none rounded-[1.5rem] md:rounded-[2rem] shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]"></div>

          {/* Elegant Header */}
          <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between z-20">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-gray-800 shadow-sm">
                  <User size={20} strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 border-[2px] border-black rounded-full shadow-sm"></div>
              </div>
              <div>
                <h1 className="text-base sm:text-lg md:text-xl font-sans font-semibold text-gray-900 tracking-tight">Customer Success</h1>
                <p className="text-xs sm:text-sm font-sans font-medium text-gray-600 mt-0.5">Online - Ready to help</p>
              </div>
            </div>
            <div className="hidden sm:flex px-4 py-2 bg-white/20 rounded-full border border-white/20 text-xs font-medium tracking-wide text-gray-800 shadow-sm backdrop-blur-md items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Fast Response
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-10 space-y-4 sm:space-y-6 md:space-y-8 scroll-smooth z-10 relative">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 sm:gap-3 md:gap-4 max-w-[88%] sm:max-w-[75%] md:max-w-[70%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === "user" ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white border border-gray-600/30" : "bg-white/40 backdrop-blur-md border border-white/60 text-gray-800"}`}>
                    <User size={16} strokeWidth={1.5} />
                  </div>
                  <div
                    className={`px-3.5 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-2xl sm:rounded-3xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-b from-gray-900 to-black text-gray-100 rounded-tr-sm shadow-xl border border-gray-800/80"
                        : "bg-white/70 backdrop-blur-2xl border border-white/60 text-gray-800 rounded-tl-sm shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                    } text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed whitespace-pre-wrap font-sans break-words`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 sm:gap-3 md:gap-4 max-w-[80%]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-gray-800 flex-shrink-0 shadow-sm">
                    <User size={16} strokeWidth={1.5} />
                  </div>
                  <div className="px-3.5 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/60 text-gray-900 rounded-tl-sm shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center gap-2 h-[40px] sm:h-[48px] md:h-[52px]">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Premium Input Form */}
          <div className="bg-white/10 backdrop-blur-2xl border-t border-white/20 p-3 sm:p-4 md:p-8 z-20">
            <form onSubmit={sendMessage} className="relative flex items-center max-w-4xl mx-auto">
              <div className="relative w-full rounded-full p-[2px] bg-gradient-to-r from-gray-300/50 via-white/80 to-gray-300/50 shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:from-yellow-400/30 focus-within:to-yellow-400/30">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Bagas's expertise..."
                  className="w-full bg-white/90 backdrop-blur-md border-none text-gray-900 placeholder:text-gray-500 rounded-full pl-4 sm:pl-6 md:pl-7 pr-12 sm:pr-14 md:pr-16 py-2.5 sm:py-3.5 md:py-4 outline-none transition-all text-[13px] sm:text-[14px] md:text-[15px] font-medium"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all group"
                >
                  <Send size={14} className="ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
