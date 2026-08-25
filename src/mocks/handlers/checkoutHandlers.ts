import { http, HttpResponse } from 'msw';

interface OrderRequestPayload {
  email?: string;
  shippingAddress?: {
    firstName?: string;
    addressLine1?: string;
  };
  paymentInfo?: {
    cardNumber?: string;
  };
}

/**
 * Checkout flow request handlers for MSW.
 * Intercepts POST `/orders` requests and simulates success or validation failures.
 */
export const checkoutHandlers = [
  http.post('*/orders', async ({ request }) => {
    const body = (await request.json()) as OrderRequestPayload;

    // 1. Deliberate fail trigger to test the calm-error state display path per §30
    if (body.email === 'error@kallayani.com') {
      return HttpResponse.json(
        {
          success: false,
          error: {
            message:
              'Your payment card was declined by the bank network. Please check details or use an alternative card.',
          },
        },
        { status: 400 },
      );
    }

    // 2. Simple required field validations
    if (
      !body.email ||
      !body.shippingAddress?.firstName ||
      !body.shippingAddress?.addressLine1 ||
      !body.paymentInfo?.cardNumber
    ) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            message:
              'Essential guest form details are missing. Please complete all fields before placing your order.',
          },
        },
        { status: 400 },
      );
    }

    // 3. Success order placement mock path
    const orderNumber = `KAL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    return HttpResponse.json({
      success: true,
      orderNumber,
    });
  }),
];
