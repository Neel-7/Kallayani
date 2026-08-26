import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './baseQuery';

/**
 * Kallayani Central RTK Query API Slice.
 * Acts as the centralized cache manager and single-point registry for all injected endpoints.
 *
 * NOTE: Individual domain endpoints are injected modularly from distinct files via `apiSlice.injectEndpoints`
 * to maintain strict codebase modularity and avoid massive merge-conflict-prone files.
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Product', 'Cart', 'Wishlist', 'Order', 'User', 'Address'],
  endpoints: () => ({}),
});
