import React from 'react';
import { cn } from 'src/lib/utils';

export interface ThreadDividerProps extends React.SVGProps<SVGSVGElement> {
  color?: 'primary' | 'tertiary';
}

/**
 * ThreadDivider represents exactly ONE signature cultural touchpoint per §21/§33.
 * It is modeled as a slightly organic, hand-spun embroidery thread (evoking kantha/zari heritage)
 * rather than a perfectly straight/mechanical horizontal rule.
 */
export function ThreadDivider({ color = 'primary', className, ...props }: ThreadDividerProps) {
  const strokeColorClass = color === 'primary' ? 'stroke-primary' : 'stroke-tertiary';

  return (
    <svg
      viewBox="0 0 1000 10"
      className={cn('w-full h-[8px] block select-none pointer-events-none', strokeColorClass, className)}
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M 0,4.5 C 150,3.2 350,5.8 500,4.5 C 650,3.2 850,5.8 1000,4.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className="opacity-70"
      />
    </svg>
  );
}
