import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface WishlistState {
  wishlistedIds: string[];
}

const WISHLIST_LOCAL_STORAGE_KEY = 'kallayani_wishlist';

const loadInitialState = (): WishlistState => {
  try {
    const saved = localStorage.getItem(WISHLIST_LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return { wishlistedIds: parsed };
      }
    }
  } catch (error) {
    console.error('Failed to load wishlist state from localStorage:', error);
  }
  return { wishlistedIds: [] };
};

const initialState: WishlistState = loadInitialState();

/**
 * wishlistSlice stores client-side global wishlist state per blueprint §27.
 * Persists wishlisted product IDs inside the browser's localStorage.
 */
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.wishlistedIds.indexOf(id);
      if (index >= 0) {
        state.wishlistedIds.splice(index, 1);
      } else {
        state.wishlistedIds.push(id);
      }
      try {
        localStorage.setItem(
          WISHLIST_LOCAL_STORAGE_KEY,
          JSON.stringify(state.wishlistedIds),
        );
      } catch (error) {
        console.error('Failed to persist wishlist to localStorage:', error);
      }
    },
    clearWishlist: (state) => {
      state.wishlistedIds = [];
      try {
        localStorage.removeItem(WISHLIST_LOCAL_STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear wishlist in localStorage:', error);
      }
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
