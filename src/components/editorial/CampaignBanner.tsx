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
  variant?: 'default' | 'festive';
}

/**
 * CampaignBanner is visually distinct from the full-bleed Hero per §12 and PART C.
 * Features an asymmetrical format, sharp-vs-soft rounding contrasts (PART B),
 * shadow-drawer copy elevation, and a dedicated 'festive' theme with secondary deep wine background tones.
 */
export function CampaignBanner({
  image,
  title,
  subtitle,
  tagline,
  ctaLabel,
  ctaHref,
  bgColor = 'bg-muted-surface',
  variant = 'default',
  className,
  ...props
}: CampaignBannerProps) {
  const isFestive = variant === 'festive';

  return (
    <div
      className={cn(
        'w-full grid grid-cols-1 md:grid-cols-12 overflow-visible rounded-soft bg-surface font-sans shadow-drawer border border-border/30',
        className
      )}
      {...props}
    >
      {/* Content Column (5 cols) - Elevated with shadow-drawer padding and contextual backgrounds per PART B/C */}
      <div
        className={cn(
          'md:col-span-5 flex flex-col justify-center p-[32px] sm:p-[48px] md:p-[64px] space-y-[20px] rounded-t-soft md:rounded-l-soft md:rounded-tr-none',
          isFestive ? 'bg-secondary text-surface' : bgColor
        )}
      >
        {tagline && (
          <span
            className={cn(
              'text-body-xs font-bold uppercase tracking-widest',
              isFestive ? 'text-tertiary' : 'text-primary-text'
            )}
          >
            {tagline}
          </span>
        )}
        <div className="space-y-[12px]">
          <h2
            className={cn(
              'text-heading-md md:text-heading-lg font-display font-semibold tracking-tight leading-tight text-balance',
              isFestive ? 'text-surface' : 'text-primary-text'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'text-body-sm leading-relaxed text-balance',
              isFestive ? 'text-surface/80' : 'text-muted-foreground'
            )}
          >
            {subtitle}
          </p>
        </div>
        <div className="pt-[12px]">
          <Button
            asChild
            variant={isFestive ? 'outline' : 'default'}
            className={cn(
              'rounded-soft font-semibold px-[28px] h-[46px]',
              isFestive && 'border-white/40 text-surface hover:bg-white/10 hover:text-surface'
            )}
          >
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>

      {/* Visual Image Column (7 cols) - Sharp corners on photography for soft-vs-sharp contrast per PART B */}
      <div className="relative md:col-span-7 h-[300px] sm:h-[400px] md:h-auto min-h-[320px] bg-muted-surface overflow-hidden rounded-b-soft md:rounded-r-soft md:rounded-bl-none">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03] rounded-none"
        />
        {/* Clean accent border inside image */}
        <div className="absolute top-[20px] left-[20px] right-[20px] bottom-[20px] border border-white/20 pointer-events-none rounded-none" />
      </div>
    </div>
  );
}
