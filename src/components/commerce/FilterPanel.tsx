import { Check, SlidersHorizontal } from 'lucide-react';
import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion';
import { Button } from 'src/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'src/components/ui/sheet';
import { type FilterChip } from 'src/features/catalog/catalogSlice';
import { cn } from 'src/lib/utils';

export interface FilterPanelProps {
  activeFilters: FilterChip[];
  onAddFilter: (chip: FilterChip) => void;
  onRemoveFilter: (chip: FilterChip) => void;
  onClearAll: () => void;
}

const FACETS = {
  occasion: [
    'Bridal',
    'Casual',
    'Daywear',
    'Festive',
    'Gifting',
    'Heritage',
    'Occasion',
  ],
  fabric: [
    'Kora Silk',
    'Mulmul Cotton',
    'Chanderi Silk-Cotton',
    'Khadi Cotton',
    'Raw Silk',
    'Tussar Silk',
    'Organza',
    'Pure Mulberry Silk',
    'Mysore Mulberry Silk',
  ],
  color: [
    'Crimson Vermilion',
    'Brass Gold',
    'Marigold Yellow',
    'Royal Indigo',
    'Forest Moss',
    'Ivory Cream',
    'Rose Coral',
  ],
  price: ['Under $100', '$100 - $200', '$200 - $300', 'Over $300'],
} as const;

/**
 * Responsive FilterPanel per blueprint §8.
 * Internally handles responsive switching:
 * - Desktop (min-width: 1024px): left-rail static sidebar
 * - Mobile (< 1024px): bottom sheet using Sheet primitive
 */
export function FilterPanel({
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  onClearAll,
}: FilterPanelProps) {
  const [isDesktop, setIsDesktop] = React.useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : false,
  );

  React.useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)'); // lg breakpoint maps to left rail
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isSelected = (type: FilterChip['type'], value: string) => {
    return activeFilters.some((f) => f.type === type && f.value === value);
  };

  const handleToggleFilter = (type: FilterChip['type'], value: string) => {
    if (isSelected(type, value)) {
      onRemoveFilter({ type, value });
    } else {
      onAddFilter({ type, value });
    }
  };

  const renderFiltersContent = () => (
    <div className="space-y-[24px]">
      <div className="flex items-center justify-between border-b border-border pb-[12px]">
        <h4 className="text-body-md font-bold tracking-wide">Filters</h4>
        {activeFilters.length > 0 && (
          <Button
            variant="link"
            onClick={onClearAll}
            className="text-caption font-semibold p-0 h-auto text-primary"
          >
            Clear All
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={['occasion', 'fabric', 'color', 'price']}
        className="w-full"
      >
        {/* A. Occasion Facet */}
        <AccordionItem value="occasion" className="border-b border-border/60">
          <AccordionTrigger className="text-body-sm font-semibold py-[12px] hover:no-underline">
            Occasion
          </AccordionTrigger>
          <AccordionContent className="pt-[4px] pb-[12px]">
            <ul className="space-y-[8px]">
              {FACETS.occasion.map((val) => {
                const checked = isSelected('occasion', val);
                return (
                  <li key={val}>
                    <button
                      onClick={() => handleToggleFilter('occasion', val)}
                      className="flex items-center gap-[12px] text-body-sm font-medium text-muted-foreground hover:text-foreground text-left w-full py-[4px] transition-colors"
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded border border-border flex items-center justify-center transition-colors',
                          checked
                            ? 'bg-primary border-primary text-surface'
                            : 'bg-transparent',
                        )}
                      >
                        {checked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span
                        className={cn(
                          checked && 'text-foreground font-semibold',
                        )}
                      >
                        {val}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* B. Fabric Facet */}
        <AccordionItem value="fabric" className="border-b border-border/60">
          <AccordionTrigger className="text-body-sm font-semibold py-[12px] hover:no-underline">
            Fabric
          </AccordionTrigger>
          <AccordionContent className="pt-[4px] pb-[12px]">
            <ul className="space-y-[8px]">
              {FACETS.fabric.map((val) => {
                const checked = isSelected('fabric', val);
                return (
                  <li key={val}>
                    <button
                      onClick={() => handleToggleFilter('fabric', val)}
                      className="flex items-center gap-[12px] text-body-sm font-medium text-muted-foreground hover:text-foreground text-left w-full py-[4px] transition-colors"
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded border border-border flex items-center justify-center transition-colors',
                          checked
                            ? 'bg-primary border-primary text-surface'
                            : 'bg-transparent',
                        )}
                      >
                        {checked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span
                        className={cn(
                          checked && 'text-foreground font-semibold',
                        )}
                      >
                        {val}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* C. Color Facet */}
        <AccordionItem value="color" className="border-b border-border/60">
          <AccordionTrigger className="text-body-sm font-semibold py-[12px] hover:no-underline">
            Color
          </AccordionTrigger>
          <AccordionContent className="pt-[4px] pb-[12px]">
            <ul className="space-y-[8px]">
              {FACETS.color.map((val) => {
                const checked = isSelected('color', val);
                return (
                  <li key={val}>
                    <button
                      onClick={() => handleToggleFilter('color', val)}
                      className="flex items-center gap-[12px] text-body-sm font-medium text-muted-foreground hover:text-foreground text-left w-full py-[4px] transition-colors"
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded border border-border flex items-center justify-center transition-colors',
                          checked
                            ? 'bg-primary border-primary text-surface'
                            : 'bg-transparent',
                        )}
                      >
                        {checked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span
                        className={cn(
                          checked && 'text-foreground font-semibold',
                        )}
                      >
                        {val}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* D. Price Facet */}
        <AccordionItem value="price" className="border-0">
          <AccordionTrigger className="text-body-sm font-semibold py-[12px] hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pt-[4px] pb-[12px]">
            <ul className="space-y-[8px]">
              {FACETS.price.map((val) => {
                const checked = isSelected('price', val);
                return (
                  <li key={val}>
                    <button
                      onClick={() => handleToggleFilter('price', val)}
                      className="flex items-center gap-[12px] text-body-sm font-medium text-muted-foreground hover:text-foreground text-left w-full py-[4px] transition-colors"
                    >
                      <div
                        className={cn(
                          'h-4 w-4 rounded border border-border flex items-center justify-center transition-colors',
                          checked
                            ? 'bg-primary border-primary text-surface'
                            : 'bg-transparent',
                        )}
                      >
                        {checked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span
                        className={cn(
                          checked && 'text-foreground font-semibold',
                        )}
                      >
                        {val}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  // Desktop Left Rail Render Mode
  if (isDesktop) {
    return (
      <aside className="w-[240px] shrink-0 border-r border-border/60 pr-[24px] hidden lg:block">
        {renderFiltersContent()}
      </aside>
    );
  }

  // Mobile Bottom Sheet Trigger Render Mode
  return (
    <div className="lg:hidden w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center gap-[8px] justify-center"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter Products{' '}
            {activeFilters.length > 0 && `(${activeFilters.length})`}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[80vh] overflow-y-auto px-[24px] pb-[32px] rounded-t-soft"
        >
          <SheetHeader className="mb-[16px] text-left">
            <SheetTitle className="font-display text-primary text-heading-sm">
              Filters & Refine
            </SheetTitle>
            <SheetDescription className="text-caption">
              Refine the women's clothing catalog selects by occasion, fabric,
              color, or price.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">{renderFiltersContent()}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
