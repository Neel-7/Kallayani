import { apiSlice } from './apiSlice';

/**
 * Auth API endpoints boundary stub per blueprint §28.
 *
 * NOTE: Genuinely empty stub ready to be filled with real authentication / sign-in
 * endpoints (login, logout, register, me) under future authentication milestones (M13/M14).
 */
export const authApi = apiSlice.injectEndpoints({
  endpoints: () => ({
    // Placeholder - login, me, register, etc. to be injected in future phases
  }),
  overrideExisting: false,
});
