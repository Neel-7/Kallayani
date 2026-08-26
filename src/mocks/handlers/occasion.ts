import { http, HttpResponse } from 'msw';

import durgaPuja from '../data/occasion-landing-durga-puja.json';
import autumnEquinox from '../data/occasion-landing-test-example.json';

/**
 * Occasion Landing API handlers for MSW.
 * Serves generic occasion data based on dynamic route param slug.
 */
export const occasionHandlers = [
  http.get('*/editorial/occasions/:slug', ({ params }) => {
    const { slug } = params;

    if (slug === 'durga-puja') {
      return HttpResponse.json(durgaPuja);
    }

    if (slug === 'autumn-equinox') {
      return HttpResponse.json(autumnEquinox);
    }

    return new HttpResponse(null, {
      status: 404,
      statusText: 'Occasion Not Found',
    });
  }),
];
