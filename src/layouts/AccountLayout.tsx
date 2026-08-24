import { Link, Outlet, useLocation } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { cn } from 'src/lib/utils';

/**
 * AccountLayout is nested inside SiteLayout's Outlet compositionally.
 * It adds a left-rail account-specific sub-nav stub (Overview/Orders/Addresses/Wishlist/Profile) per §18.
 */
export function AccountLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Overview', path: '/account' },
    { label: 'Orders', path: '/account/orders' },
    { label: 'Addresses', path: '/account/addresses' },
    { label: 'Wishlist', path: '/account/wishlist' },
    { label: 'Profile Details', path: '/account/profile' },
  ];

  return (
    <Container className="py-[48px] flex flex-col md:flex-row gap-[32px]">
      {/* Account Rail Sub-Nav Stub (§18) */}
      <aside className="w-full md:w-[240px] shrink-0 border-b md:border-b-0 md:border-r border-border pb-[24px] md:pb-0 md:pr-[24px]">
        <h3 className="text-body-sm font-bold tracking-wider text-muted-foreground uppercase mb-[16px]">
          My Account
        </h3>
        <nav aria-label="Account Sub-Navigation">
          <ul className="space-y-[8px] flex flex-row md:flex-col flex-wrap md:flex-nowrap gap-[12px] md:gap-0">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <li key={item.path} className="w-auto md:w-full">
                  <Link
                    to={item.path}
                    className={cn(
                      'block text-body-sm font-semibold rounded-soft py-[8px] px-[12px] transition-colors',
                      isActive
                        ? 'bg-muted-surface text-primary-text'
                        : 'text-muted-foreground hover:bg-muted-surface hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Account Content Panel Outlet */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </Container>
  );
}
