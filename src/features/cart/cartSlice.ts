import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartLineItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CartState {
  items: CartLineItem[];
  isDrawerOpen: boolean;
}

const CART_LOCAL_STORAGE_KEY = 'kallayani_cart';

const loadInitialState = (): CartLineItem[] => {
  try {
    const saved = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load cart state from localStorage:', error);
  }
  return [];
};

const initialState: CartState = {
  items: loadInitialState(),
  isDrawerOpen: false,
};

/**
 * cartSlice stores client-side global cart line items per blueprint §27.
 *
 * CORE ARCHITECTURAL RULE COMPLIANCE:
 * It stores ONLY line items: { productId, variantId, quantity }[] and isDrawerOpen UI state.
 * Subtotal, item count, and free-shipping progress are dynamically calculated in
 * selectors (cartSelectors.ts) and never stored in Redux, preventing state duplication.
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartLineItem>) => {
      const { productId, variantId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, variantId, quantity });
      }
      state.isDrawerOpen = true; // Open drawer automatically on successful add
      try {
        localStorage.setItem(
          CART_LOCAL_STORAGE_KEY,
          JSON.stringify(state.items),
        );
      } catch (error) {
        console.error('Failed to persist cart to localStorage:', error);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
        quantity: number;
      }>,
    ) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.productId === productId && i.variantId === variantId,
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      try {
        localStorage.setItem(
          CART_LOCAL_STORAGE_KEY,
          JSON.stringify(state.items),
        );
      } catch (error) {
        console.error('Failed to update cart quantity in localStorage:', error);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; variantId: string }>,
    ) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      );
      try {
        localStorage.setItem(
          CART_LOCAL_STORAGE_KEY,
          JSON.stringify(state.items),
        );
      } catch (error) {
        console.error(
          'Failed to remove item from cart in localStorage:',
          error,
        );
      }
    },
    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.isDrawerOpen = false;
      try {
        localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear cart in localStorage:', error);
      }
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  setCartDrawerOpen,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
