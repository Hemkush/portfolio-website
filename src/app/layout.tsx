import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
        {children}
      </body>
    </html>
  );
}
