import { http, HttpResponse } from 'msw';

import homeDecor from '../data/home-decor.json';
import jewelry from '../data/jewelry.json';
import womenClothing from '../data/women-clothing.json';

/**
 * Catalog API handlers for MSW.
 * Intercepts requests to `/products` and `/products/:slug` and serves mock JSON data.
 * Supports cross-department lookups for women clothing, jewelry, and home decor.
 */
export const catalogHandlers = [
  http.get('*/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    if (category === 'jewelry') {
      return HttpResponse.json(jewelry);
    }
    if (category === 'women') {
      return HttpResponse.json(womenClothing);
    }
    if (category === 'home') {
      return HttpResponse.json(homeDecor);
    }
    // Return empty list for other stubs of un-modeled categories
    if (
      category &&
      category !== 'women' &&
      category !== 'jewelry' &&
      category !== 'home'
    ) {
      return HttpResponse.json([]);
    }

    // Combine all for general sitewide catalog fetching if no category is filtered
    return HttpResponse.json([...womenClothing, ...jewelry, ...homeDecor]);
  }),

  http.get('*/products/:slug', ({ params }) => {
    const { slug } = params;
    const allProducts = [...womenClothing, ...jewelry, ...homeDecor];
    const product = allProducts.find((p) => p.slug === slug);

    if (!product) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Product Not Found',
      });
    }

    return HttpResponse.json(product);
  }),
];
