import * as React from 'react';
import { FREE_SHIPPING_THRESHOLD } from 'src/features/cart/cartSelectors';
import { formatPrice } from 'src/lib/formatPrice';
import { cn } from 'src/lib/utils';

import { Price } from '../shared/Price';

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  subtotal: number; // in whole cents
  discountAmount?: number; // optional discount in cents (from promo codes)
  shippingAmount?: number; // optional overridden shipping fee in cents
  taxAmount?: number; // optional tax in cents
}

/**
 * OrderSummary is a presentational totals calculations card per §16.
 * Completely generic and decoupled so it can be directly composed inside both
 * CartPage (M12) and CheckoutPage (M13) without duplication.
 */
export function OrderSummary({
  className,
  subtotal,
  discountAmount = 0,
  shippingAmount,
  taxAmount = 0,
  ...props
}: OrderSummaryProps) {
  // Determine shipping cost dynamically:
  // If no shippingAmount override is provided, we calculate standard or free shipping
  const calculatedShipping =
    shippingAmount !== undefined
      ? shippingAmount
      : subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : 1500; // Standard shipping is $15.00 in whole cents

  const total = Math.max(
    0,
    subtotal - discountAmount + calculatedShipping + taxAmount,
  );

  return (
    <div
      className={cn(
        'p-[24px] rounded-soft border border-border/60 bg-surface space-y-[16px] shadow-sm select-none',
        className,
      )}
      {...props}
    >
      <h3 className="text-body-md font-bold uppercase tracking-wider text-primary border-b border-border/40 pb-[8px]">
        Order Summary
      </h3>

      <div className="space-y-[12px] text-body-sm font-medium">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <Price amount={subtotal} className="font-semibold" />
        </div>

        {/* Promo Discount (only rendered if discount is active) */}
        {discountAmount > 0 && (
          <div className="flex justify-between text-success">
            <span>Promo Discount</span>
            <span className="font-mono font-semibold">
              -{formatPrice(discountAmount)}
            </span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          {calculatedShipping === 0 ? (
            <span className="font-semibold text-success font-mono uppercase text-caption tracking-wider">
              Free
            </span>
          ) : (
            <Price amount={calculatedShipping} className="font-semibold" />
          )}
        </div>

        {/* Tax (rendered if greater than zero) */}
        {taxAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Tax</span>
            <Price amount={taxAmount} className="font-semibold" />
          </div>
        )}

        {/* Total boundary row */}
        <div className="border-t border-border mt-[16px] pt-[16px] flex justify-between text-body-md font-bold">
          <span>Estimated Total</span>
          <Price amount={total} className="text-primary-text" />
        </div>
      </div>
    </div>
  );
}
