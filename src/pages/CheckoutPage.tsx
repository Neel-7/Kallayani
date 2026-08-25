import { Link } from 'react-router-dom';
import { OrderSummary } from 'src/components/commerce/OrderSummary';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion';
import { Button } from 'src/components/ui/button';
import { useCart } from 'src/features/cart/useCart';
import { ConfirmationStep } from 'src/features/checkout/steps/ConfirmationStep';
import { ContactStep } from 'src/features/checkout/steps/ContactStep';
import { DeliveryStep } from 'src/features/checkout/steps/DeliveryStep';
import { PaymentStep } from 'src/features/checkout/steps/PaymentStep';
import { ShippingStep } from 'src/features/checkout/steps/ShippingStep';
import { cn } from 'src/lib/utils';
import { useAppSelector } from 'src/store/hooks';

/**
 * CheckoutPage coordinates guest transactional workflows per §17.
 * Displays horizontal stepper meters and sticky desktop calculation side-summaries.
 * Ensures the cart is wiped clean only on successful order placements.
 */
export default function CheckoutPage() {
  const { currentStep, formData, placedOrderNumber } = useAppSelector(
    (state) => state.checkout,
  );
  const { items, hydratedItems, subtotal } = useCart();

  const isFreeShipping = subtotal >= 15000;

  // Calculate overridden shipping fee for summary
  const shippingOverride =
    currentStep === 'contact' || currentStep === 'shipping'
      ? undefined // not decided yet, use default OrderSummary logic
      : formData.shippingMethod === 'express'
        ? 2500 // Express shipping is $25.00
        : isFreeShipping
          ? 0
          : 1500; // Standard shipping is $15.00 / free

  const isConfirmation = currentStep === 'confirmation';

  // If cart is empty AND we are not on the confirmation page, render EmptyState
  if (hydratedItems.length === 0 && !isConfirmation) {
    return (
      <Container className="py-[96px] text-center">
        <EmptyState
          title="Checkout is empty"
          description="Your shopping bag must contain curated items before checking out. Start by exploring our collections."
          action={
            <Button asChild>
              <Link to="/women">Explore Curation</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  const stepsList = [
    { key: 'contact', label: 'Contact' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'delivery', label: 'Delivery' },
    { key: 'payment', label: 'Payment' },
  ];

  return (
    <Container className="py-[32px] md:py-[48px] space-y-[32px]">
      {/* progress stepper indicators (Hidden on confirmation step) */}
      {!isConfirmation && (
        <div className="border-b border-border/40 pb-[24px]">
          <div className="flex items-center justify-between max-w-[640px] mx-auto select-none">
            {stepsList.map((step, idx) => {
              const active = currentStep === step.key;
              const completed =
                stepsList.findIndex((s) => s.key === currentStep) > idx;

              return (
                <div
                  key={step.key}
                  className="flex items-center gap-[8px] last:flex-1 last:justify-end"
                >
                  <div className="flex items-center gap-[6px]">
                    <span
                      className={cn(
                        'h-6 w-6 rounded-full flex items-center justify-center text-caption font-mono font-bold border transition-colors',
                        active
                          ? 'bg-primary border-primary text-surface'
                          : completed
                            ? 'bg-success border-success text-surface'
                            : 'border-border text-muted-foreground bg-muted-surface',
                      )}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={cn(
                        'text-caption font-semibold uppercase tracking-wider hidden sm:inline',
                        active
                          ? 'text-primary font-bold'
                          : completed
                            ? 'text-success'
                            : 'text-muted-foreground',
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div
                      className={cn(
                        'h-[1px] w-[32px] sm:w-[64px] bg-border/60 transition-colors',
                        completed && 'bg-success',
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Form + Sticky summary wrapper */}
      {isConfirmation ? (
        <ConfirmationStep
          orderNumber={placedOrderNumber || 'KAL-2026-UNKNOWN'}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px] items-start">
          {/* Left Column: Form detail inputs */}
          <div className="lg:col-span-2 border border-border/50 rounded-soft bg-surface p-[24px] md:p-[32px] shadow-sm">
            {currentStep === 'contact' && (
              <ContactStep email={formData.email} />
            )}
            {currentStep === 'shipping' && <ShippingStep formData={formData} />}
            {currentStep === 'delivery' && (
              <DeliveryStep
                formData={formData}
                isFreeShipping={isFreeShipping}
              />
            )}
            {currentStep === 'payment' && (
              <PaymentStep formData={formData} items={items} />
            )}
          </div>

          {/* Right Column: Sticky / Collapsible Order Summary */}
          <div className="space-y-[24px] lg:sticky lg:top-[112px]">
            {/* Mobile collapsible summary using accordion */}
            <Accordion
              type="single"
              collapsible
              className="lg:hidden border border-border/50 rounded-soft bg-surface"
            >
              <AccordionItem value="summary" className="border-0">
                <AccordionTrigger className="px-[24px] py-[16px] text-body-sm font-semibold hover:no-underline flex justify-between">
                  <span>Show Order Summary</span>
                </AccordionTrigger>
                <AccordionContent className="px-[24px] pb-[24px]">
                  <OrderSummary
                    subtotal={subtotal}
                    shippingAmount={shippingOverride}
                    className="border-0 shadow-none p-0 bg-transparent"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Desktop sticky summary */}
            <div className="hidden lg:block">
              <OrderSummary
                subtotal={subtotal}
                shippingAmount={shippingOverride}
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
