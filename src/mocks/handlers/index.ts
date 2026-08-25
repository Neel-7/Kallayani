import { catalogHandlers } from './catalogHandlers';
import { checkoutHandlers } from './checkoutHandlers';

/**
 * Global handlers list for Mock Service Worker (MSW).
 * Wired up to serve both catalog selections and checkout mutations.
 */
export const handlers = [...catalogHandlers, ...checkoutHandlers];
