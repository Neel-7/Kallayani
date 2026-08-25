import * as React from 'react';
import { cn } from 'src/lib/utils';
import { type Variant } from 'src/types/product';

export interface VariantSelectorProps {
  variants: Variant[];
  selectedSize: string | null;
  selectedColor: string | null;
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: string) => void;
}

/**
 * VariantSelector handles selection of sizes and colors per blueprint §14.
 * Highlights out of stock options dynamically based on variant inventory cross-referencing.
 */
export function VariantSelector({
  variants,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
}: VariantSelectorProps) {
  const isSingleVariant = variants.length === 1;

  // Extract unique sizes and colors available on this product
  const sizes = React.useMemo(
    () => Array.from(new Set(variants.map((v) => v.size))),
    [variants],
  );
  const colors = React.useMemo(
    () => Array.from(new Set(variants.map((v) => v.color))),
    [variants],
  );

  if (isSingleVariant) {
    const single = variants[0];
    if (!single) return null;
    return (
      <div className="text-body-sm font-semibold text-muted-foreground select-none font-mono">
        Format: <span className="text-foreground">{single.size}</span> | Fabric
        Shade: <span className="text-foreground">{single.color}</span>
      </div>
    );
  }

  return (
    <div className="space-y-[20px] select-none">
      {/* A. Colors Selection Row */}
      {colors.length > 1 && (
        <div className="space-y-[8px]">
          <span className="block text-caption uppercase tracking-wider font-semibold text-muted-foreground">
            Shade Selection
          </span>
          <div className="flex flex-wrap gap-[12px]">
            {colors.map((color) => {
              const active =
                selectedColor?.toLowerCase() === color.toLowerCase();
              return (
                <button
                  key={color}
                  onClick={() => onColorSelect(color)}
                  className={cn(
                    'px-[12px] py-[6px] border rounded-soft text-body-sm font-semibold tracking-wide transition-all cursor-pointer',
                    active
                      ? 'bg-primary text-surface border-primary shadow-sm'
                      : 'border-border/80 hover:bg-muted-surface text-muted-foreground hover:text-foreground',
                  )}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* B. Sizes Selection Row */}
      {sizes.length > 0 && (
        <div className="space-y-[8px]">
          <span className="block text-caption uppercase tracking-wider font-semibold text-muted-foreground">
            Size Selection
          </span>
          <div className="flex flex-wrap gap-[12px]">
            {sizes.map((size) => {
              const active = selectedSize?.toLowerCase() === size.toLowerCase();

              // Cross-reference stock status for this specific size
              const matchingVariant = variants.find(
                (v) =>
                  v.size.toLowerCase() === size.toLowerCase() &&
                  (selectedColor
                    ? v.color.toLowerCase() === selectedColor.toLowerCase()
                    : true),
              );
              const isOutOfStock = matchingVariant
                ? matchingVariant.stock === 0
                : false;

              return (
                <button
                  key={size}
                  onClick={() => onSizeSelect(size)}
                  className={cn(
                    'relative px-[16px] py-[10px] border rounded-soft text-body-sm font-semibold transition-all cursor-pointer min-w-[56px] text-center',
                    active
                      ? 'bg-primary text-surface border-primary shadow-sm'
                      : 'border-border/80 hover:bg-muted-surface text-foreground',
                    isOutOfStock &&
                      'opacity-40 line-through decoration-muted-foreground/60',
                  )}
                  aria-label={`Size ${size}${isOutOfStock ? ' (Out of stock)' : ''}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
