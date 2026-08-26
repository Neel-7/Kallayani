import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';

export interface ImageTextSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  reverse?: boolean;
  variant?: 'large' | 'compact';
}

/**
 * ImageTextSection is a premium, flexible editorial content module per §12, PART A, and PART B.
 * Implements Bodoni Moda (font-display) display serif, with sharp corner images (rounded-none)
 * to achieve premium visual contrast against soft-rounded surfaces.
 */
export function ImageTextSection({
  image,
  title,
  description,
  ctaLabel,
  ctaHref,
  reverse = false,
  variant = 'large',
  className,
  ...props
}: ImageTextSectionProps) {
  const isLarge = variant === 'large';

  return (
    <div
      className={cn(
        'w-full flex flex-col md:flex-row items-stretch gap-[32px] md:gap-[64px] font-sans',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
        isLarge ? 'py-[32px] md:py-[64px]' : 'py-[16px] md:py-[32px]',
        className
      )}
      {...props}
    >
      {/* Visual Image half - rounded-none sharp contrast on photography per PART B */}
      <div
        className={cn(
          'relative overflow-hidden rounded-none bg-muted-surface shrink-0',
          isLarge
            ? 'w-full md:w-1/2 aspect-[4/3] md:aspect-[16/10]'
            : 'w-full md:w-[45%] aspect-[16/10] md:aspect-[21/9]'
        )}
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02] rounded-none"
        />
      </div>

      {/* Content description half */}
      <div className="flex flex-col justify-center flex-1 space-y-[16px] md:space-y-[24px]">
        <div className="space-y-[8px] md:space-y-[12px]">
          <h2
            className={cn(
              'font-display font-semibold tracking-tight text-primary-text leading-tight text-balance',
              isLarge ? 'text-heading-md md:text-heading-lg' : 'text-body-lg md:text-heading-sm'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'text-muted-foreground leading-relaxed text-balance',
              isLarge ? 'text-body-sm md:text-body-md' : 'text-body-xs md:text-body-sm'
            )}
          >
            {description}
          </p>
        </div>

        {ctaLabel && ctaHref && (
          <div className="pt-[4px]">
            <Button asChild variant="link" className="p-0 h-fit text-primary-text font-bold text-body-sm group hover:no-underline">
              <Link to={ctaHref} className="inline-flex items-center gap-[4px]">
                {ctaLabel} <span className="transition-transform group-hover:translate-x-[2px]">→</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
