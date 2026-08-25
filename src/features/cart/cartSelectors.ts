import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from 'src/store/store';
import { type Product } from 'src/types/product';

export const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = (state: RootState) => state.cart.items;

export const FREE_SHIPPING_THRESHOLD = 15000; // $150.00 in whole cents

export const selectCartSubtotal = (products: Product[] | undefined) =>
  createSelector([selectCartItems], (items) => {
    if (!products) return 0;
    return items.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        return sum + item.quantity * prod.price.amount;
      }
      return sum;
    }, 0);
  });

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
);

export const selectFreeShippingProgress = (products: Product[] | undefined) =>
  createSelector([selectCartSubtotal(products)], (subtotal) => {
    const progress = (subtotal / FREE_SHIPPING_THRESHOLD) * 100;
    return Math.min(100, Math.max(0, progress));
  });
