import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { ResponsiveImage } from '../shared/ResponsiveImage';

export interface ProductGalleryProps {
  images: Record<string, string>[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

/**
 * ProductGallery is a responsive commerce gallery component per blueprint §14.
 * - Desktop: Vertical thumbnail rail + hover zoom.
 * - Mobile: Swipable/arrow carousel + tap-to-zoom.
 * - Respects prefers-reduced-motion.
 */
export function ProductGallery({
  images,
  activeIndex,
  onIndexChange,
}: ProductGalleryProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);

  const handlePrev = () => {
    onIndexChange((activeIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onIndexChange((activeIndex + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col lg:flex-row gap-[16px] w-full items-start">
      {/* 1. Desktop Thumbnail Vertical Rail (lg:block, hidden on mobile) */}
      <div className="hidden lg:flex flex-col gap-[12px] w-[80px] shrink-0">
        {images.map((img, idx) => {
          const isSelected = idx === activeIndex;
          const imageUrl = img['4:5'] || '';

          return (
            <button
              key={idx}
              onClick={() => onIndexChange(idx)}
              className={cn(
                'relative aspect-[4/5] w-full overflow-hidden rounded-soft border transition-all bg-muted-surface hover:opacity-90',
                isSelected
                  ? 'border-primary border-2 shadow-sm'
                  : 'border-border/60',
              )}
              aria-label={`Show gallery image ${idx + 1}`}
            >
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* 2. Main Large Image Frame (with responsive controls) */}
      <div className="relative flex-1 w-full overflow-hidden bg-muted-surface rounded-soft group">
        <div
          onClick={() => setIsZoomed(!isZoomed)}
          className={cn(
            'relative w-full overflow-hidden select-none',
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
          )}
        >
          {currentImage && (
            <div
              className={cn(
                'w-full h-full transition-transform duration-500 ease-in-out motion-reduce:transition-none origin-center',
                {
                  'scale-125': isZoomed,
                  'hover:scale-105 lg:hover:scale-105': !isZoomed,
                },
              )}
            >
              <ResponsiveImage
                src={currentImage['4:5'] || ''}
                alt="Product main detailed representation"
                aspectRatio="4:5"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Swipe Carousel Mobile Indicators and Navigation Arrows */}
        {images.length > 1 && (
          <>
            {/* Left Selector Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-[16px] top-1/2 -translate-y-1/2 p-[8px] rounded-full bg-surface/80 hover:bg-surface border border-border/40 shadow-sm z-10 transition-colors cursor-pointer"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="h-24 w-24 text-foreground" />
            </button>

            {/* Right Selector Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-[16px] top-1/2 -translate-y-1/2 p-[8px] rounded-full bg-surface/80 hover:bg-surface border border-border/40 shadow-sm z-10 transition-colors cursor-pointer"
              aria-label="Next gallery image"
            >
              <ChevronRight className="h-24 w-24 text-foreground" />
            </button>

            {/* Pagination Dots (Mobile Indicator) */}
            <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 flex gap-[8px] z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onIndexChange(idx)}
                  className={cn(
                    'h-8 w-8 rounded-full transition-all cursor-pointer',
                    idx === activeIndex ? 'bg-primary w-16' : 'bg-surface/60',
                  )}
                  aria-label={`Select gallery slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}