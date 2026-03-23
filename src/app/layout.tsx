import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavLinks from "@/app/ui/components/nav-link";
import Chatbot from "@/app/home/aiAssistant/chatbot";
// import {  Inter, Roboto } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// const roboto = Roboto({
//   variable: "--font-roboto",
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700", "900"],
//   display: "swap",
//   style: ["normal", "italic"],
// });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hemant Kushwaha",
  description: "Created by Hemant Kushwaha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavLinks />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed left-[-200px] top-[-200px] z-0 h-[600px] w-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed bottom-[-200px] right-[-200px] z-0 h-[600px] w-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)' }}
        />
        <main className="relative z-10 pt-16">{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}
