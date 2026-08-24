import { apiSlice } from './apiSlice';

export interface PingResponse {
  status: string;
}

/**
 * TEMPORARY PING ENDPOINT — PENDING DELETION AS FIRST STEP OF M7.
 * Used exclusively to verify end-to-end mock-to-live API switching in M6.
 */
export const tempPingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ping: builder.query<PingResponse, void>({
      query: () => '/ping',
    }),
  }),
  overrideExisting: false,
});

export const { usePingQuery } = tempPingApi;
