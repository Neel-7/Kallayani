import { Heart } from 'lucide-react';
import * as React from 'react';
import { Button } from 'src/components/ui/button';
import { useWishlist } from 'src/features/wishlist/useWishlist';
import { toggleWishlist } from 'src/features/wishlist/wishlistSlice';
import { useToast } from 'src/hooks/use-toast';
import { cn } from 'src/lib/utils';
import { useAppDispatch } from 'src/store/hooks';

export interface WishlistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId: string;
  variant?: 'icon' | 'button';
  productName?: string; // used for custom toast alerts
}

/**
 * WishlistButton is a unified commerce controller per M11 constraints.
 *
 * STRICT ARCHITECTURAL RULE:
 * This is exactly ONE component definition with a consistent props contract. It is shared
 * directly across both ProductCard (absolute floating icon) and ProductPage (full buy-box CTA).
 */
export function WishlistButton({
  className,
  productId,
  variant = 'icon',
  productName = 'Product',
  ...props
}: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const { isWishlisted } = useWishlist();
  const { toast } = useToast();

  const active = isWishlisted(productId);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigations inside parent ProductCard Link anchors!
    e.stopPropagation(); // Prevent card bubble clicks!
    dispatch(toggleWishlist(productId));

    toast({
      title: active ? 'Removed from Wishlist' : 'Saved to Wishlist',
      description: active
        ? `"${productName}" has been removed from your saved items.`
        : `"${productName}" has been saved to your Wishlist.`,
    });
  };

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        onClick={handleToggle}
        className={cn(
          'w-full h-[56px] text-body-sm font-bold border-border/80 flex items-center justify-center gap-[8px]',
          active
            ? 'bg-secondary/10 text-primary-text border-secondary/20 hover:bg-secondary/20'
            : 'hover:bg-muted-surface',
          className,
        )}
        {...props}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-colors',
            active ? 'fill-primary text-primary' : 'text-foreground',
          )}
        />
        {active ? 'Remove from Wishlist' : 'Save to Wishlist'}
      </Button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'p-[10px] rounded-full border bg-surface/90 hover:bg-surface shadow-sm border-border/40 hover:scale-105 transition-transform duration-200 flex items-center justify-center cursor-pointer',
        className,
      )}
      aria-label={active ? 'Remove from Wishlist' : 'Add to Wishlist'}
      {...props}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-colors',
          active
            ? 'fill-primary text-primary'
            : 'text-muted-foreground hover:text-foreground',
        )}
      />
    </button>
  );
}
