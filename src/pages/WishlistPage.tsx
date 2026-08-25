import { Link } from 'react-router-dom';
import { ProductGrid } from 'src/components/commerce/ProductGrid';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import { useWishlist } from 'src/features/wishlist/useWishlist';

/**
 * WishlistPage displays all wishlisted products per blueprint §14.
 * Hydrates wishlisted IDs into full Product models by cross-referencing RTK Query caches,
 * rendering them in a standard responsive ProductGrid.
 */
export default function WishlistPage() {
  const { wishlistItems, isLoading } = useWishlist();

  return (
    <Container className="py-[48px] space-y-[32px]">
      <header className="border-b border-border/60 pb-[24px]">
        <SectionHeading
          title="Your Wishlist"
          description="A curated personal vault of your favorite hand-woven fabrics, couture kurta sets, and premium accent accessories."
          align="left"
        />
      </header>

      {/* Loading state spinner/skeletons */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[24px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="space-y-[12px] p-[12px] border border-border/40 bg-surface rounded-soft animate-pulse"
            >
              <Skeleton className="aspect-[4/5] w-full" />
              <Skeleton className="h-[14px] w-[60%]" />
              <Skeleton className="h-[20px] w-[80%]" />
            </div>
          ))}
        </div>
      )}

      {/* Hydrated Wishlisted Product Grid */}
      {!isLoading && wishlistItems.length > 0 && (
        <ProductGrid products={wishlistItems} />
      )}

      {/* Empty State Layout */}
      {!isLoading && wishlistItems.length === 0 && (
        <EmptyState
          title="Your wishlist is empty"
          description="Save what you love — start with exploring our New Arrivals and curated collections."
          action={
            <Button asChild>
              <Link to="/new">Explore New Arrivals</Link>
            </Button>
          }
        />
      )}
    </Container>
  );
}
