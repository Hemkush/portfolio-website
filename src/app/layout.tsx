import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import NavLinks from "@/app/ui/components/nav-link";
import Chatbot from "@/app/home/aiAssistant/chatbot";
import { ThemeProvider } from "@/app/ui/components/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hemant-kushwaha.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Hemant Kushwaha — AI Engineer',
    template: '%s | Hemant Kushwaha',
  },
  description:
    'AI Engineer with 3.5+ years of experience building production RAG pipelines, LLM orchestration systems, and full-stack AI applications. MS Information Systems at UMD (GPA 3.94). OPT-eligible May 2026.',
  keywords: [
    'AI Engineer', 'ML Engineer', 'LLM Engineer', 'Machine Learning Engineer',
    'RAG', 'LLM Orchestration', 'Multi-Agent Systems', 'vector search', 'pgvector',
    'Full Stack AI', 'Next.js', 'FastAPI', 'PostgreSQL', 'Gemini', 'Python', 'TypeScript',
    'Hemant Kushwaha', 'University of Maryland', 'UMD', 'NIT Rourkela',
    'OPT eligible', 'hire AI engineer', 'AI engineer portfolio',
  ],
  authors: [{ name: 'Hemant Kushwaha', url: BASE_URL }],
  creator: 'Hemant Kushwaha',
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Hemant Kushwaha — AI Engineer Portfolio',
    title: 'Hemant Kushwaha — AI Engineer',
    description:
      'AI Engineer with 3.5+ years of experience building production RAG pipelines, LLM orchestration systems, and full-stack AI applications. MS at UMD. OPT-eligible May 2026.',
    images: [
      {
        url: `${BASE_URL}/profile.png`,
        width: 800,
        height: 800,
        alt: 'Hemant Kushwaha — AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemant Kushwaha — AI Engineer',
    description:
      'AI Engineer with 3.5+ years of experience. Building production RAG, LLM orchestration, and full-stack AI systems. MS at UMD. OPT-eligible May 2026.',
    images: [`${BASE_URL}/profile.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply saved theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light')}else{document.documentElement.classList.remove('light')}}catch(e){document.documentElement.classList.remove('light')}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${dmMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NavLinks />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              backgroundImage:
                'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
              backgroundSize: '52px 52px',
              ['--grid-line' as string]: 'rgba(148,163,184,0.06)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none fixed left-[-200px] top-[-200px] z-0 h-[700px] w-[700px]"
            style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 68%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none fixed bottom-[-200px] right-[-200px] z-0 h-[700px] w-[700px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 68%)' }}
          />
          <main className="relative z-10 pt-16">{children}</main>
          <Chatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
