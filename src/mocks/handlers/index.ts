import { accountHandlers } from './account';
import { catalogHandlers } from './catalogHandlers';
import { checkoutHandlers } from './checkoutHandlers';
import { editorialHandlers } from './editorial';
import { occasionHandlers } from './occasion';

/**
 * Global handlers list for Mock Service Worker (MSW).
 * Wired up to serve both catalog selections and checkout mutations.
 */
export const handlers = [
  ...catalogHandlers,
  ...checkoutHandlers,
  ...accountHandlers,
  ...editorialHandlers,
  ...occasionHandlers,
];
