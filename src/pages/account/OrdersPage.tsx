import { EmptyState } from 'src/components/shared/EmptyState';
import { Price } from 'src/components/shared/Price';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import { useGetOrdersQuery } from 'src/features/account/accountApi';
import { addToCart } from 'src/features/cart/cartSlice';
import { useToast } from 'src/hooks/use-toast';
import { useAppDispatch } from 'src/store/hooks';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { data: orders, isLoading } = useGetOrdersQuery();

  const handleReorder = (
    items: Array<{
      product: { id: string; name: string };
      selectedVariant: { id: string };
      quantity: number;
    }>,
  ) => {
    try {
      items.forEach((item) => {
        dispatch(
          addToCart({
            productId: item.product.id,
            variantId: item.selectedVariant.id,
            quantity: item.quantity,
          }),
        );
      });

      toast({
        title: 'Reorder Successful',
        description: `${items.length} ${items.length === 1 ? 'item has' : 'items have'} been added to your shopping bag.`,
      });
    } catch {
      toast({
        title: 'Reorder Failed',
        description:
          'We encountered an error adding these items to your bag. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-[32px] font-sans">
        <div className="space-y-[8px]">
          <Skeleton className="h-[36px] w-[240px]" />
          <Skeleton className="h-[20px] w-[380px]" />
        </div>
        <div className="space-y-[24px]">
          <Skeleton className="h-[220px] w-full rounded-soft" />
          <Skeleton className="h-[220px] w-full rounded-soft" />
        </div>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'secondary';
      case 'processing':
      case 'shipped':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-[32px] font-sans">
      <header className="border-b border-border/60 pb-[24px]">
        <h1 className="text-heading-md font-bold tracking-tight text-primary-text mb-[8px]">
          Your Purchases
        </h1>
        <p className="text-body-sm text-muted-foreground">
          Track active shipments, download invoices, or instantly reorder luxury
          staples.
        </p>
      </header>

      {orders && orders.length > 0 ? (
        <div className="space-y-[24px]">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-border/80 rounded-soft p-[24px] bg-surface/50 space-y-[24px]"
            >
              {/* Order Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-[16px] pb-[16px] border-b border-border/40">
                <div className="flex flex-wrap items-center gap-x-[24px] gap-y-[8px]">
                  <div>
                    <span className="text-body-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-[4px]">
                      Order ID
                    </span>
                    <span className="text-body-sm font-bold text-primary-text">
                      {order.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-body-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-[4px]">
                      Date Placed
                    </span>
                    <span className="text-body-sm text-foreground">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-body-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-[4px]">
                      Status
                    </span>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={() => handleReorder(order.items)}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Reorder All
                </Button>
              </div>

              {/* Order Card Line Items */}
              <div className="divide-y divide-border/40">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-[20px] py-[16px] first:pt-0 last:pb-0 items-start"
                  >
                    <img
                      src={item.product.images[0]?.['1:1'] || ''}
                      alt={item.product.name}
                      className="w-[80px] h-[80px] object-cover bg-muted-surface border border-border/40 rounded-soft shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body-sm font-semibold text-primary-text">
                        {item.product.name}
                      </h3>
                      <p className="text-body-xs text-muted-foreground mt-[4px]">
                        Size: {item.selectedVariant.size} • Color:{' '}
                        {item.selectedVariant.color}
                      </p>
                      <p className="text-body-xs text-muted-foreground mt-[2px]">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <Price
                        amount={item.product.price.amount}
                        currency={item.product.price.currency}
                        className="text-body-sm justify-end"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Card Footer */}
              <div className="flex flex-wrap items-center justify-between gap-[16px] pt-[20px] border-t border-border/40 bg-surface/10 rounded-b-soft -mx-[24px] -mb-[24px] px-[24px] py-[16px]">
                <div className="space-y-[2px]">
                  <span className="text-body-xs text-muted-foreground">
                    Ship to:{' '}
                    <strong className="text-foreground font-semibold">
                      {order.shippingAddress.firstName}{' '}
                      {order.shippingAddress.lastName}
                    </strong>
                  </span>
                  <p className="text-body-xs text-muted-foreground truncate">
                    {order.shippingAddress.addressLine1},{' '}
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                </div>
                <div className="flex items-center gap-[12px] font-mono">
                  <span className="text-body-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total
                  </span>
                  <Price
                    amount={order.total.amount}
                    currency={order.total.currency}
                    className="text-body-md font-bold"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No purchase history"
          description="Your orders will show up here once you have made your first purchase with us."
          action={
            <Button asChild>
              <a href="/new">Explore Collections</a>
            </Button>
          }
        />
      )}
    </div>
  );
}
