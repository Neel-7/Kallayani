import * as React from 'react';
import { cn } from 'src/lib/utils';

export type BadgeStatus = 'new' | 'low_stock' | 'out_of_stock';

export interface StockBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus | null;
}

/**
 * StockBadge is a themed commerce indicator per blueprint §30.
 * Ensures a single, consistent structural layout for all stock/department badges.
 *
 * PRIORITY ORDER RULE (Documented in accordance with M8 constraints):
 * If multiple statuses apply to a single product, the display priority order is:
 * 1. OUT_OF_STOCK (highest priority — critical transaction block)
 * 2. LOW_STOCK (secondary priority — urgent checkout call)
 * 3. NEW (lowest priority — informational tag)
 */
export function StockBadge({ className, status, ...props }: StockBadgeProps) {
  if (!status) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center px-[8px] py-[4px] rounded-soft text-caption font-semibold uppercase tracking-wider border select-none',
        {
          'bg-error/10 text-error border-error/20': status === 'out_of_stock',
          'bg-warning/10 text-warning border-warning/20':
            status === 'low_stock',
          'bg-secondary/10 text-secondary border-secondary/20':
            status === 'new',
        },
        className,
      )}
      {...props}
    >
      {status === 'out_of_stock' && 'Sold Out'}
      {status === 'low_stock' && 'Low Stock'}
      {status === 'new' && 'New in'}
    </span>
  );
}
