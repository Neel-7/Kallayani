import { Link } from 'react-router-dom';
import { EmptyState } from 'src/components/shared/EmptyState';
import { Price } from 'src/components/shared/Price';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import { useGetOrdersQuery, useGetProfileQuery } from 'src/features/account/accountApi';

export default function AccountOverviewPage() {
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery();

  const latestOrder = orders && orders.length > 0 ? orders[0] : null;

  const quickLinks = [
    {
      title: 'Orders',
      description: 'Track, cancel, or reorder your recent purchases.',
      path: '/account/orders',
      cta: 'View History',
    },
    {
      title: 'Addresses',
      description: 'Manage your primary billing and shipping destinations.',
      path: '/account/addresses',
      cta: 'Manage Book',
    },
    {
      title: 'Wishlist',
      description: 'Explore and purchase your curated vault of favorites.',
      path: '/account/wishlist',
      cta: 'View Wishlist',
    },
    {
      title: 'Profile Details',
      description: 'Update your communication and luxury sizing preferences.',
      path: '/account/profile',
      cta: 'Update Profile',
    },
  ];

  if (isProfileLoading || isOrdersLoading) {
    return (
      <div className="space-y-[32px] font-sans">
        <div className="space-y-[8px]">
          <Skeleton className="h-[36px] w-[320px]" />
          <Skeleton className="h-[20px] w-[450px]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
          <div className="lg:col-span-2 space-y-[16px]">
            <Skeleton className="h-[24px] w-[140px]" />
            <Skeleton className="h-[200px] w-full rounded-soft" />
          </div>
          <div className="space-y-[16px]">
            <Skeleton className="h-[24px] w-[140px]" />
            <div className="grid grid-cols-1 gap-[12px]">
              <Skeleton className="h-[80px] w-full rounded-soft" />
              <Skeleton className="h-[80px] w-full rounded-soft" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const welcomeName = profile ? `${profile.firstName} ${profile.lastName}` : 'Guest';

  // Helper to format order status into badge colors
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'secondary'; // using existing tailwind/shadcn badge variants
      case 'processing':
      case 'shipped':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-[40px] font-sans">
      {/* Welcome Header */}
      <header className="border-b border-border/60 pb-[24px]">
        <h1 className="text-heading-md font-bold tracking-tight text-primary-text mb-[8px]">
          Welcome back, {welcomeName}
        </h1>
        <p className="text-body-sm text-muted-foreground">
          Account ID: {profile?.id || 'N/A'} • Preferred Sizing: {profile?.sizingPreference || 'Not set'}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
        {/* Left Column: Recent Order Card */}
        <section className="lg:col-span-2 space-y-[16px]">
          <h2 className="text-body-md font-bold uppercase tracking-wider text-muted-foreground">
            Recent Order
          </h2>

          {latestOrder ? (
            <div className="border border-border/80 rounded-soft p-[24px] bg-surface/50 space-y-[20px]">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-[12px] pb-[16px] border-b border-border/40">
                <div className="space-y-[4px]">
                  <p className="text-body-sm font-semibold text-foreground">
                    Order {latestOrder.id}
                  </p>
                  <p className="text-body-xs text-muted-foreground">
                    Placed on {new Date(latestOrder.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-[12px]">
                  <Badge variant={getStatusBadgeVariant(latestOrder.status)}>
                    {latestOrder.status.toUpperCase()}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/account/orders">Details</Link>
                  </Button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-[16px]">
                {latestOrder.items.map((item) => (
                  <div key={item.id} className="flex gap-[16px] items-start">
                    <img
                      src={item.product.images[0]?.['1:1'] || ''}
                      alt={item.product.name}
                      className="w-[64px] h-[64px] object-cover bg-muted-surface border border-border/40 rounded-soft shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-body-sm font-semibold text-primary-text truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-body-xs text-muted-foreground mt-[2px]">
                        Size: {item.selectedVariant.size} • Color: {item.selectedVariant.color}
                      </p>
                      <p className="text-body-xs text-muted-foreground mt-[2px]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <Price amount={item.product.price.amount} currency={item.product.price.currency} className="text-body-sm" />
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center pt-[16px] border-t border-border/40 font-mono">
                <span className="text-body-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Paid
                </span>
                <Price amount={latestOrder.total.amount} currency={latestOrder.total.currency} className="text-body-md font-bold" />
              </div>
            </div>
          ) : (
            <EmptyState
              title="No orders yet"
              description="You haven't placed any orders with Kallayani. When you do, they will appear here."
              className="py-[32px] border border-dashed border-border"
              action={
                <Button asChild variant="outline" size="sm">
                  <Link to="/new">Browse Catalog</Link>
                </Button>
              }
            />
          )}
        </section>

        {/* Right Column: Quick Links */}
        <section className="space-y-[16px]">
          <h2 className="text-body-md font-bold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-[12px]">
            {quickLinks.map((link) => (
              <div
                key={link.title}
                className="border border-border/60 rounded-soft p-[16px] bg-surface/30 hover:bg-surface/80 transition-all flex flex-col justify-between space-y-[12px]"
              >
                <div className="space-y-[4px]">
                  <h3 className="text-body-sm font-semibold text-primary-text">
                    {link.title}
                  </h3>
                  <p className="text-body-xs text-muted-foreground leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm" className="w-fit px-0 hover:bg-transparent text-primary-text font-semibold text-body-xs group justify-start">
                  <Link to={link.path} className="inline-flex items-center gap-[4px]">
                    {link.cta} <span className="transition-transform group-hover:translate-x-[2px]">→</span>
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
