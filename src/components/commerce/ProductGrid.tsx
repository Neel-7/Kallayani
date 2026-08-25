import * as React from 'react';
import { cn } from 'src/lib/utils';
import { type Product } from 'src/types/product';

import { ProductCard } from './ProductCard';

export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
}

/**
 * ProductGrid is a responsive container layout that displays lists of ProductCards.
 * Reflows 2 -> 3 -> 4 columns matching Section 23 token breakpoints perfectly.
 *
 * Breakpoints utilized:
 * - base (mobile): 2 columns (grid-cols-2)
 * - md (tablet/desktop-sm, >= 1024px): 3 columns (md:grid-cols-3)
 * - lg (desktop-md/lg, >= 1280px): 4 columns (lg:grid-cols-4)
 */
export const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ className, products, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] md:gap-[24px]',
          className,
        )}
        {...props}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  },
);

ProductGrid.displayName = 'ProductGrid';
