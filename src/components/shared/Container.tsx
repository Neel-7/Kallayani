import * as React from 'react';
import { cn } from 'src/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: 'content' | 'wide' | 'full-bleed';
  children: React.ReactNode;
}

/**
 * Container is a generic layout wrapper per blueprint §29.
 * It constrains content width to brand-defined thresholds matching M2 container width tokens.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, width = 'content', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-[16px] md:px-[24px] lg:px-[32px]',
          {
            'max-w-container-content': width === 'content',
            'max-w-container-wide': width === 'wide',
            'max-w-none px-0 md:px-0 lg:px-0': width === 'full-bleed',
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = 'Container';
