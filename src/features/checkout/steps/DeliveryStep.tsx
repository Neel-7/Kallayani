import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';
import { useAppDispatch } from 'src/store/hooks';

import {
  setStep,
  updateFormData,
  type CheckoutFormData,
} from '../checkoutSlice';

export interface DeliveryStepProps {
  formData: CheckoutFormData;
  isFreeShipping: boolean;
}

export function DeliveryStep({ formData, isFreeShipping }: DeliveryStepProps) {
  const dispatch = useAppDispatch();
  const activeMethod = formData.shippingMethod;

  const handleSelectMethod = (method: string) => {
    dispatch(updateFormData({ shippingMethod: method }));
  };

  const handleNext = () => {
    dispatch(setStep('payment'));
  };

  return (
    <div className="space-y-[24px] select-none">
      <div className="space-y-[8px]">
        <h3 className="text-body-md font-bold text-primary font-display uppercase tracking-wider">
          Delivery Options
        </h3>
        <p className="text-caption text-muted-foreground">
          Select your preferred transit method. All items are packaged in
          protective drapes.
        </p>
      </div>

      <div className="space-y-[12px]">
        {/* Standard Shipping Option */}
        <button
          onClick={() => handleSelectMethod('standard')}
          className={cn(
            'w-full p-[16px] border rounded-soft text-left flex items-center justify-between gap-[16px] transition-all cursor-pointer',
            activeMethod === 'standard'
              ? 'border-primary bg-primary/5 font-semibold'
              : 'border-border hover:bg-muted-surface',
          )}
        >
          <div className="space-y-[2px]">
            <span className="block text-body-sm font-semibold">
              Standard Shipping
            </span>
            <span className="block text-caption text-muted-foreground">
              Delivers in 3–5 business days
            </span>
          </div>
          <span className="text-body-sm font-bold font-mono">
            {isFreeShipping ? 'FREE' : '$15.00'}
          </span>
        </button>

        {/* Express Shipping Option */}
        <button
          onClick={() => handleSelectMethod('express')}
          className={cn(
            'w-full p-[16px] border rounded-soft text-left flex items-center justify-between gap-[16px] transition-all cursor-pointer',
            activeMethod === 'express'
              ? 'border-primary bg-primary/5 font-semibold'
              : 'border-border hover:bg-muted-surface',
          )}
        >
          <div className="space-y-[2px]">
            <span className="block text-body-sm font-semibold">
              Express Shipping
            </span>
            <span className="block text-caption text-muted-foreground">
              Delivers in 1–2 business days
            </span>
          </div>
          <span className="text-body-sm font-bold font-mono">$25.00</span>
        </button>
      </div>

      <div className="flex gap-[12px] pt-[8px]">
        <Button
          variant="outline"
          onClick={() => dispatch(setStep('shipping'))}
          className="w-1/3 h-[48px] border-border/80"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 h-[48px] bg-primary text-surface font-semibold hover:bg-primary-text"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}

export default DeliveryStep;
