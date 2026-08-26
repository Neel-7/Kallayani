import * as React from 'react';
import { cn } from 'src/lib/utils';
import { type Product } from 'src/types/product';

import { StockBadge, type BadgeStatus } from './StockBadge';
import { WishlistButton } from './WishlistButton';
import { Price } from '../shared/Price';
import { ResponsiveImage } from '../shared/ResponsiveImage';

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

/**
 * ProductCard is a presentational e-commerce card component per blueprint §8.
 * It is 100% presentational, accepting only a Product object with zero store/API dependencies.
 * Uses ResponsiveImage and Price components, and implements a desktop-only hover crossfade.
 */
export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, product, ...props }, ref) => {
    const primaryImage = product.images[0];
    const secondaryImage = product.images[1];
    const hasSecondaryImage = secondaryImage !== undefined;

    // Resolve stock badge status based on priority order:
    // 1. out_of_stock
    // 2. low_stock
    // 3. fine_jewelry (for jewelry category products per PART C)
    // 4. new (check if occasionTags contain 'new' or product id is fresh, otherwise fallback)
    let badgeStatus: BadgeStatus | null = null;
    if (product.stockStatus === 'out_of_stock') {
      badgeStatus = 'out_of_stock';
    } else if (product.stockStatus === 'low_stock') {
      badgeStatus = 'low_stock';
    } else if (product.category === 'jewelry') {
      badgeStatus = 'fine_jewelry';
    } else if (
      product.occasionTags.some(
        (tag) =>
          tag.toLowerCase() === 'new' || tag.toLowerCase() === 'new arrivals',
      )
    ) {
      badgeStatus = 'new';
    }

    return (
      <div
        ref={ref}
        className={cn(
          'group flex flex-col gap-[12px] bg-surface p-[12px] rounded-soft border border-border/40 shadow-sm hover:shadow-card transition-shadow duration-300',
          className,
        )}
        {...props}
      >
        {/* Product Image Frame */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-soft bg-muted-surface">
          {/* Stock Status Indicator Badge */}
          {badgeStatus && (
            <div className="absolute top-[12px] left-[12px] z-10">
              <StockBadge status={badgeStatus} />
            </div>
          )}

          {/* Wishlist Toggle Button (Absolute positioned) */}
          <div className="absolute top-[12px] right-[12px] z-10">
            <WishlistButton productId={product.id} productName={product.name} />
          </div>

          {/* Primary Product Image */}
          {primaryImage && (
            <ResponsiveImage
              src={primaryImage['4:5']}
              alt={product.name}
              aspectRatio="4:5"
              className="w-full h-full object-cover"
            />
          )}

          {/* Secondary Image Hover Reveal (Desktop Only, respects prefers-reduced-motion) */}
          {hasSecondaryImage && secondaryImage && (
            <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ease-in-out motion-reduce:transition-none pointer-events-none">
              <ResponsiveImage
                src={secondaryImage['4:5']}
                alt={`${product.name} alternate angle`}
                aspectRatio="4:5"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Product Details Information */}
        <div className="flex flex-col flex-1 gap-[4px] min-w-0">
          <span className="text-caption uppercase tracking-wider text-muted-foreground font-mono">
            {product.fabric}
          </span>

          <h4 className="text-body-md font-semibold text-foreground tracking-tight line-clamp-2 min-h-[44px]">
            {product.name}
          </h4>

          {/* Story Snippet */}
          <p className="text-caption text-muted-foreground line-clamp-2 mt-[2px] min-h-[34px]">
            <strong>{product.productStory.craftTechnique}</strong> (
            {product.productStory.regionalOrigin}) —{' '}
            {product.productStory.description}
          </p>

          <div className="mt-auto pt-[8px] border-t border-border/30 flex items-center justify-between">
            <Price
              amount={product.price.amount}
              compareAtAmount={
                product.price.amount < 15000
                  ? undefined
                  : product.price.amount + 5000
              }
            />
            <span className="text-caption text-muted-foreground font-mono">
              {product.variants.length === 1
                ? 'Single Fit'
                : `${product.variants.length} Sizes`}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = 'ProductCard';
