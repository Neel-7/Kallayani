import * as React from 'react';
import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';

export interface LoadMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  hasMore: boolean;
  loadingText?: string;
  endMessage?: string;
}

/**
 * LoadMoreButton wraps the standard Button primitive to handle listing pagination states.
 * It strictly adheres to accessibility specs by declaring aria-busy and disabled states correctly.
 */
export const LoadMoreButton = React.forwardRef<
  HTMLButtonElement,
  LoadMoreButtonProps
>(
  (
    {
      className,
      onClick,
      isLoading = false,
      hasMore,
      loadingText = 'Loading...',
      endMessage = 'Showing all items',
      ...props
    },
    ref,
  ) => {
    if (!hasMore) {
      return (
        <div className="text-center py-[16px] text-body-sm text-muted-foreground italic">
          {endMessage}
        </div>
      );
    }

    return (
      <div className="flex justify-center w-full py-[24px]">
        <Button
          ref={ref}
          onClick={onClick}
          disabled={isLoading}
          aria-busy={isLoading}
          className={cn('min-w-[160px]', className)}
          {...props}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-[8px]">
              {/* Spinner icon */}
              <svg
                className="animate-spin h-16 w-16 text-current"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {loadingText}
            </span>
          ) : (
            'Load More'
          )}
        </Button>
      </div>
    );
  },
);

LoadMoreButton.displayName = 'LoadMoreButton';
