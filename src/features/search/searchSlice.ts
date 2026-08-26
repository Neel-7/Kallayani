import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  recentSearches: string[];
  currentQuery: string;
}

const SEARCH_LOCAL_STORAGE_KEY = 'kallayani_recent_searches';

const loadRecentSearches = (): string[] => {
  try {
    const saved = localStorage.getItem(SEARCH_LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load recent searches from localStorage:', error);
  }
  return [];
};

const initialState: SearchState = {
  recentSearches: loadRecentSearches(),
  currentQuery: '',
};

/**
 * searchSlice stores search-related client states per M20.
 * Persists recent query strings inside the browser's localStorage.
 * transient currentQuery tracks raw keystroke strings for component sync.
 */
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (!query) return;

      // Filter out duplicate queries and move to top
      const filtered = state.recentSearches.filter((q) => q.toLowerCase() !== query.toLowerCase());
      const updated = [query, ...filtered].slice(0, 5); // Limit to top 5 recent searches

      state.recentSearches = updated;
      try {
        localStorage.setItem(SEARCH_LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to persist recent searches to localStorage:', error);
      }
    },
    removeRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      const updated = state.recentSearches.filter((q) => q !== query);
      state.recentSearches = updated;
      try {
        localStorage.setItem(SEARCH_LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to remove recent search from localStorage:', error);
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      try {
        localStorage.removeItem(SEARCH_LOCAL_STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear recent searches from localStorage:', error);
      }
    },
  },
});

export const {
  setQuery,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
