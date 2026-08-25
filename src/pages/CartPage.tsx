import { Heart, Sparkles } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from 'src/components/commerce/CartItem';
import { OrderSummary } from 'src/components/commerce/OrderSummary';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { useCart } from 'src/features/cart/useCart';
import { useWishlist } from 'src/features/wishlist/useWishlist';
import { toggleWishlist } from 'src/features/wishlist/wishlistSlice';
import { useAppDispatch } from 'src/store/hooks';

/**
 * CartPage replaces M5's basic placeholder with an interactive cart,
 * supporting derived calculation summaries, mock coupon inputs,
 * order notes, and cross-state "move to wishlist" triggers.
 */
export default function CartPage() {
  const dispatch = useAppDispatch();
  const { hydratedItems, subtotal, changeQuantity, removeItem } = useCart();
  const { isWishlisted } = useWishlist();

  // Local state for Mock Promo Code functionality
  const [promoInput, setPromoInput] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [promoError, setPromoError] = React.useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = React.useState<string | null>(null);

  // Local state for Order Notes
  const [orderNotes, setOrderNotes] = React.useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();

    if (cleanCode === 'SAVE10') {
      // Mock Succeeds: Gives a $10.00 discount
      setDiscount(1000);
      setPromoSuccess(
        'Coupon "SAVE10" successfully applied! $10.00 has been deducted from your order.',
      );
      setPromoError(null);
    } else if (cleanCode === '') {
      setPromoError('Please enter a coupon code.');
      setPromoSuccess(null);
      setDiscount(0);
    } else {
      // Mock Fails: Shows raw validation error cleanly
      setPromoError(
        'Promo code is invalid, expired, or does not meet minimum order thresholds.',
      );
      setPromoSuccess(null);
      setDiscount(0);
    }
  };

  const handleMoveToWishlist = (productId: string, variantId: string) => {
    // 1. If not already wishlisted, toggle/add it using M11's actual wishlist slice/actions!
    if (!isWishlisted(productId)) {
      dispatch(toggleWishlist(productId));
    }
    // 2. Remove from cart immediately
    removeItem(productId, variantId);
  };

  return (
    <Container className="py-[48px] space-y-[32px]">
      <header className="border-b border-border/60 pb-[24px]">
        <SectionHeading
          title="Your Cart"
          description="Couture collection selections prepared for secure transactional drapes."
          align="left"
        />
      </header>

      {hydratedItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px] items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 divide-y divide-border/25 border border-border/50 rounded-soft bg-surface p-[24px]">
            {hydratedItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={(qty) =>
                  changeQuantity(item.product.id, item.selectedVariant.id, qty)
                }
                onRemove={() =>
                  removeItem(item.product.id, item.selectedVariant.id)
                }
                actionSlot={
                  <Button
                    variant="link"
                    onClick={() =>
                      handleMoveToWishlist(
                        item.product.id,
                        item.selectedVariant.id,
                      )
                    }
                    className="p-0 h-auto text-caption font-semibold text-primary flex items-center gap-[6px]"
                  >
                    <Heart className="h-3.5 w-3.5" /> Move to Wishlist
                  </Button>
                }
              />
            ))}
          </div>

          {/* Right Column: Order Summary & Coupon Fields */}
          <div className="space-y-[24px]">
            {/* Promo Code Input Field Box */}
            <div className="p-[24px] rounded-soft border border-border/60 bg-surface space-y-[12px] shadow-sm">
              <h4 className="text-body-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-[6px]">
                <Sparkles className="h-4 w-4" /> Promotional Coupon
              </h4>
              <p className="text-caption text-muted-foreground">
                Enter code{' '}
                <code className="font-bold text-foreground">SAVE10</code> to
                unlock $10.00 off.
              </p>
              <form onSubmit={handleApplyPromo} className="flex gap-[8px]">
                <Input
                  type="text"
                  placeholder="Coupon code..."
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="secondary">
                  Apply
                </Button>
              </form>

              {promoError && (
                <p className="text-caption font-semibold text-error">
                  {promoError}
                </p>
              )}
              {promoSuccess && (
                <p className="text-caption font-semibold text-success">
                  {promoSuccess}
                </p>
              )}
            </div>

            {/* Order Notes Block */}
            <div className="p-[24px] rounded-soft border border-border/60 bg-surface space-y-[12px] shadow-sm">
              <h4 className="text-body-sm font-bold uppercase tracking-wider text-muted-foreground">
                Order Notes
              </h4>
              <textarea
                placeholder="Gift wrap requests, special weavers notes, or delivery instructions..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full h-[80px] p-[12px] rounded-soft border border-border bg-background text-body-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Calculations Summary block */}
            <OrderSummary subtotal={subtotal} discountAmount={discount} />

            {/* Checkout Trigger button */}
            <Button
              asChild
              className="w-full h-[56px] text-body-sm font-bold bg-primary hover:bg-primary-text text-surface flex items-center justify-center gap-[8px]"
            >
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      ) : (
        <EmptyState
          title="Your shopping cart is currently empty"
          description="Bespoke hand-woven edits, kurtas, and premium jewelry selections you place in your bag will appear here."
          action={
            <Button asChild>
              <Link to="/women">Explore Curation</Link>
            </Button>
          }
        />
      )}
    </Container>
  );
}
