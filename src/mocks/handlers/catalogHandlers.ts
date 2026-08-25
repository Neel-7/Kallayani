import { http, HttpResponse } from 'msw';

import womenClothing from '../data/women-clothing.json';

/**
 * Catalog API handlers for MSW.
 * Intercepts requests to `/products` and `/products/:slug` and serves mock JSON data.
 */
export const catalogHandlers = [
  http.get('*/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    // Return empty list for stubs of un-modeled categories
    if (category && category !== 'women') {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(womenClothing);
  }),

  http.get('*/products/:slug', ({ params }) => {
    const { slug } = params;
    const product = womenClothing.find((p) => p.slug === slug);

    if (!product) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Product Not Found',
      });
    }

    return HttpResponse.json(product);
  }),
];
