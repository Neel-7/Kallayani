import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { CartDrawer } from 'src/components/commerce/CartDrawer';
import { Container } from 'src/components/shared/Container';
import { Button } from 'src/components/ui/button';
import { useCart } from 'src/features/cart/useCart';

export function SiteLayout() {
  const { setOpen, itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Skip to Main Content Link (A11y) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[16px] focus:left-[16px] focus:z-50 bg-primary text-surface px-[16px] py-[8px] rounded-soft font-semibold text-body-sm shadow-card"
      >
        Skip to Content
      </a>

      {/* Main Top Header Navigation */}
      <header className="bg-surface border-b border-border sticky top-0 z-40 shadow-card">
        <Container className="h-[80px] flex items-center justify-between gap-[16px]">
          {/* Logo Mark */}
          <Link
            to="/"
            className="text-display-md font-display font-semibold tracking-wide text-primary hover:opacity-90 transition-opacity"
          >
            KALLAYANI
          </Link>

          {/* Top-Level Horizontal Main Navigation Links (§9) */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-[24px] text-body-sm font-semibold tracking-wide font-sans">
              <li>
                <Link
                  to="/new"
                  className="hover:text-primary transition-colors"
                >
                  New
                </Link>
              </li>
              <li>
                <Link
                  to="/women"
                  className="hover:text-primary transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to="/men"
                  className="hover:text-primary transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/jewelry"
                  className="hover:text-primary transition-colors"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link
                  to="/home"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/festive"
                  className="hover:text-primary transition-colors"
                >
                  Festive
                </Link>
              </li>
              <li>
                <Link
                  to="/edit"
                  className="hover:text-primary transition-colors"
                >
                  Edit
                </Link>
              </li>
              <li>
                <Link
                  to="/gifts"
                  className="hover:text-primary transition-colors"
                >
                  Gifts
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Utility Buttons Header Segment */}
          <div className="flex items-center gap-[8px]">
            {/* Mobile View Navigation Menu Placeholder Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open Menu Stub"
            >
              <Menu className="h-16 w-16" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="Search Catalog"
            >
              <Link to="/search">
                <Search className="h-16 w-16" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="Your Account"
            >
              <Link to="/account">
                <User className="h-16 w-16" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="Your Wishlist"
            >
              <Link to="/wishlist">
                <Heart className="h-16 w-16" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              className="relative"
              aria-label={`Open shopping bag, contains ${itemCount} items`}
            >
              <ShoppingBag className="h-16 w-16" />
              {itemCount > 0 && (
                <span className="absolute top-[2px] right-[2px] h-16 w-16 rounded-full bg-primary text-[10px] font-bold text-surface flex items-center justify-center font-mono animate-pulse">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </Container>
      </header>

      {/* Main Outlet Routing Window */}
      <main id="main-content" className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      {/* Main Structural Footer */}
      <footer className="bg-surface border-t border-border py-[48px] mt-auto">
        <Container className="grid grid-cols-1 md:grid-cols-4 gap-[32px]">
          <div>
            <h4 className="text-body-sm font-semibold tracking-wider text-primary-text mb-[16px]">
              KALLAYANI
            </h4>
            <p className="text-caption text-muted-foreground">
              Premium fashion and bespoke lifestyle designs. All rights
              reserved.
            </p>
          </div>
          <div>
            <h4 className="text-body-sm font-semibold tracking-wider mb-[16px]">
              Curation
            </h4>
            <ul className="space-y-[8px] text-body-sm text-muted-foreground">
              <li>
                <Link to="/new" className="hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-primary">
                  Women's Weaves
                </Link>
              </li>
              <li>
                <Link to="/jewelry" className="hover:text-primary">
                  Fine Jewelry
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-body-sm font-semibold tracking-wider mb-[16px]">
              Journal
            </h4>
            <ul className="space-y-[8px] text-body-sm text-muted-foreground">
              <li>
                <Link to="/edit" className="hover:text-primary">
                  Sartorial Stories
                </Link>
              </li>
              <li>
                <Link to="/edit" className="hover:text-primary">
                  Weaver Profiles
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-body-sm font-semibold tracking-wider mb-[16px]">
              Customer Service
            </h4>
            <ul className="space-y-[8px] text-body-sm text-muted-foreground">
              <li>
                <Link to="/account/orders" className="hover:text-primary">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/account/addresses" className="hover:text-primary">
                  Addresses
                </Link>
              </li>
            </ul>
          </div>
        </Container>
        <Container className="border-t border-border mt-[32px] pt-[24px] text-center text-caption text-muted-foreground">
          © {new Date().getFullYear()} Kallayani. Baseline Presentational Layout
          (Phase 1 / M5).
        </Container>
      </footer>

      {/* Global Shopping Cart Sidebar Drawer */}
      <CartDrawer />
    </div>
  );
}
