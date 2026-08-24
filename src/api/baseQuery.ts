import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Global Base Query configuration for Kallayani RTK Query API.
 * Reads configurations dynamically from Vite environment variables.
 *
 * NOTE ON MOCKING INTERCEPTION:
 * When VITE_API_MODE is "mock", baseQuery still returns the standard `fetchBaseQuery` targeting the VITE_API_BASE_URL.
 * No hardcoded response mock logic is written here. Instead, Mock Service Worker (MSW) intercepts these requests
 * at the low-level network layer in the browser, serving simulated payloads seamlessly.
 */
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  prepareHeaders: (headers) => {
    // Standard authorization stubs or shared headers go here
    return headers;
  },
});
