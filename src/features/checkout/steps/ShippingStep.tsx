import * as React from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { useAppDispatch } from 'src/store/hooks';

import {
  setStep,
  updateFormData,
  type CheckoutFormData,
} from '../checkoutSlice';

export interface ShippingStepProps {
  formData: CheckoutFormData;
}

export function ShippingStep({ formData }: ShippingStepProps) {
  const dispatch = useAppDispatch();
  const [fields, setFields] = React.useState({
    firstName: formData.firstName,
    lastName: formData.lastName,
    addressLine1: formData.addressLine1,
    city: formData.city,
    state: formData.state,
    postalCode: formData.postalCode,
    phone: formData.phone,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, val: string) => {
    setFields((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!fields.firstName) newErrors.firstName = 'First name is required.';
    if (!fields.lastName) newErrors.lastName = 'Last name is required.';
    if (!fields.addressLine1)
      newErrors.addressLine1 = 'Street address is required.';
    if (!fields.city) newErrors.city = 'City is required.';
    if (!fields.state) newErrors.state = 'State is required.';
    if (!fields.postalCode) newErrors.postalCode = 'Postal code is required.';
    if (!fields.phone) newErrors.phone = 'Phone number is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(updateFormData(fields));
    dispatch(setStep('delivery'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-[20px] select-none">
      <div className="space-y-[8px]">
        <h3 className="text-body-md font-bold text-primary font-display uppercase tracking-wider">
          Shipping Address
        </h3>
        <p className="text-caption text-muted-foreground">
          Enter destination details for standard premium packaging drapes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-[12px]">
        <div className="space-y-[6px]">
          <label
            htmlFor="firstName"
            className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
          >
            First Name
          </label>
          <Input
            id="firstName"
            value={fields.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="h-[44px]"
          />
          {errors.firstName && (
            <p className="text-caption text-error font-semibold">
              {errors.firstName}
            </p>
          )}
        </div>
        <div className="space-y-[6px]">
          <label
            htmlFor="lastName"
            className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Last Name
          </label>
          <Input
            id="lastName"
            value={fields.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="h-[44px]"
          />
          {errors.lastName && (
            <p className="text-caption text-error font-semibold">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-[6px]">
        <label
          htmlFor="addressLine1"
          className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Street Address
        </label>
        <Input
          id="addressLine1"
          placeholder="e.g. 1500 Couture Silk Lane"
          value={fields.addressLine1}
          onChange={(e) => handleChange('addressLine1', e.target.value)}
          className="h-[44px]"
        />
        {errors.addressLine1 && (
          <p className="text-caption text-error font-semibold">
            {errors.addressLine1}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-[12px]">
        <div className="space-y-[6px]">
          <label
            htmlFor="city"
            className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
          >
            City
          </label>
          <Input
            id="city"
            value={fields.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="h-[44px]"
          />
          {errors.city && (
            <p className="text-caption text-error font-semibold">
              {errors.city}
            </p>
          )}
        </div>
        <div className="space-y-[6px]">
          <label
            htmlFor="state"
            className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
          >
            State
          </label>
          <Input
            id="state"
            value={fields.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="h-[44px]"
          />
          {errors.state && (
            <p className="text-caption text-error font-semibold">
              {errors.state}
            </p>
          )}
        </div>
        <div className="space-y-[6px]">
          <label
            htmlFor="postalCode"
            className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Postal Code
          </label>
          <Input
            id="postalCode"
            value={fields.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className="h-[44px]"
          />
          {errors.postalCode && (
            <p className="text-caption text-error font-semibold">
              {errors.postalCode}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-[6px]">
        <label
          htmlFor="phone"
          className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="e.g. 555-0199"
          value={fields.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="h-[44px]"
        />
        {errors.phone && (
          <p className="text-caption text-error font-semibold">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="flex gap-[12px] pt-[8px]">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(setStep('contact'))}
          className="w-1/3 h-[48px] border-border/80"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 h-[48px] bg-primary text-surface font-semibold hover:bg-primary-text"
        >
          Continue to Delivery
        </Button>
      </div>
    </form>
  );
}
export default ShippingStep;
