'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AcademicCapIcon,
  UserIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  LightBulbIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

const links = [
  { name: 'AI Expertise', href: '/', icon: CpuChipIcon },
  { name: 'About', href: '/home/about', icon: UserIcon },
  { name: 'Experience', href: '/home/experience', icon: AcademicCapIcon },
  { name: 'Projects', href: '/home/project', icon: LightBulbIcon },
  { name: 'Course', href: '/home/course', icon: BookOpenIcon },
  { name: 'AI Landscape', href: '/home/blog', icon: DocumentDuplicateIcon },
  { name: 'Contact', href: '/home/contact', icon: EnvelopeIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans nav-header">
      <nav className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white shrink-0">
            Hemant Kushwaha
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/60'
                      : 'text-slate-200 hover:bg-slate-700/60 hover:text-white'
                  }`}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Theme toggle + mobile hamburger */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              className="flex items-center justify-center w-9 h-9 rounded-md text-slate-200 hover:bg-slate-700/60 hover:text-white transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-slate-200 hover:bg-slate-700/60 hover:text-white transition-colors"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          {/* Menu */}
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-700 shadow-2xl z-50">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-4 border-b border-slate-800/60 last:border-0 transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border-l-2 border-l-cyan-400'
                      : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <link.icon className="h-5 w-5 shrink-0" />
                  <span className="font-medium">{link.name}</span>
                  {isActive && (
                    <span className="ml-auto text-[10px] text-cyan-500 uppercase tracking-widest">
                      Current
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </header>
  );
}
