import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { Skeleton } from 'src/components/ui/skeleton';
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

// Lazy load wrapper helper
function lazyWithSuspense(
  importFn: () => Promise<{ default: React.ComponentType<unknown> }>,
) {
  const LazyComponent = React.lazy(importFn);
  return (
    <React.Suspense fallback={<PageSkeleton />}>
      <LazyComponent />
    </React.Suspense>
  );
}

// Lazy loaded page components
const HomePage = () => lazyWithSuspense(() => import('src/pages/HomePage'));
const CollectionPage = () =>
  lazyWithSuspense(() => import('src/pages/CollectionPage'));
const ProductPage = () =>
  lazyWithSuspense(() => import('src/pages/ProductPage'));
const CartPage = () => lazyWithSuspense(() => import('src/pages/CartPage'));
const CheckoutPage = () =>
  lazyWithSuspense(() => import('src/pages/CheckoutPage'));
const AccountPage = () =>
  lazyWithSuspense(() => import('src/pages/AccountPage'));
const WishlistPage = () =>
  lazyWithSuspense(() => import('src/pages/WishlistPage'));
const SearchPage = () => lazyWithSuspense(() => import('src/pages/SearchPage'));
const EditPage = () => lazyWithSuspense(() => import('src/pages/EditPage'));
const NotFoundPage = () =>
  lazyWithSuspense(() => import('src/pages/NotFoundPage'));
const ApiPreviewPage = () =>
  lazyWithSuspense(() => import('src/pages/dev/ApiPreviewPage'));

// Lazy loaded dev preview components (relocated to dev-only routes)
const TokenPreview = () =>
  lazyWithSuspense(() =>
    import('src/dev/TokenPreview').then((m) => ({ default: m.TokenPreview })),
  );
const ComponentPreview = () =>
  lazyWithSuspense(() =>
    import('src/dev/ComponentPreview').then((m) => ({
      default: m.ComponentPreview,
    })),
  );
const SharedComponentPreview = () =>
  lazyWithSuspense(() =>
    import('src/dev/SharedComponentPreview').then((m) => ({
      default: m.SharedComponentPreview,
    })),
  );

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
      { path: 'festive/:occasion', element: <CollectionPage /> },
      { path: 'gifts', element: <CollectionPage /> },
      { path: 'product/:productId', element: <ProductPage /> },
      { path: 'edit', element: <EditPage /> },
      { path: 'edit/:storyId', element: <EditPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'cart', element: <CartPage /> },

      // Account Section nested compositionally inside SiteLayout
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { index: true, element: <AccountPage /> },
          { path: 'orders', element: <AccountPage /> },
          { path: 'addresses', element: <AccountPage /> },
          { path: 'wishlist', element: <AccountPage /> },
          { path: 'profile', element: <AccountPage /> },
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
  { path: '/dev/api', element: <ApiPreviewPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
