import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  isCartDrawerOpen: boolean;
  isMobileNavOpen: boolean;
  isWishlistDrawerOpen: boolean;
}

const initialState: UiState = {
  isCartDrawerOpen: false,
  isMobileNavOpen: false,
  isWishlistDrawerOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartDrawerOpen = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileNavOpen = action.payload;
    },
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    setWishlistDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isWishlistDrawerOpen = action.payload;
    },
  },
});

export const {
  setCartDrawerOpen,
  toggleCartDrawer,
  setMobileNavOpen,
  toggleMobileNav,
  setWishlistDrawerOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
