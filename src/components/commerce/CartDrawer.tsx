import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from 'src/components/ui/sheet';
import { FREE_SHIPPING_THRESHOLD } from 'src/features/cart/cartSelectors';
import { useCart } from 'src/features/cart/useCart';
import { formatPrice } from 'src/lib/formatPrice';

import { CartItem } from './CartItem';
import { EmptyState } from '../shared/EmptyState';

/**
 * CartDrawer is a responsive side drawer shopping bag per §16.
 * Composes the themed shadcn/ui Sheet primitive.
 * Includes derived totals, free shipping meters, and redirects to full cart page.
 */
export function CartDrawer() {
  const {
    hydratedItems,
    isDrawerOpen,
    setOpen,
    subtotal,
    freeShippingProgress,
    changeQuantity,
    removeItem,
  } = useCart();

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[440px] flex flex-col h-full p-0"
      >
        <SheetHeader className="p-[24px] border-b border-border/40 text-left">
          <SheetTitle className="font-display text-primary text-heading-sm flex items-center gap-[8px]">
            <ShoppingBag className="h-24 w-24" /> Your Shopping Bag (
            {hydratedItems.length})
          </SheetTitle>
          <SheetDescription className="text-caption">
            Review your couture selections before final transaction flows.
          </SheetDescription>
        </SheetHeader>

        {/* 1. Free Shipping Progress Indicator Bar */}
        {hydratedItems.length > 0 && (
          <div className="px-[24px] py-[12px] bg-muted-surface/50 border-b border-border/20 space-y-[8px]">
            <p className="text-caption font-medium">
              {isFreeShipping ? (
                <span className="text-success font-bold">
                  Congratulations! You've unlocked free standard shipping.
                </span>
              ) : (
                <span>
                  You are{' '}
                  <span className="font-bold text-primary-text">
                    {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}
                  </span>{' '}
                  away from <strong>complimentary standard delivery</strong>.
                </span>
              )}
            </p>
            <div className="w-full h-1.5 bg-border/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-all duration-500 ease-out-in"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* 2. Scrollable Line Items Space */}
        <div className="flex-1 overflow-y-auto px-[24px] divide-y divide-border/25">
          {hydratedItems.length > 0 ? (
            hydratedItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={(qty) =>
                  changeQuantity(item.product.id, item.selectedVariant.id, qty)
                }
                onRemove={() =>
                  removeItem(item.product.id, item.selectedVariant.id)
                }
              />
            ))
          ) : (
            <div className="py-[64px] flex items-center justify-center">
              <EmptyState
                title="Your bag is empty"
                description="Bespoke hand-woven edits and accessories you select will appear inside your bag."
                action={
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Continue Shopping
                  </Button>
                }
              />
            </div>
          )}
        </div>

        {/* 3. Sticky Bottom Checkout Segment */}
        {hydratedItems.length > 0 && (
          <div className="p-[24px] border-t border-border/40 bg-surface space-y-[16px] mt-auto">
            <div className="flex justify-between items-baseline text-body-md">
              <span className="text-muted-foreground font-medium">
                Estimated Subtotal
              </span>
              <span className="font-mono font-bold text-primary-text text-heading-sm">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="text-caption text-muted-foreground">
              Taxes, shipping fees, and promotional coupon discounts are
              computed inside the full cart page.
            </p>

            <div className="space-y-[12px]">
              <Button
                asChild
                className="w-full h-[48px] text-body-sm font-semibold bg-primary hover:bg-primary-text text-surface flex items-center justify-center gap-[8px]"
              >
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight className="h-16 w-16" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full h-[48px] text-body-sm font-semibold border-border/80 flex items-center justify-center"
              >
                <Link to="/cart">View Full Bag</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
