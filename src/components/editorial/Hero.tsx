import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  overlayClassName?: string;
}

/**
 * Reusable full-bleed Hero component for premium editorial placement per §12.
 * Adapts beautifully across responsive device viewports, scaling font sizes and copy volume gracefully.
 */
export function Hero({
  image,
  headline,
  subhead,
  ctaLabel,
  ctaHref,
  overlayClassName,
  className,
  ...props
}: HeroProps) {
  return (
    <div
      className={cn(
        'relative w-full h-[60vh] md:h-[80vh] min-h-[480px] md:min-h-[640px] bg-muted-surface overflow-hidden flex items-center justify-center font-sans',
        className
      )}
      {...props}
    >
      {/* Background Image with subtle zoom/scale */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <img
          src={image}
          alt={headline}
          className="w-full h-full object-cover object-center scale-[1.02]"
        />
        {/* Soft, premium dark scrim for text readability */}
        <div className={cn('absolute inset-0 bg-black/40', overlayClassName)} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[24px] md:px-[40px] text-center space-y-[24px] text-white">
        <div className="space-y-[12px] max-w-[800px] mx-auto">
          <h1 className="text-heading-lg md:text-heading-xl font-bold tracking-tight leading-[1.1] text-balance">
            {headline}
          </h1>
          <p className="text-body-sm md:text-body-md text-white/90 max-w-[560px] mx-auto text-balance leading-relaxed">
            {subhead}
          </p>
        </div>
        <div className="pt-[8px]">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-soft font-semibold px-[36px] h-[48px] md:h-[54px] text-body-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
