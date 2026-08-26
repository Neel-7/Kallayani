import React from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from 'src/components/commerce/ProductGrid';
import { ScrollReveal } from 'src/components/shared/ScrollReveal';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';
import { type Product } from 'src/types/product';

export interface CollectionFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  products: Product[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * CollectionFeature displays curated catalogs with context-rich headers per §12.
 * Reuses SectionHeading and ProductGrid.
 *
 * NOTE: ScrollReveal is applied ONLY to the heading block, explicitly bypassing
 * individual cards inside ProductGrid to satisfy section §24 mandates.
 */
export function CollectionFeature({
  title,
  description,
  products,
  ctaLabel,
  ctaHref,
  className,
  ...props
}: CollectionFeatureProps) {
  return (
    <div className={cn('space-y-[32px] md:space-y-[48px] font-sans', className)} {...props}>
      <ScrollReveal>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-[24px]">
          <div className="max-w-[640px]">
            <SectionHeading
              title={title}
              description={description}
              align="left"
            />
          </div>
          {ctaLabel && ctaHref && (
            <Button asChild variant="outline" className="w-fit shrink-0 rounded-soft font-semibold px-[24px] h-[44px]">
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
          )}
        </header>
      </ScrollReveal>

      {/* ProductGrid cards remain flat, without scroll-reveal transitions per §24 guidelines */}
      <ProductGrid products={products} />
    </div>
  );
}
