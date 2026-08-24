import { Link, Outlet } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';

/**
 * Genuinely separate layout shell for transaction flow per blueprint §17.
 * Visibly sparse layout containing no site navigation, campaign chrome, or main footer.
 */
export function CheckoutLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Skip to Content */}
      <a
        href="#checkout-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[16px] focus:left-[16px] focus:z-50 bg-primary text-surface px-[16px] py-[8px] rounded-soft font-semibold text-body-sm shadow-card"
      >
        Skip to Content
      </a>

      {/* Sparse Checkout Header */}
      <header className="bg-surface border-b border-border py-[16px] shadow-sm">
        <Container className="flex items-center justify-between">
          <Link
            to="/"
            className="text-heading-md font-display font-semibold tracking-wide text-primary"
          >
            KALLAYANI
          </Link>
          <div className="text-body-sm font-semibold tracking-wide text-muted-foreground">
            Secured Checkout — Step 1 of 4
          </div>
        </Container>
      </header>

      {/* Main Checkout Outlet */}
      <main
        id="checkout-content"
        className="flex-1 py-[48px] focus:outline-none"
      >
        <Outlet />
      </main>
    </div>
  );
}
