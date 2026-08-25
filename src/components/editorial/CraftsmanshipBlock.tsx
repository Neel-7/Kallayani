import * as React from 'react';
import { cn } from 'src/lib/utils';

export interface CraftsmanshipBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  craftTechnique: string;
  regionalOrigin: string;
  description: string;
}

/**
 * CraftsmanshipBlock is an editorial component located in src/components/editorial/ per §14.
 * Represents premium artisanal storytelling content, fully decoupled from PDP layout dependencies
 * so that it can easily be reused inside editorial story journals or index essays later.
 */
export function CraftsmanshipBlock({
  className,
  craftTechnique,
  regionalOrigin,
  description,
  ...props
}: CraftsmanshipBlockProps) {
  return (
    <div
      className={cn(
        'p-[32px] md:p-[48px] rounded-soft bg-muted-surface border border-border/60 flex flex-col md:flex-row gap-[24px] md:gap-[48px] items-start',
        className,
      )}
      {...props}
    >
      <div className="space-y-[8px] md:max-w-[280px] shrink-0">
        <span className="text-caption uppercase tracking-wider font-mono text-primary font-bold">
          Legacy & Craft
        </span>
        <h3 className="text-heading-sm font-display text-primary-text font-bold leading-tight">
          {craftTechnique}
        </h3>
        <p className="text-caption text-muted-foreground tracking-wide uppercase font-mono font-medium">
          Origin: {regionalOrigin}
        </p>
      </div>

      <div className="flex-1 text-body-sm text-muted-foreground leading-relaxed font-sans pt-[4px]">
        {description}
      </div>
    </div>
  );
}
