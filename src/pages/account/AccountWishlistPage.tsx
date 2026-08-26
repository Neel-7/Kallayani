import WishlistPage from 'src/pages/WishlistPage';

/**
 * AccountWishlistPage compositionally reuses the core M11 WishlistPage per blueprint §18.
 * This satisfies the "tool, not a brand moment" rule by rendering the clean, established
 * responsive product grid directly inside the account panel context.
 */
export default function AccountWishlistPage() {
  return <WishlistPage />;
}
