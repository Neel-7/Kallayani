import React, { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { useToast } from 'src/hooks/use-toast';
import { cn } from 'src/lib/utils';

export interface NewsletterCaptureProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

/**
 * NewsletterCapture represents the final editorial touchpoint of the homepage per §12.
 * Strictly uses local component state (no Redux slice) as it is a fire-and-forget form.
 * Shows visual success feedback via standard premium Toast notifications.
 */
export function NewsletterCapture({
  title = 'Join the Kallayani Register',
  description = 'Subscribe to receive early invitations to private trunk shows, limited fabric arrivals, and our curated luxury lookbooks.',
  className,
  ...props
}: NewsletterCaptureProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: 'Subscription Failed',
        description: 'Please provide a valid email address to register.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    // Simulating subscription API request
    setTimeout(() => {
      toast({
        title: 'Welcome to the Register',
        description: 'You have been successfully subscribed to our curated heritage news feed.',
      });
      setEmail('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div
      className={cn(
        'max-w-[760px] mx-auto text-center p-[40px] md:p-[64px] border border-border/60 rounded-soft bg-surface/50 space-y-[24px] font-sans',
        className
      )}
      {...props}
    >
      <div className="space-y-[8px]">
        <h3 className="text-heading-md font-bold text-primary-text tracking-tight">
          {title}
        </h3>
        <p className="text-body-sm text-muted-foreground leading-relaxed max-w-[560px] mx-auto">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-[12px] max-w-[480px] mx-auto">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-background h-[46px]"
          required
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting} className="h-[46px] rounded-soft font-semibold px-[24px] shrink-0">
          {isSubmitting ? 'Registering...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}
