import { type Address } from './address';
import { type CartItem } from './cart';
import { type Price } from './price';

export type OrderStatus =
  'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Order domain type representing historical purchases.
 * Purely structural stubs, no active business logic mapped in this milestone.
 */
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: Price;
  tax: Price;
  shipping: Price;
  total: Price;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
}
