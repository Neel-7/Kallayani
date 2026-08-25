import { CheckCircle2, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { clearCart } from 'src/features/cart/cartSlice';
import { useAppDispatch } from 'src/store/hooks';

import { resetCheckout } from '../checkoutSlice';

export interface ConfirmationStepProps {
  orderNumber: string;
}

/**
 * ConfirmationStep renders the post-purchase details upon successful checkout per §14.
 *
 * CORE ARCHITECTURAL RULE:
 * This component is the SINGLE designated location where the shopping bag / cart cache is cleared
 * (on mount, only here, only on successful transaction completion).
 */
export function ConfirmationStep({ orderNumber }: ConfirmationStepProps) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // Clear the cart only upon successful, verified order confirmation mount
    dispatch(clearCart());
  }, [dispatch]);

  const handleContinueShopping = () => {
    dispatch(resetCheckout());
  };

  return (
    <div className="text-center py-[24px] space-y-[24px] max-w-[480px] mx-auto select-none">
      <div className="flex flex-col items-center gap-[12px]">
        <CheckCircle2 className="h-16 w-16 text-success animate-bounce" />
        <h3 className="text-heading-lg font-display text-primary-text font-bold">
          Order Confirmed
        </h3>
        <p className="text-body-sm text-muted-foreground leading-relaxed">
          Thank you for choosing Kallayani. Your couture order has been securely
          placed and sent to our weavers.
        </p>
      </div>

      {/* Order Number Details Card */}
      <div className="p-[20px] bg-muted-surface border border-border/80 rounded-soft space-y-[4px]">
        <span className="block text-caption uppercase tracking-wider text-muted-foreground font-semibold">
          Order Number
        </span>
        <span className="block text-body-md font-mono font-bold text-foreground">
          {orderNumber}
        </span>
        <span className="block text-caption text-muted-foreground pt-[4px]">
          A tracking receipt and package summary has been sent to your email.
        </span>
      </div>

      {/* Account Creation Stub Option (M18/M19) */}
      <div className="border border-border rounded-soft p-[16px] text-left space-y-[12px]">
        <h4 className="text-body-sm font-semibold">
          Save your details for later?
        </h4>
        <p className="text-caption text-muted-foreground">
          Create an account using your checkout information to speed up future
          purchases, manage address books, and track packages in real-time.
        </p>
        <Button
          variant="outline"
          className="w-full text-caption h-[36px] font-semibold hover:bg-muted-surface border-border/80"
          onClick={() =>
            alert(
              'Account Sign-up Stub triggered. Real signup will be implemented in M18/M19.',
            )
          }
        >
          Create Kallayani Account
        </Button>
      </div>

      {/* Continue shopping button */}
      <Button
        asChild
        onClick={handleContinueShopping}
        className="w-full h-[48px] bg-primary text-surface font-semibold hover:bg-primary-text flex items-center justify-center gap-[8px]"
      >
        <Link to="/women">
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
export default ConfirmationStep;
