import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Generos Labs",
  description: "Generos Labs: Generous Labs Solutions for all your needs",
  icons: {
    icon: [{ url: "/G.png", type: "image/png" }],
    shortcut: "/G.png",
    apple: "/G.png",
  },
};

import MobileDock from "@/components/MobileDock";
import CookieConsent from "@/components/CookieConsent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden overscroll-none h-full w-full">
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased bg-white text-[#1a1a1a] overflow-hidden overscroll-none fixed inset-0 w-full h-full relative`}
      >
        {children}
        <MobileDock />
        <CookieConsent />
      </body>
    </html>
  );
}
