import { useSearchParams } from 'react-router-dom';
import { FilterPanel } from 'src/components/commerce/FilterPanel';
import { ProductGrid } from 'src/components/commerce/ProductGrid';
import { SortDropdown } from 'src/components/commerce/SortDropdown';
import { Breadcrumbs } from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
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
import { useGetSearchResultsQuery } from 'src/features/search/searchApi';
import { setQuery as setGlobalQuery } from 'src/features/search/searchSlice';
import { cn } from 'src/lib/utils';
import { useAppDispatch } from 'src/store/hooks';

/**
 * SearchPage displays cross-domain search results per M20.
 * Reuses M9's core PLP components directly: FilterPanel, ProductGrid, SortDropdown.
 * Enforces search term rendering as an integrated active filter chip.
 */
export default function SearchPage() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Parse current search query 'q' from search parameters
  const q = searchParams.get('q') || '';

  // 2. Fetch full matching product array via RTK query across all domains
  const {
    data: rawResults,
    isLoading,
    isError,
  } = useGetSearchResultsQuery(q);

  // 3. Coordinate filtering and sorting through standard hook
  const {
    filteredProducts,
    paginatedProducts,
    hasMore,
    activeFilters,
    currentSort,
    currentPage,
  } = useCollectionFilters(rawResults);

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

  const handleClearSearchQuery = () => {
    dispatch(setGlobalQuery(''));
    setSearchParams({});
  };

  const handleSuggest = (term: string) => {
    dispatch(setGlobalQuery(term));
    setSearchParams({ q: term });
  };

  return (
    <Container className="py-[48px]">
      {/* Search Header Metadata */}
      <header className="space-y-[16px] border-b border-border/60 pb-[24px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Search Results' },
          ]}
        />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[24px]">
          <SectionHeading
            title={q ? `Results for "${q}"` : 'Discover our Catalog'}
            description="Explore authentic weaves, filigree jewelry pieces, and handcrafted home objects unified under one design house."
            align="left"
          />
          {!isLoading && !isError && q && (
            <span className="text-body-sm font-mono text-muted-foreground shrink-0 select-none">
              Discovered <span className="font-semibold text-foreground">{filteredProducts.length}</span> matches
            </span>
          )}
        </div>
      </header>

      {/* Main Results Workspace - Varied spacing mt-[48px] md:mt-[64px] per M17 rhythm discipline */}
      <div className="flex flex-col lg:flex-row gap-[32px] items-start mt-[48px] md:mt-[64px]">
        
        {/* Left Side Filters Sidebar - Direct import reuse from CollectionPage.tsx */}
        <FilterPanel
          activeFilters={activeFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAll}
        />

        {/* Right Side Search Grid Workspace */}
        <div className="flex-1 min-w-0 w-full space-y-[24px]">
          
          {/* Controls row showing Integrated Search query filter chip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
            <div className="flex flex-wrap items-center gap-[8px]">
              
              {/* Integrated Search Chip (resembles traditional filter design per AC) */}
              {q && (
                <button
                  onClick={handleClearSearchQuery}
                  className="inline-flex items-center gap-[6px] px-[12px] py-[6px] bg-primary/10 text-caption font-semibold rounded-soft border border-primary/20 text-primary-text hover:bg-primary/20 transition-colors cursor-pointer select-none"
                  aria-label={`Remove search query: ${q}`}
                >
                  <span>Search: "{q}"</span>
                  <span className="text-primary font-bold hover:text-foreground">×</span>
                </button>
              )}

              {/* General Active Filters */}
              {activeFilters.map((chip) => {
                const isJewelryChip = chip.value.toLowerCase() === 'jewelry';
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

              {(activeFilters.length > 0 || q) && (
                <Button
                  variant="link"
                  onClick={() => {
                    handleClearAll();
                    handleClearSearchQuery();
                  }}
                  className="text-caption font-bold p-0 h-auto text-primary"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Sort Dropdown Selector - Direct import reuse from CollectionPage.tsx */}
            <div className="self-end sm:self-auto shrink-0">
              <SortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Loader Placeholder state */}
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

          {/* Error Message banner */}
          {isError && (
            <div className="p-[16px] rounded-soft bg-error/10 text-error text-body-sm font-semibold border border-error/20">
              Failed to query catalog search endpoints. Connection timeout error.
            </div>
          )}

          {/* Results Grid display - Direct import reuse from CollectionPage.tsx */}
          {!isLoading && !isError && paginatedProducts.length > 0 && (
            <div className="space-y-[32px]">
              <ProductGrid products={paginatedProducts} />
              <LoadMoreButton hasMore={hasMore} onClick={handleLoadMore} />
            </div>
          )}

          {/* Friendly suggested-categories state if no matching results are found */}
          {!isLoading && !isError && (paginatedProducts.length === 0 || !q) && (
            <EmptyState
              title={q ? `No results discoverable for "${q}"` : 'Your journey begins with a search'}
              description="Explore handcraft techniques, fiber structures, jewelry metals, or ceramic objects. Try some of our popular suggestions below:"
              action={
                <div className="flex flex-wrap items-center justify-center gap-[8px] mt-[8px]">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggest('women')}
                    className="rounded-soft font-semibold text-caption"
                  >
                    Women's Weaves
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggest('jewelry')}
                    className="rounded-soft font-semibold text-caption"
                  >
                    Fine Jewelry
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggest('home')}
                    className="rounded-soft font-semibold text-caption"
                  >
                    Home Decor
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggest('silk')}
                    className="rounded-soft font-semibold text-caption"
                  >
                    Jamdani Silk
                  </Button>
                </div>
              }
            />
          )}
        </div>
      </div>
    </Container>
  );
}
