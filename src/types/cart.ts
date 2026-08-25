import { type Product, type Variant } from './product';

/**
 * CartItem domain type representing products in consumer shopping bags.
 * Purely structural stubs, no active business logic mapped in this milestone.
 */
export interface CartItem {
  id: string;
  product: Product;
  selectedVariant: Variant;
  quantity: number;
}
