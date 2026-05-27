'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIEWPORT = { once: true, amount: 0.08 } as const;

// ── Fade up on scroll ──────────────────────────────────────────────────────────
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeUp({ children, delay = 0, duration = 0.55, className, style }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Slide in from left on scroll ──────────────────────────────────────────────
interface SlideLeftProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SlideLeft({ children, delay = 0, className, style }: SlideLeftProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Scale in on scroll ────────────────────────────────────────────────────────
interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScaleIn({ children, delay = 0, className, style }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container — children animate in sequence ─────────────────────────
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
}

export function Stagger({ children, className, style, staggerDelay = 0.08 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger child item ────────────────────────────────────────────────────────
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerItem({ children, className, style }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Animated presence — for list transitions (filter changes etc) ─────────────
export { AnimatePresence };

// ── Animated page header ──────────────────────────────────────────────────────
interface AnimatedPageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function AnimatedPageHeader({ title, subtitle, className = '' }: AnimatedPageHeaderProps) {
  return (
    <header className={`page-header ${className}`}>
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="page-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

// ── Animate on mount (page-load entrance, no scroll trigger) ──────────────────
interface AnimateOnMountProps {
  children: React.ReactNode;
  delay?: number;
  from?: 'bottom' | 'left' | 'scale';
  className?: string;
  style?: React.CSSProperties;
}

export function AnimateOnMount({ children, delay = 0, from = 'bottom', className, style }: AnimateOnMountProps) {
  const initial =
    from === 'left'  ? { opacity: 0, x: -24 } :
    from === 'scale' ? { opacity: 0, scale: 0.88 } :
    { opacity: 0, y: 20 };
  const animate =
    from === 'left'  ? { opacity: 1, x: 0 } :
    from === 'scale' ? { opacity: 1, scale: 1 } :
    { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Hover scale span (for skill tags etc.) ────────────────────────────────────
interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({ children, scale = 1.08, className }: HoverScaleProps) {
  return (
    <motion.span
      className={className}
      whileHover={{ scale, transition: { duration: 0.15 } }}
    >
      {children}
    </motion.span>
  );
}
