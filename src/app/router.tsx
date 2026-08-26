import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { Skeleton } from 'src/components/ui/skeleton';
import { ProtectedRoute } from 'src/features/account/ProtectedRoute';
import { AccountLayout } from 'src/layouts/AccountLayout';
import { CheckoutLayout } from 'src/layouts/CheckoutLayout';
import { SiteLayout } from 'src/layouts/SiteLayout';

// Loading fallback component displaying premium skeleton elements
function PageSkeleton() {
  return (
    <Container className="py-[48px] space-y-[24px]">
      <div className="space-y-[8px]">
        <Skeleton className="h-[32px] w-[240px]" />
        <Skeleton className="h-[16px] w-[400px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mt-[32px]">
        <Skeleton className="h-[320px] w-full rounded-soft" />
        <Skeleton className="h-[320px] w-full rounded-soft" />
        <Skeleton className="h-[320px] w-full rounded-soft" />
      </div>
    </Container>
  );
}

// Stable lazy-load Suspense wrapper helper
function withSuspense(Component: React.ComponentType<unknown>) {
  return (
    <React.Suspense fallback={<PageSkeleton />}>
      <Component />
    </React.Suspense>
  );
}

// Stable lazy-loaded page modules
const HomePageLazy = React.lazy(() => import('src/pages/HomePage'));
const CollectionPageLazy = React.lazy(() => import('src/pages/CollectionPage'));
const ProductPageLazy = React.lazy(() => import('src/pages/ProductPage'));
const CartPageLazy = React.lazy(() => import('src/pages/CartPage'));
const CheckoutPageLazy = React.lazy(() => import('src/pages/CheckoutPage'));
const WishlistPageLazy = React.lazy(() => import('src/pages/WishlistPage'));
const SearchPageLazy = React.lazy(() => import('src/pages/SearchPage'));
const EditPageLazy = React.lazy(() => import('src/pages/EditPage'));
const OccasionLandingPageLazy = React.lazy(() => import('src/pages/OccasionLandingPage'));
const NotFoundPageLazy = React.lazy(() => import('src/pages/NotFoundPage'));

// Stable lazy-loaded account page modules
const AccountOverviewPageLazy = React.lazy(() => import('src/pages/account/AccountOverviewPage'));
const OrdersPageLazy = React.lazy(() => import('src/pages/account/OrdersPage'));
const AddressesPageLazy = React.lazy(() => import('src/pages/account/AddressesPage'));
const AccountWishlistPageLazy = React.lazy(() => import('src/pages/account/AccountWishlistPage'));
const ProfilePageLazy = React.lazy(() => import('src/pages/account/ProfilePage'));

// Stable lazy-loaded dev components
const TokenPreviewLazy = React.lazy(() =>
  import('src/dev/TokenPreview').then((m) => ({ default: m.TokenPreview })),
);
const ComponentPreviewLazy = React.lazy(() =>
  import('src/dev/ComponentPreview').then((m) => ({ default: m.ComponentPreview })),
);
const SharedComponentPreviewLazy = React.lazy(() =>
  import('src/dev/SharedComponentPreview').then((m) => ({ default: m.SharedComponentPreview })),
);

// Statically defined route-element components
const HomePage = () => withSuspense(HomePageLazy);
const CollectionPage = () => withSuspense(CollectionPageLazy);
const ProductPage = () => withSuspense(ProductPageLazy);
const CartPage = () => withSuspense(CartPageLazy);
const CheckoutPage = () => withSuspense(CheckoutPageLazy);
const WishlistPage = () => withSuspense(WishlistPageLazy);
const SearchPage = () => withSuspense(SearchPageLazy);
const EditPage = () => withSuspense(EditPageLazy);
const OccasionLandingPage = () => withSuspense(OccasionLandingPageLazy);
const NotFoundPage = () => withSuspense(NotFoundPageLazy);

const AccountOverviewPage = () => withSuspense(AccountOverviewPageLazy);
const OrdersPage = () => withSuspense(OrdersPageLazy);
const AddressesPage = () => withSuspense(AddressesPageLazy);
const AccountWishlistPage = () => withSuspense(AccountWishlistPageLazy);
const ProfilePage = () => withSuspense(ProfilePageLazy);

const TokenPreview = () => withSuspense(TokenPreviewLazy);
const ComponentPreview = () => withSuspense(ComponentPreviewLazy);
const SharedComponentPreview = () => withSuspense(SharedComponentPreviewLazy);

export const router = createBrowserRouter([
  // Main Site Layout Route Group
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'new', element: <CollectionPage /> },
      { path: 'women', element: <CollectionPage /> },
      { path: 'women/:category', element: <CollectionPage /> },
      { path: 'men', element: <CollectionPage /> },
      { path: 'men/:category', element: <CollectionPage /> },
      { path: 'jewelry', element: <CollectionPage /> },
      { path: 'jewelry/:category', element: <CollectionPage /> },
      { path: 'home', element: <CollectionPage /> },
      { path: 'home/:category', element: <CollectionPage /> },
      { path: 'festive', element: <CollectionPage /> },
      { path: 'festive/:occasion', element: <OccasionLandingPage /> },
      { path: 'gifts', element: <CollectionPage /> },
      { path: 'product/:productId', element: <ProductPage /> },
      { path: 'edit', element: <EditPage /> },
      { path: 'edit/:storyId', element: <EditPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'cart', element: <CartPage /> },

      // Account Section nested compositionally inside SiteLayout and protected
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AccountOverviewPage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'addresses', element: <AddressesPage /> },
          { path: 'wishlist', element: <AccountWishlistPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },

      // Catch-all NotFound page (nested under SiteLayout to preserve navigational chrome)
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Sparse Checkout Layout Route Group
  {
    path: '/checkout',
    element: <CheckoutLayout />,
    children: [{ index: true, element: <CheckoutPage /> }],
  },

  // Dev-only Diagnostic Preview Routes (relocated behind unique URLs)
  { path: '/dev/tokens', element: <TokenPreview /> },
  { path: '/dev/components', element: <ComponentPreview /> },
  { path: '/dev/shared', element: <SharedComponentPreview /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
