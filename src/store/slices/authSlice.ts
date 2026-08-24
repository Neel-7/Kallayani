import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

/**
 * Auth slice is a lightweight, temporary client-session stub per blueprint §27.
 *
 * NOTE: This is a structural placeholder pending the real, secure auth mechanisms
 * specified under Section 28's authentication boundaries.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: AuthUser } | null>) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
