import React, { useEffect, useRef, useState } from 'react';
import { cn } from 'src/lib/utils';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * ScrollReveal applies standard, subtle fade-in-up motion cues on scroll per §24.
 * Integrates flawlessly with native prefers-reduced-motion media settings to bypass
 * animations for consumers with motion sensitivities.
 */
export function ScrollReveal({ children, className, ...props }: ScrollRevealProps) {
  // 1. Instantly reveal and bypass transition if user prefers reduced motion synchronously on mount
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If already visible due to prefers-reduced-motion preference, skip observer setup
    if (isVisible) return;

    // 2. Set up lightweight IntersectionObserver to watch scroll trigger points
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-1000 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[24px] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
