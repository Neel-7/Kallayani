import type { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';

export interface HeroProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  overlayClassName?: string;
}

/**
 * Hero is re-architected per PART B and DESIGN_AUDIT.md.
 * Sit within a floating, shadow-drawer elevated card layout offset downward/leftward on desktop.
 * Utilizes the brand-new Bodoni Moda display serif (font-display) and token-compliant sizing.
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
        'relative w-full h-[65vh] md:h-[80vh] min-h-[500px] md:min-h-[640px] bg-muted-surface font-sans overflow-visible mb-[48px] md:mb-[64px]',
        className,
      )}
      {...props}
    >
      {/* Background Image - sharp edge format for photography contrast per PART B */}
      <div className="absolute inset-0 select-none pointer-events-none rounded-none overflow-hidden">
        <img
          src={image}
          alt={headline}
          className="w-full h-full object-cover object-center scale-[1.02] rounded-none"
        />
        {/* Soft, optional dark scrim overlay - fallback opacity for rich ambient contrast */}
        <div className={cn('absolute inset-0 bg-black/10', overlayClassName)} />
      </div>

      {/* Floating Content Card - Aligned left/bottom and floating partially off-edge per PART B */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto h-full px-[24px] md:px-[40px] flex items-center md:items-end justify-center md:justify-start">
        <div className="w-full max-w-[480px] bg-surface text-foreground p-[32px] md:p-[48px] rounded-soft shadow-drawer border border-border/40 space-y-[20px] text-center md:text-left transform md:translate-y-[48px] md:translate-x-[-16px]">
          <div className="space-y-[12px]">
            <h1 className="text-display-lg md:text-display-xl font-display font-semibold tracking-tighter leading-[1.05] text-primary-text text-balance">
              {headline}
            </h1>
            <p className="text-body-sm md:text-body-md text-muted-foreground leading-relaxed text-balance">
              {subhead}
            </p>
          </div>
          <div className="pt-[4px]">
            <Button
              asChild
              size="lg"
              className="w-full md:w-auto bg-primary-text hover:bg-primary-text rounded-soft font-semibold px-[32px] h-[48px] md:h-[52px] text-body-sm shadow-sm transition-all hover:scale-[1.01]"
            >
              <Link to={ctaHref} className="text-surface">
                {ctaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
