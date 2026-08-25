import { useAppSelector } from 'src/store/hooks';
import { type Product } from 'src/types/product';

// Helper to filter and sort products dynamically
export function useCollectionFilters(products: Product[] | undefined) {
  const activeFilters = useAppSelector((state) => state.catalog.activeFilters);
  const currentSort = useAppSelector((state) => state.catalog.currentSort);
  const currentPage = useAppSelector((state) => state.catalog.currentPage);

  if (!products) {
    return {
      filteredProducts: [],
      paginatedProducts: [],
      hasMore: false,
      activeFilters,
      currentSort,
      currentPage,
    };
  }

  // 1. Group active filters by type for multi-select matching (OR within same group, AND across groups)
  const occasions = activeFilters
    .filter((f) => f.type === 'occasion')
    .map((f) => f.value.toLowerCase());
  const fabrics = activeFilters
    .filter((f) => f.type === 'fabric')
    .map((f) => f.value.toLowerCase());
  const colors = activeFilters
    .filter((f) => f.type === 'color')
    .map((f) => f.value.toLowerCase());
  const prices = activeFilters
    .filter((f) => f.type === 'price')
    .map((f) => f.value);

  const filteredProducts = products.filter((product) => {
    // A. Occasion matching (OR within occasion filters)
    if (occasions.length > 0) {
      const hasOccasion = product.occasionTags.some((tag) =>
        occasions.includes(tag.toLowerCase()),
      );
      if (!hasOccasion) return false;
    }

    // B. Fabric matching (OR within fabric filters)
    if (fabrics.length > 0) {
      if (!fabrics.includes(product.fabric.toLowerCase())) return false;
    }

    // C. Color matching (OR within color filters)
    if (colors.length > 0) {
      const hasColor = product.variants.some((v) =>
        colors.includes(v.color.toLowerCase()),
      );
      if (!hasColor) return false;
    }

    // D. Price matching (OR within price filters)
    if (prices.length > 0) {
      const amount = product.price.amount;
      const matchesPrice = prices.some((band) => {
        if (band === 'Under $100') return amount < 10000;
        if (band === '$100 - $200') return amount >= 10000 && amount <= 20000;
        if (band === '$200 - $300') return amount >= 20000 && amount <= 30000;
        if (band === 'Over $300') return amount > 30000;
        return false;
      });
      if (!matchesPrice) return false;
    }

    return true;
  });

  // 2. Sort currently filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (currentSort === 'price_asc') {
      return a.price.amount - b.price.amount;
    }
    if (currentSort === 'price_desc') {
      return b.price.amount - a.price.amount;
    }
    if (currentSort === 'new') {
      // Sort newly fresh IDs desc (e.g. prod_035 before prod_001)
      return b.id.localeCompare(a.id);
    }
    // 'featured' default: maintains mock database array index sorting (or by ID asc)
    return a.id.localeCompare(b.id);
  });

  // 3. Page Pagination (Load More appends elements, handled by page size multiplier)
  const pageSize = 8;
  const paginatedProducts = sortedProducts.slice(0, currentPage * pageSize);
  const hasMore = paginatedProducts.length < sortedProducts.length;

  return {
    filteredProducts: sortedProducts,
    paginatedProducts,
    hasMore,
    activeFilters,
    currentSort,
    currentPage,
  };
}
