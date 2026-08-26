import { useLocation, useParams } from 'react-router-dom';
import { useGetProductsQuery } from 'src/api/catalogApi';
import { FilterPanel } from 'src/components/commerce/FilterPanel';
import { ProductGrid } from 'src/components/commerce/ProductGrid';
import { SortDropdown } from 'src/components/commerce/SortDropdown';
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
// HMR trigger
import { LoadMoreButton } from 'src/components/shared/LoadMoreButton';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import {
  addFilter,
  clearAllFilters,
  removeFilter,
  setCurrentPage,
  setSort,
  type FilterChip,
  type SortKey,
} from 'src/features/catalog/catalogSlice';
import { useCollectionFilters } from 'src/features/catalog/useCollectionFilters';
import { cn } from 'src/lib/utils';
import { useAppDispatch } from 'src/store/hooks';

export default function CollectionPage() {
  const dispatch = useAppDispatch();
  const { category, occasion } = useParams();
  const { pathname } = useLocation();

  // 1. Dynamic URL-Gated State Decider:
  // We parsed our department name from the path. This matches exactly what M5 did.
  const pathParts = pathname.split('/').filter(Boolean);
  const department = pathParts[0] || 'women';

  // Capitalize for clean visual titles
  const formatText = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');

  const isDecorDept = department.toLowerCase() === 'home';

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    {
      label: isDecorDept ? 'Home Decor' : formatText(department),
      href: `/${department}`,
    },
  ];
  if (category) breadcrumbItems.push({ label: formatText(category) });
  if (occasion) breadcrumbItems.push({ label: formatText(occasion) });

  // 2. Fetch catalog list via RTK Query.
  // Passing category/department parameter directly.
  const {
    data: rawProducts,
    isLoading,
    isError,
  } = useGetProductsQuery({ category: department });

  // 3. Derive filtered and sorted product list strictly in the selectors/hook
  const {
    filteredProducts,
    paginatedProducts,
    hasMore,
    activeFilters,
    currentSort,
    currentPage,
  } = useCollectionFilters(rawProducts);

  const handleAddFilter = (chip: FilterChip) => {
    dispatch(addFilter(chip));
  };

  const handleRemoveFilter = (chip: FilterChip) => {
    dispatch(removeFilter(chip));
  };

  const handleClearAll = () => {
    dispatch(clearAllFilters());
  };

  const handleSortChange = (key: SortKey) => {
    dispatch(setSort(key));
  };

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  return (
    <Container className="py-[48px]">
      {/* Editorial Header Section */}
      <header className="space-y-[16px] border-b border-border/60 pb-[24px]">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[24px]">
          <SectionHeading
            title={
              category
                ? `${formatText(department)} — ${formatText(category)}`
                : formatText(department)
            }
            description={
              isDecorDept
                ? 'Handcrafted furnishings, bespoke ceramics, and fine organic textile linens for curated spaces.'
                : 'Bespoke hand-woven sarees, ready-to-wear kurta sets, and contemporary bridal-heritage edits.'
            }
            align="left"
          />
          {!isLoading && !isError && (
            <span className="text-body-sm font-mono text-muted-foreground shrink-0 select-none">
              Showing{' '}
              <span className="font-semibold text-foreground">
                {filteredProducts.length}
              </span>{' '}
              curated selects
            </span>
          )}
        </div>
      </header>

      {/* Main PLP Workspace Container */}
      <div className="flex flex-col lg:flex-row gap-[32px] items-start mt-[48px] md:mt-[64px]">
        {' '}
        {/* Left Side Filters Sidebar rail (collapses to Sheet on mobile) */}
        <FilterPanel
          activeFilters={activeFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAll}
        />
        {/* Right Side Grid Workspace */}
        <div className="flex-1 min-w-0 w-full space-y-[24px]">
          {/* Controls Header Row: Active Chips list & Right aligned SortDropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
            {/* Active Chips List */}
            <div className="flex flex-wrap items-center gap-[8px]">
              {activeFilters.map((chip) => {
                const isJewelryChip =
                  chip.value.toLowerCase() === 'jewelry' ||
                  chip.value.toLowerCase() === 'brass gold';
                return (
                  <button
                    key={`${chip.type}-${chip.value}`}
                    onClick={() => handleRemoveFilter(chip)}
                    className={cn(
                      'inline-flex items-center gap-[6px] px-[12px] py-[6px] text-caption font-semibold rounded-soft border transition-colors cursor-pointer select-none',
                      isJewelryChip
                        ? 'bg-tertiary/10 text-tertiary border-tertiary/20 hover:bg-tertiary/20'
                        : 'bg-muted-surface text-foreground border-border hover:bg-border/60'
                    )}
                    aria-label={`Remove filter: ${chip.value}`}
                  >
                    <span>{chip.value}</span>
                    <span
                      className={cn(
                        'font-bold hover:text-foreground',
                        isJewelryChip ? 'text-tertiary/80' : 'text-muted-foreground'
                      )}
                    >
                      ×
                    </span>
                  </button>
                );
              })}
              {activeFilters.length > 0 && (
                <Button
                  variant="link"
                  onClick={handleClearAll}
                  className="text-caption font-bold p-0 h-auto text-primary"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* SortDropdown Wrapper */}
            <div className="self-end sm:self-auto shrink-0">
              <SortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Loading Fallback Loader Grid */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[24px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="space-y-[12px] p-[12px] border border-border/40 bg-surface rounded-soft"
                >
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-[14px] w-[60%]" />
                  <Skeleton className="h-[20px] w-[80%]" />
                  <Skeleton className="h-[14px] w-[40%]" />
                </div>
              ))}
            </div>
          )}

          {/* Error Message Panel */}
          {isError && (
            <div className="p-[16px] rounded-soft bg-error/10 text-error text-body-sm font-semibold border border-error/20">
              Failed to load product catalog lists. Connection timeout error.
            </div>
          )}

          {/* Data List Workspace Render Grid */}
          {!isLoading && !isError && filteredProducts.length > 0 && (
            <div className="space-y-[32px]">
              <ProductGrid products={paginatedProducts} />
              <LoadMoreButton hasMore={hasMore} onClick={handleLoadMore} />
            </div>
          )}

          {/* Empty State Result Container */}
          {!isLoading && !isError && filteredProducts.length === 0 && (
            <EmptyState
              title="No refined matches found"
              description="No products fit your precise filtered criteria. Try expanding or clearing your current active filter chips."
              action={
                <Button onClick={handleClearAll}>Reset Active Filters</Button>
              }
            />
          )}
        </div>
      </div>
    </Container>
  );
}
