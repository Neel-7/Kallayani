import * as React from 'react';
import { formatPrice } from 'src/lib/formatPrice';
import { cn } from 'src/lib/utils';

export interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The currency amount in whole cents (e.g. 2900 represents $29.00) */
  amount: number;
  /** Optional original price in cents to render a strikethrough comparison */
  compareAtAmount?: number;
  /** ISO 4217 Currency Code (defaults to 'USD') */
  currency?: string;
}

/**
 * Price is a presentational component that formats price amounts cleanly.
 *
 * NOTE: Amount props are in whole cents to prevent floating-point multiplication inaccuracies.
 * This component remains strictly presentational and does not import any product or checkout types.
 */
export const Price = React.forwardRef<HTMLDivElement, PriceProps>(
  ({ className, amount, compareAtAmount, currency = 'USD', ...props }, ref) => {
    const isDiscounted =
      compareAtAmount !== undefined && compareAtAmount > amount;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-baseline gap-[8px] font-mono text-body-md',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'font-semibold text-foreground',
            isDiscounted && 'text-primary-text',
          )}
        >
          {formatPrice(amount, currency)}
        </span>
        {isDiscounted && (
          <span className="text-body-sm text-muted-foreground line-through decoration-muted-foreground/60">
            {formatPrice(compareAtAmount, currency)}
          </span>
        )}
      </div>
    );
  },
);

Price.displayName = 'Price';
