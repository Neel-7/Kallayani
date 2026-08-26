import * as React from 'react';
import { ThreadDivider } from 'src/components/shared/ThreadDivider';
import { cn } from 'src/lib/utils';

export interface CraftsmanshipBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  craftTechnique: string;
  regionalOrigin: string;
  description: string;
  isJewelry?: boolean;
}

/**
 * CraftsmanshipBlock is an editorial storytelling block per §14.
 * Integrates 'ThreadDivider' beneath the technique/craft title in 'tertiary' (brass)
 * to evoke gold-thread heritage without literal ornament per PART C and PART F.
 */
export function CraftsmanshipBlock({
  className,
  craftTechnique,
  regionalOrigin,
  description,
  isJewelry = false,
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

        {/* 1. Signature Cultural Touchpoint: ThreadDivider beneath craftsmanship heading per PART F */}
        <ThreadDivider color="tertiary" className="my-[12px] max-w-[120px]" />

        {/* 2. Optional subtle fine brass underline/accent block when isJewelry is true per PART C */}
        {isJewelry && (
          <div className="w-[40px] h-[1.5px] bg-tertiary mt-[4px]" />
        )}

        <p className="text-caption text-muted-foreground tracking-wide uppercase font-mono font-medium pt-[4px]">
          Origin: {regionalOrigin}
        </p>
      </div>

      <div className="flex-1 text-body-sm text-muted-foreground leading-relaxed font-sans pt-[4px]">
        {description}
      </div>
    </div>
  );
}
