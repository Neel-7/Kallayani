import { apiSlice } from 'src/api/apiSlice';

/**
 * Wishlist API Endpoints placeholder slice.
 *
 * NOTE: Genuinely empty boundary stub, preparing for future server-side
 * profile sync of saved customer edits (M20/M21). Keeps code modular.
 */
export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: () => ({
    // Placeholder - syncLocalWishlist, getSavedWishlist, etc. to be injected in future phases
  }),
  overrideExisting: false,
});
