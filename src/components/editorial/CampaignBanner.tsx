import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';

export interface CampaignBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  subtitle: string;
  tagline?: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor?: string;
}

/**
 * CampaignBanner is visually distinct from the full-bleed Hero per §12.
 * It uses an elegant split-screen asymmetrical format (50/50 image and premium text background)
 * on desktop, collapsing gracefully to stacked cards on mobile devices.
 */
export function CampaignBanner({
  image,
  title,
  subtitle,
  tagline,
  ctaLabel,
  ctaHref,
  bgColor = 'bg-muted-surface',
  className,
  ...props
}: CampaignBannerProps) {
  return (
    <div
      className={cn(
        'w-full grid grid-cols-1 md:grid-cols-12 border border-border/40 overflow-hidden rounded-soft bg-surface font-sans',
        className
      )}
      {...props}
    >
      {/* Content Column (5 cols) */}
      <div className={cn('md:col-span-5 flex flex-col justify-center p-[32px] sm:p-[48px] md:p-[64px] space-y-[20px]', bgColor)}>
        {tagline && (
          <span className="text-body-xs font-bold uppercase tracking-widest text-primary-text">
            {tagline}
          </span>
        )}
        <div className="space-y-[12px]">
          <h2 className="text-heading-md md:text-heading-lg font-bold tracking-tight text-primary-text leading-tight text-balance">
            {title}
          </h2>
          <p className="text-body-sm text-muted-foreground leading-relaxed text-balance">
            {subtitle}
          </p>
        </div>
        <div className="pt-[12px]">
          <Button asChild variant="default" className="rounded-soft font-semibold px-[28px] h-[46px]">
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>

      {/* Visual Image Column (7 cols) */}
      <div className="relative md:col-span-7 h-[300px] sm:h-[400px] md:h-auto min-h-[320px] bg-muted-surface overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
        />
        {/* Clean accent line inside image for premium feel */}
        <div className="absolute top-[20px] left-[20px] right-[20px] bottom-[20px] border border-white/25 pointer-events-none rounded-soft" />
      </div>
    </div>
  );
}
