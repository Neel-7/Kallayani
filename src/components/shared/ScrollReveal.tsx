import React, { useEffect, useRef, useState } from 'react';
import { cn } from 'src/lib/utils';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number; // Optional delay in milliseconds to support staggered/cascading entries
}

/**
 * ScrollReveal applies standard, subtle fade-in-up motion cues on scroll per §24 and PART E.
 * Integrates native prefers-reduced-motion media settings to bypass animations.
 *
 * NOTE: Refactored transition to a crisp, cinematic 500ms duration with support for delay
 * offsets, allowing cascading animations for sibling layouts.
 */
export function ScrollReveal({ children, delay, className, ...props }: ScrollRevealProps) {
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
        'transition-all duration-500 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[16px] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none',
        className
      )}
      style={{
        transitionDelay: isVisible && delay ? `${delay}ms` : undefined,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
