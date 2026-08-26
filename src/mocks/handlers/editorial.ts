import { http, HttpResponse } from 'msw';

import articles from '../data/editorial-articles.json';
import jewelry from '../data/jewelry.json';

/**
 * Editorial and cross-department stub API handlers for MSW.
 * Intercepts requests to `/editorial/articles`, `/editorial/articles/:slug`,
 * and temporary cross-department product selections.
 */
export const editorialHandlers = [
  // A. Fetch all articles
  http.get('*/editorial/articles', () => {
    return HttpResponse.json(articles);
  }),

  // B. Fetch single article by slug
  http.get('*/editorial/articles/:slug', ({ params }) => {
    const { slug } = params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Article Not Found',
      });
    }

    return HttpResponse.json(article);
  }),

  // C. Temporary jewelry products stub getter (direct fallback support)
  http.get('*/jewelry-stubs', () => {
    return HttpResponse.json(jewelry);
  })
];
