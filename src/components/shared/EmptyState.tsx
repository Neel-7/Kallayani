import * as React from 'react';
import { cn } from 'src/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  /** Optional slot allowing callers to render any CTA element (button, link, etc.) */
  action?: React.ReactNode;
}

/**
 * EmptyState is a generic, presentational placeholder for empty contexts (e.g. empty wishlist, empty cart, empty search).
 * It remains entirely cross-domain and does not hardcode any domain-specific copies or actions.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center p-[48px] border border-dashed border-border rounded-soft bg-surface/50 max-w-[480px] mx-auto gap-[16px]',
          className,
        )}
        {...props}
      >
        <div className="space-y-[8px]">
          <h3 className="text-heading-sm font-display text-foreground font-semibold">
            {title}
          </h3>
          <p className="text-body-sm text-muted-foreground">{description}</p>
        </div>
        {action && <div className="mt-[8px]">{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
