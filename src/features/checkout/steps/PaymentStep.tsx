import * as React from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { type CartLineItem } from 'src/features/cart/cartSlice';
import { useAppDispatch } from 'src/store/hooks';

import { usePlaceOrderMutation } from '../checkoutApi';
import {
  setPlacedOrder,
  setStep,
  type CheckoutFormData,
} from '../checkoutSlice';

export interface PaymentStepProps {
  formData: CheckoutFormData;
  items: CartLineItem[];
}

export function PaymentStep({ formData, items }: PaymentStepProps) {
  const dispatch = useAppDispatch();
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const [cardName, setCardName] = React.useState(
    formData.cardName || `${formData.firstName} ${formData.lastName}`,
  );
  const [cardNumber, setCardNumber] = React.useState(formData.cardNumber);
  const [cardExpiry, setCardExpiry] = React.useState(formData.cardExpiry);
  const [cardCvv, setCardCvv] = React.useState(formData.cardCvv);

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      setError(
        'Required payment fields are missing. Please complete the card form.',
      );
      return;
    }

    try {
      const result = await placeOrder({
        items,
        email: formData.email,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        billingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          addressLine1: formData.addressLine1,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
        shippingMethod: formData.shippingMethod,
        paymentInfo: {
          cardName,
          cardNumber,
          cardExpiry,
          cardCvv,
        },
      }).unwrap();

      if (result.success && result.orderNumber) {
        dispatch(setPlacedOrder(result.orderNumber));
        dispatch(setStep('confirmation'));
      }
    } catch (err) {
      const errPayload = err as { data?: { error?: { message?: string } } };
      const serverErrorMessage =
        errPayload.data?.error?.message ||
        'Connection timed out. Order placement failed.';
      setError(serverErrorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-[20px] select-none">
      <div className="space-y-[8px]">
        <h3 className="text-body-md font-bold text-primary font-display uppercase tracking-wider">
          Payment Information
        </h3>
        <p className="text-caption text-muted-foreground">
          Simulated secure payment gateway. Enter credit card credentials below.
        </p>
      </div>

      <div className="space-y-[12px]">
        {/* Card Name */}
        <div className="space-y-[6px]">
          <label
            htmlFor="cardName"
            className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Name on Card
          </label>
          <Input
            id="cardName"
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value);
              setError(null);
            }}
            className="h-[44px]"
          />
        </div>

        {/* Card Number */}
        <div className="space-y-[6px]">
          <label
            htmlFor="cardNumber"
            className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Card Number
          </label>
          <Input
            id="cardNumber"
            placeholder="e.g. 4111 2222 3333 4444"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.target.value);
              setError(null);
            }}
            className="h-[44px]"
          />
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="space-y-[6px]">
            <label
              htmlFor="cardExpiry"
              className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Expiry Date
            </label>
            <Input
              id="cardExpiry"
              placeholder="e.g. MM/YY"
              value={cardExpiry}
              onChange={(e) => {
                setCardExpiry(e.target.value);
                setError(null);
              }}
              className="h-[44px]"
            />
          </div>
          <div className="space-y-[6px]">
            <label
              htmlFor="cardCvv"
              className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Security Code (CVV)
            </label>
            <Input
              id="cardCvv"
              type="password"
              maxLength={4}
              placeholder="e.g. 123"
              value={cardCvv}
              onChange={(e) => {
                setCardCvv(e.target.value);
                setError(null);
              }}
              className="h-[44px]"
            />
          </div>
        </div>
      </div>

      {/* Trust Signal */}
      <div className="p-[12px] bg-muted-surface border border-border rounded-soft text-caption text-muted-foreground">
        🔒 SSL Secured Checkout. Your card details are fully encrypted. Returns
        are accepted within 14 days of delivery.
      </div>

      {/* Error State Banner */}
      {error && (
        <div className="p-[16px] rounded-soft bg-error/10 text-error text-body-sm font-semibold border border-error/20 leading-relaxed animate-pulse">
          {error}
        </div>
      )}

      <div className="flex gap-[12px] pt-[8px]">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(setStep('delivery'))}
          className="w-1/3 h-[48px] border-border/80"
        >
          Back
        </Button>
        <Button
          disabled={isLoading}
          type="submit"
          className="flex-1 h-[48px] bg-primary text-surface font-semibold hover:bg-primary-text"
        >
          {isLoading ? 'Processing Transaction...' : 'Place Order & Complete'}
        </Button>
      </div>
    </form>
  );
}
export default PaymentStep;
