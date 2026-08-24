import * as React from 'react';
import { Skeleton } from 'src/components/ui/skeleton';
import { cn } from 'src/lib/utils';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  /** Explicit alt text is required for accessibility (TypeScript enforced) */
  alt: string;
  /** Constrained to brand-defined editorial aspect ratios per blueprint §29 */
  aspectRatio: '4:5' | '3:4' | '1:1' | '16:9';
  srcSet?: string;
  sizes?: string;
}

const ASPECT_RATIO_MAP = {
  '4:5': 'aspect-[4/5]',
  '3:4': 'aspect-[3/4]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
} as const;

/**
 * ResponsiveImage handles responsive image loading with a skeleton placeholder to prevent layout shifts.
 * Includes native lazy loading, CDN-ready srcset contracts, and a fade-in that respects prefers-reduced-motion.
 */
export const ResponsiveImage = React.forwardRef<
  HTMLImageElement,
  ResponsiveImageProps
>(({ className, src, alt, aspectRatio, srcSet, sizes, ...props }, ref) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const aspectClass = ASPECT_RATIO_MAP[aspectRatio];

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-muted-surface rounded-soft',
        aspectClass,
      )}
    >
      {/* Skeleton placeholder shown while loading to prevent layout shifts */}
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}

      <img
        ref={ref}
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        loading="lazy"
        onLoad={handleLoad}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      />
    </div>
  );
});

ResponsiveImage.displayName = 'ResponsiveImage';
