import { useMemo } from 'react';
import { useGetProductsQuery } from 'src/api/catalogApi';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { type CartItem } from 'src/types/cart';

import {
  selectCartItems,
  selectCartState,
  selectCartSubtotal,
  selectCartItemCount,
  selectFreeShippingProgress,
} from './cartSelectors';
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCartDrawerOpen,
  updateQuantity,
  type CartLineItem,
} from './cartSlice';

/**
 * useCart coordinates global shopping bag states.
 * Retrieves selections, calculates progress thresholds, and hydrages line items.
 */
export function useCart() {
  const dispatch = useAppDispatch();
  const { data: allProducts } = useGetProductsQuery();

  const cartState = useAppSelector(selectCartState);
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);

  const subtotal = useAppSelector(selectCartSubtotal(allProducts));
  const freeShippingProgress = useAppSelector(
    selectFreeShippingProgress(allProducts),
  );

  const hydratedItems: CartItem[] = useMemo(() => {
    if (!allProducts || items.length === 0) return [];
    return items
      .map((item) => {
        const product = allProducts.find((p) => p.id === item.productId);
        if (!product) return null;
        const selectedVariant = product.variants.find(
          (v) => v.id === item.variantId,
        );
        if (!selectedVariant) return null;
        return {
          id: `${item.productId}-${item.variantId}`,
          product,
          selectedVariant,
          quantity: item.quantity,
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [items, allProducts]);

  const addItem = (lineItem: CartLineItem) => {
    dispatch(addToCart(lineItem));
  };

  const changeQuantity = (
    productId: string,
    variantId: string,
    quantity: number,
  ) => {
    dispatch(updateQuantity({ productId, variantId, quantity }));
  };

  const removeItem = (productId: string, variantId: string) => {
    dispatch(removeFromCart({ productId, variantId }));
  };

  const setOpen = (open: boolean) => {
    dispatch(setCartDrawerOpen(open));
  };

  const clearAll = () => {
    dispatch(clearCart());
  };

  return {
    items,
    hydratedItems,
    itemCount,
    subtotal,
    freeShippingProgress,
    isDrawerOpen: cartState.isDrawerOpen,
    addItem,
    changeQuantity,
    removeItem,
    setOpen,
    clearAll,
  };
}
