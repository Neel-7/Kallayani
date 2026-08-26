import { ArrowUpDown } from 'lucide-react';
import { Button } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { type SortKey } from 'src/features/catalog/catalogSlice';

export interface SortDropdownProps {
  currentSort: SortKey;
  onSortChange: (key: SortKey) => void;
}

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  new: 'New In',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
};

/**
 * SortDropdown allows users to re-order collection grids per blueprint §8.
 * Composes the themed shadcn/ui DropdownMenu primitive.
 */
export function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-[8px] min-w-[180px] justify-between"
        >
          <span className="flex items-center gap-[8px] text-body-sm">
            <ArrowUpDown className="h-16 w-16 text-muted-foreground" />
            Sort:{' '}
            <span className="font-semibold text-foreground">
              {SORT_LABELS[currentSort]}
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {Object.entries(SORT_LABELS).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onSortChange(key as SortKey)}
            className="text-body-sm font-medium cursor-pointer"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
