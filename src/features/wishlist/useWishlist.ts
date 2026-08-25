import { useMemo } from 'react';
import { useGetProductsQuery } from 'src/api/catalogApi';
import { useAppSelector } from 'src/store/hooks';
import { type Product } from 'src/types/product';

/**
 * useWishlist selector hook coordinates ID state retrieval, wishlisted status checking,
 * and dynamic local product hydration by cross-referencing RTK Query catalog caches.
 */
export function useWishlist() {
  const wishlistedIds = useAppSelector((state) => state.wishlist.wishlistedIds);
  const { data: allProducts, isLoading } = useGetProductsQuery();

  const isWishlisted = (id: string) => {
    return wishlistedIds.includes(id);
  };

  const wishlistItems: Product[] = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter((p) => wishlistedIds.includes(p.id));
  }, [allProducts, wishlistedIds]);

  return {
    wishlistedIds,
    isWishlisted,
    wishlistItems,
    isLoading,
  };
}
