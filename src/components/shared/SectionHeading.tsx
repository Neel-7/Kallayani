import * as React from 'react';
import { cn } from 'src/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

/**
 * SectionHeading is a presentational header block per blueprint guidelines.
 * It strictly implements M2 typography scales (heading-lg, body-md) without raw styling overrides.
 */
export const SectionHeading = React.forwardRef<
  HTMLDivElement,
  SectionHeadingProps
>(({ className, title, description, align = 'left', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[8px]',
        {
          'text-left items-start': align === 'left',
          'text-center items-center': align === 'center',
        },
        className,
      )}
      {...props}
    >
      <h2 className="text-heading-lg font-display text-primary-text font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-body-md text-muted-foreground max-w-[640px]">
          {description}
        </p>
      )}
    </div>
  );
});

SectionHeading.displayName = 'SectionHeading';
