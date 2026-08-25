import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ProductUiState {
  selectedSize: string | null;
  selectedColor: string | null;
  activeImageIndex: number;
}

const initialState: ProductUiState = {
  selectedSize: null,
  selectedColor: null,
  activeImageIndex: 0,
};

/**
 * productSlice stores local product detail view states per blueprint §27.
 * Keeps UI-only state (gallery indices, size selections) segregated from server cache.
 */
export const productSlice = createSlice({
  name: 'productUi',
  initialState,
  reducers: {
    setSelectedSize: (state, action: PayloadAction<string | null>) => {
      state.selectedSize = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<string | null>) => {
      state.selectedColor = action.payload;
    },
    setActiveImageIndex: (state, action: PayloadAction<number>) => {
      state.activeImageIndex = action.payload;
    },
    resetProductUi: (state) => {
      state.selectedSize = null;
      state.selectedColor = null;
      state.activeImageIndex = 0;
    },
  },
});

export const {
  setSelectedSize,
  setSelectedColor,
  setActiveImageIndex,
  resetProductUi,
} = productSlice.actions;

export default productSlice.reducer;
