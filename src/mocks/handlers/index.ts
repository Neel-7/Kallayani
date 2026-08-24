import { pingHandler } from './ping';

/**
 * Global handlers list for Mock Service Worker (MSW).
 * Ready for future feature handlers (catalog, products, cart) in M7.
 */
export const handlers = [pingHandler];
