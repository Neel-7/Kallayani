import { http, HttpResponse } from 'msw';

/**
 * TEMPORARY PING HANDLER — PENDING DELETION AS FIRST STEP OF M7.
 * Intercepts GET requests to /ping and returns status: "ok".
 */
export const pingHandler = http.get('*/ping', () => {
  return HttpResponse.json({ status: 'ok' });
});
