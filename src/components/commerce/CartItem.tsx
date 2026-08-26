import { Minus, Plus, Trash2 } from 'lucide-react';
import * as React from 'react';
import { cn } from 'src/lib/utils';
import { type CartItem as CartItemType } from 'src/types/cart';

import { Price } from '../shared/Price';
import { ResponsiveImage } from '../shared/ResponsiveImage';

export interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: CartItemType;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  actionSlot?: React.ReactNode; // Optional slot for cart-page-only actions like "move to wishlist"
}

/**
 * CartItem is a unified, presentational row representing products inside bags/drawers per §16.
 * Reuses M4 ResponsiveImage and Price components, exposing quantity triggers.
 */
export function CartItem({
  className,
  item,
  onQuantityChange,
  onRemove,
  actionSlot,
  ...props
}: CartItemProps) {
  const { product, selectedVariant, quantity } = item;

  return (
    <div
      className={cn(
        'flex gap-[16px] py-[16px] border-b border-border/40 last:border-0 items-start w-full',
        className,
      )}
      {...props}
    >
      {/* Product Portrait Image wrapper */}
      <div className="w-[80px] shrink-0">
        <ResponsiveImage
          src={product.images[0]?.['4:5'] || ''}
          alt={product.name}
          aspectRatio="4:5"
          className="w-full object-cover rounded-soft"
        />
      </div>

      {/* Details column */}
      <div className="flex-1 min-w-0 flex flex-col gap-[4px] self-stretch justify-between">
        <div className="space-y-[2px]">
          <div className="flex justify-between items-start gap-[8px]">
            <h4 className="text-body-sm font-semibold tracking-tight text-foreground truncate max-w-[200px]">
              {product.name}
            </h4>
            <button
              onClick={onRemove}
              className="text-muted-foreground hover:text-error transition-colors p-[4px] cursor-pointer"
              aria-label={`Remove ${product.name} from bag`}
            >
              <Trash2 className="h-16 w-16" />
            </button>
          </div>
          <p className="text-caption text-muted-foreground font-mono">
            Size: {selectedVariant.size} | Color: {selectedVariant.color}
          </p>
        </div>

        {/* Action controllers bar */}
        <div className="flex items-center justify-between mt-auto">
          {/* Quantity selector button controls */}
          <div className="flex items-center border border-border/80 rounded-soft bg-background">
            <button
              disabled={quantity <= 1}
              onClick={() => onQuantityChange(quantity - 1)}
              className="px-[8px] py-[6px] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="h-16 w-16" />
            </button>
            <span className="px-[12px] text-body-sm font-semibold font-mono select-none">
              {quantity}
            </span>
            <button
              disabled={quantity >= selectedVariant.stock} // Limit selection based on available variant stock!
              onClick={() => onQuantityChange(quantity + 1)}
              className="px-[8px] py-[6px] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="h-16 w-16" />
            </button>
          </div>

          <Price
            amount={product.price.amount * quantity}
            className="text-body-sm font-bold"
          />
        </div>

        {/* CartPage specific actions slots like "move to wishlist" */}
        {actionSlot && (
          <div className="pt-[8px] border-t border-border/20 mt-[4px]">
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
}
export default CartItem;