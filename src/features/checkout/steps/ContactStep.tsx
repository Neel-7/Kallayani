import * as React from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { useAppDispatch } from 'src/store/hooks';

import { setStep, updateFormData } from '../checkoutSlice';

export interface ContactStepProps {
  email: string;
}

export function ContactStep({ email }: ContactStepProps) {
  const dispatch = useAppDispatch();
  const [val, setVal] = React.useState(email);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!val || !val.includes('@')) {
      setError('Please enter a valid guest email address.');
      return;
    }
    dispatch(updateFormData({ email: val }));
    dispatch(setStep('shipping'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-[20px] select-none">
      <div className="space-y-[8px]">
        <h3 className="text-body-md font-bold text-primary font-display uppercase tracking-wider">
          Contact Information
        </h3>
        <p className="text-caption text-muted-foreground">
          Checking out as a guest. Enter your email to receive order tracking
          updates.
        </p>
      </div>

      <div className="space-y-[6px]">
        <label
          htmlFor="email"
          className="block text-caption font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="e.g. sarah.artisan@email.com"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setError(null);
          }}
          className="h-[44px]"
        />
        {error && (
          <p className="text-caption font-semibold text-error">{error}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-[48px] bg-primary text-surface font-semibold hover:bg-primary-text"
      >
        Continue to Shipping Address
      </Button>
    </form>
  );
}
export default ContactStep;
