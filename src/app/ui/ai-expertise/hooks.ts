import { type RefObject, useEffect, useRef, useState } from 'react';

export function useCountUp(target: string, duration = 1200, start = false): string | number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const num = parseInt(target, 10);
    let startTime: number | null = null;
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    setCount(0);
    timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [start, target, duration]);

  if (target.includes('%')) return `${count}%`;
  if (target.includes('+')) return `${count}+`;
  return count;
}

export function useInView(threshold = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    const node = ref.current;
    if (node) obs.observe(node);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

