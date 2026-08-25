import { apiSlice } from 'src/api/apiSlice';

export interface PlaceOrderPayload {
  items: Array<{ productId: string; variantId: string; quantity: number }>;
  email: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
  };
  shippingMethod: string;
  paymentInfo: {
    cardName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvv: string;
  };
}

export interface PlaceOrderResponse {
  success: boolean;
  orderNumber?: string;
  error?: {
    message: string;
    fields?: Record<string, string>;
  };
}

/**
 * checkoutApi defines the RTK Query mutation query for placing checkout orders per §13.
 * Fires a real HTTP POST mutation, enabling complete loading/success/error contract testing.
 */
export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<PlaceOrderResponse, PlaceOrderPayload>({
      query: (orderPayload) => ({
        url: '/orders',
        method: 'POST',
        body: orderPayload,
      }),
      invalidatesTags: ['Cart', 'Order'],
    }),
  }),
});

export const { usePlaceOrderMutation } = checkoutApi;
