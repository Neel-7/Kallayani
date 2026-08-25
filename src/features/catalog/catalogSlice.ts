import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SortKey = 'featured' | 'new' | 'price_asc' | 'price_desc';

export interface FilterChip {
  type: 'occasion' | 'fabric' | 'color' | 'price';
  value: string;
}

export interface CatalogState {
  activeFilters: FilterChip[];
  currentSort: SortKey;
  currentPage: number;
}

const initialState: CatalogState = {
  activeFilters: [],
  currentSort: 'featured',
  currentPage: 1,
};

/**
 * catalogSlice stores user selections (active filters, sort keys) per blueprint §27.
 *
 * CORE ARCHITECTURAL RULE COMPLIANCE:
 * It stores ONLY selection state (e.g. current sort, active filter chip list).
 * Filtered products list is dynamically DERIVED in selectors/hooks and never saved here,
 * preventing data duplication and out-of-sync cache errors.
 */
export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<FilterChip>) => {
      const exists = state.activeFilters.some(
        (f) =>
          f.type === action.payload.type && f.value === action.payload.value,
      );
      if (!exists) {
        state.activeFilters.push(action.payload);
        state.currentPage = 1; // Reset pagination on filter change
      }
    },
    removeFilter: (state, action: PayloadAction<FilterChip>) => {
      state.activeFilters = state.activeFilters.filter(
        (f) =>
          !(f.type === action.payload.type && f.value === action.payload.value),
      );
      state.currentPage = 1; // Reset pagination on filter change
    },
    clearAllFilters: (state) => {
      state.activeFilters = [];
      state.currentPage = 1; // Reset pagination on filter change
    },
    setSort: (state, action: PayloadAction<SortKey>) => {
      state.currentSort = action.payload;
      state.currentPage = 1; // Reset pagination on filter change
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addFilter,
  removeFilter,
  clearAllFilters,
  setSort,
  setCurrentPage,
} = catalogSlice.actions;

export default catalogSlice.reducer;
