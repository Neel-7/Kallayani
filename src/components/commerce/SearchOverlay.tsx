import { X, Search, Clock, Trash2, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Price } from 'src/components/shared/Price';
import { ResponsiveImage } from 'src/components/shared/ResponsiveImage';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { useGetPredictiveResultsQuery } from 'src/features/search/searchApi';
import {
  setQuery as setGlobalQuery,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
} from 'src/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setSearchOpen } from 'src/store/slices/uiSlice';

/**
 * SearchOverlay is the slide-down/fade-in predictive search overlay per M20.
 * Focuses on keystroke debouncing, recent query persistence, and cross-domain lookups.
 */
export function SearchOverlay() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const recentSearches = useAppSelector((state) => state.search.recentSearches);
  const globalQuery = useAppSelector((state) => state.search.currentQuery);

  const [localQuery, setLocalQuery] = React.useState(globalQuery);
  const [debouncedQuery, setDebouncedQuery] = React.useState(globalQuery);

  const inputRef = React.useRef<HTMLInputElement>(null);

  // Debounce keystrokes by 300ms to throttle predictive API lookups per §15
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(localQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [localQuery]);

  // Focus the input box immediately on overlay mount
  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  // Trigger API hook for predictive suggestions with our debounced search term
  const { data: predictiveData, isLoading } = useGetPredictiveResultsQuery(
    debouncedQuery,
    { skip: !debouncedQuery.trim() }
  );

  // Close overlay on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(setSearchOpen(false));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  const handleSearchTrigger = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    dispatch(addRecentSearch(trimmed));
    dispatch(setGlobalQuery(trimmed));
    dispatch(setSearchOpen(false));
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchTrigger(localQuery);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Search Header Input bar */}
      <div className="border-b border-border/60 py-[16px] px-[24px] md:px-[40px] bg-surface">
        <div className="max-w-[1200px] mx-auto flex items-center gap-[16px]">
          <Search className="h-[20px] w-[20px] text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search our design house (e.g. Silk, Silver, Brass, Gold, Linen)..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 h-[48px] text-body-lg border-none focus-visible:ring-0 bg-transparent px-0 font-sans placeholder:text-muted-foreground/60"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(setSearchOpen(false))}
            className="rounded-full shrink-0"
            aria-label="Close search overlay"
          >
            <X className="h-[20px] w-[20px]" />
          </Button>
        </div>
      </div>

      {/* Main Search Panel results container */}
      <div className="flex-1 overflow-y-auto px-[24px] md:px-[40px] py-[32px] font-sans">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[40px]">
          
          {/* Column A: Recent Searches & Navigation shortcuts */}
          <div className="md:col-span-1 space-y-[24px] border-r border-border/10 pr-0 md:pr-[24px]">
            <div className="flex items-center justify-between border-b border-border/60 pb-[8px]">
              <h3 className="text-caption font-mono uppercase tracking-wider text-muted-foreground font-bold">
                Recent Journeys
              </h3>
              {recentSearches.length > 0 && (
                <Button
                  variant="link"
                  onClick={() => dispatch(clearRecentSearches())}
                  className="text-caption font-bold p-0 h-auto text-primary"
                >
                  Clear All
                </Button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <p className="text-body-sm text-muted-foreground italic leading-relaxed">
                Your search history is clean. Try searching our premium fabrics, jewelry lines, or hand-thrown decor.
              </p>
            ) : (
              <ul className="space-y-[12px]">
                {recentSearches.map((term: string) => (
                  <li key={term} className="flex items-center justify-between group">
                    <button
                      onClick={() => handleSearchTrigger(term)}
                      className="flex items-center gap-[10px] text-body-sm text-foreground/80 hover:text-primary transition-colors text-left"
                    >
                      <Clock className="h-[14px] w-[14px] text-muted-foreground" />
                      <span>{term}</span>
                    </button>
                    <button
                      onClick={() => dispatch(removeRecentSearch(term))}
                      className="opacity-0 group-hover:opacity-100 p-[4px] hover:text-error transition-all cursor-pointer"
                      aria-label={`Remove recent search: ${term}`}
                    >
                      <Trash2 className="h-[14px] w-[14px]" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Department Quick Links */}
            <div className="pt-[16px] space-y-[12px]">
              <h4 className="text-caption font-mono uppercase tracking-wider text-muted-foreground font-bold border-b border-border/60 pb-[8px]">
                Explore Departments
              </h4>
              <div className="flex flex-wrap gap-[8px]">
                {['women', 'jewelry', 'home'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      dispatch(setSearchOpen(false));
                      navigate(`/${dept}`);
                    }}
                    className="px-[12px] py-[6px] bg-muted-surface text-caption font-bold rounded-soft border border-border/40 hover:bg-border/60 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    {dept === 'women' ? "Women's Clothing" : dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column B & C: Live Predictive matches & Category Suggestions */}
          <div className="md:col-span-2 space-y-[24px]">
            {!debouncedQuery.trim() ? (
              // Suggestion Board when user has not typed yet
              <div className="space-y-[16px]">
                <h3 className="text-heading-sm font-display font-semibold text-primary-text border-b border-border/60 pb-[8px]">
                  Looking for Inspiration?
                </h3>
                <p className="text-body-sm text-muted-foreground leading-relaxed">
                  Search for fabrics, crafting techniques, or metal compositions to reveal the ancestral depth of our design catalog:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] pt-[8px]">
                  {[
                    { term: 'Jamdani Silk', desc: 'Floating weft floral motifs woven entirely from memory' },
                    { term: 'Sterling Silver', desc: 'Hand-chiseled jhumkas and intricate Cuttack filigree work' },
                    { term: 'Ceramics', desc: 'Textured stone vase pieces hand-shaped on potter wheels' },
                    { term: 'Indigo Dye', desc: 'Mud-resist block printed mull cotton quilts and textiles' },
                  ].map(({ term, desc }) => (
                    <button
                      key={term}
                      onClick={() => {
                        setLocalQuery(term);
                        setDebouncedQuery(term);
                      }}
                      className="p-[12px] rounded-soft border border-border/40 bg-surface/50 text-left hover:bg-muted-surface hover:border-primary/20 transition-all space-y-[4px] cursor-pointer"
                    >
                      <span className="text-body-sm font-bold text-primary-text block">{term}</span>
                      <span className="text-caption text-muted-foreground block line-clamp-1">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Matching Products Listing Column
              <div className="space-y-[24px]">
                <div className="flex items-center justify-between border-b border-border/60 pb-[8px]">
                  <h3 className="text-caption font-mono uppercase tracking-wider text-muted-foreground font-bold">
                    Discoveries matching "{debouncedQuery}"
                  </h3>
                  {predictiveData && predictiveData.products.length > 0 && (
                    <span className="text-caption font-mono text-muted-foreground">
                      Top {predictiveData.products.length} selects
                    </span>
                  )}
                </div>

                {isLoading && (
                  <div className="space-y-[16px]">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-[16px]">
                        <div className="h-[60px] w-[48px] bg-muted-surface rounded-soft animate-pulse shrink-0" />
                        <div className="flex-1 space-y-[6px]">
                          <div className="h-[14px] w-[50%] bg-muted-surface rounded animate-pulse" />
                          <div className="h-[12px] w-[30%] bg-muted-surface rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Categories query suggestion block */}
                {!isLoading && predictiveData && predictiveData.categories.length > 0 && (
                  <div className="space-y-[8px]">
                    {predictiveData.categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleSearchTrigger(debouncedQuery)}
                        className="w-full flex items-center justify-between p-[12px] rounded-soft bg-primary/5 border border-primary/10 text-primary-text text-body-sm font-semibold hover:bg-primary/10 transition-all text-left cursor-pointer"
                      >
                        <span>Search "{debouncedQuery}" inside {cat === 'women' ? "Women's Clothing" : cat}</span>
                        <ArrowRight className="h-[14px] w-[14px]" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Matches Products row */}
                {!isLoading && predictiveData && predictiveData.products.length === 0 ? (
                  <div className="py-[32px] text-center space-y-[8px] max-w-[360px] mx-auto">
                    <p className="text-body-sm font-semibold text-primary-text">
                      No predictive matches found.
                    </p>
                    <p className="text-caption text-muted-foreground">
                      Try searching general materials or categories. Press Enter to perform a full search.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-[12px]">
                    {predictiveData?.products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          dispatch(setSearchOpen(false));
                          dispatch(addRecentSearch(debouncedQuery));
                          navigate(`/product/${product.slug}`);
                        }}
                        className="w-full flex items-center gap-[16px] p-[8px] rounded-soft hover:bg-muted-surface/60 border border-transparent hover:border-border/40 transition-all text-left cursor-pointer group"
                      >
                        {/* Compact thumbnail image */}
                        <div className="h-[60px] w-[48px] bg-muted-surface rounded-soft overflow-hidden shrink-0">
                          {product.images[0] && (
                            <ResponsiveImage
                              src={product.images[0]['1:1']}
                              alt={product.name}
                              aspectRatio="1:1"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Text summary info */}
                        <div className="flex-1 min-w-0">
                          <span className="text-caption font-mono uppercase tracking-wider text-muted-foreground text-[10px] block">
                            {product.category} — {product.fabric}
                          </span>
                          <h4 className="text-body-sm font-bold text-primary-text truncate group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-caption text-muted-foreground block truncate">
                            {product.productStory.craftTechnique} ({product.productStory.regionalOrigin})
                          </span>
                        </div>

                        {/* Price rendering */}
                        <Price
                          amount={product.price.amount}
                          className="text-body-sm shrink-0 font-bold"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
