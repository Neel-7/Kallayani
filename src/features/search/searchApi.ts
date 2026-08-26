import { apiSlice } from 'src/api/apiSlice';
import { type Product } from 'src/types/product';

export interface PredictiveResults {
  products: Product[];
  categories: string[];
}

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPredictiveResults: builder.query<PredictiveResults, string>({
      query: () => '/products',
      transformResponse: (response: unknown, _meta, arg) => {
        const query = arg.toLowerCase().trim();
        if (!query) {
          return { products: [], categories: [] };
        }

        const allProducts = response as Product[];
        const matched = allProducts.filter((p) => {
          const nameMatch = p.name.toLowerCase().includes(query);
          const categoryMatch = p.category.toLowerCase().includes(query);
          const craftMatch =
            p.productStory?.craftTechnique?.toLowerCase().includes(query) || false;
          const descMatch =
            p.productStory?.description?.toLowerCase().includes(query) || false;
          const fabricMatch = p.fabric?.toLowerCase().includes(query) || false;

          return nameMatch || categoryMatch || craftMatch || descMatch || fabricMatch;
        });

        // Unique matched categories
        const categories = Array.from(new Set(matched.map((p) => p.category)));

        return {
          products: matched.slice(0, 5), // Top 4-5 matches
          categories,
        };
      },
    }),

    getSearchResults: builder.query<Product[], string>({
      query: () => '/products',
      transformResponse: (response: unknown, _meta, arg) => {
        const query = arg.toLowerCase().trim();
        if (!query) {
          return response as Product[];
        }

        const allProducts = response as Product[];
        return allProducts.filter((p) => {
          const nameMatch = p.name.toLowerCase().includes(query);
          const categoryMatch = p.category.toLowerCase().includes(query);
          const craftMatch =
            p.productStory?.craftTechnique?.toLowerCase().includes(query) || false;
          const descMatch =
            p.productStory?.description?.toLowerCase().includes(query) || false;
          const fabricMatch = p.fabric?.toLowerCase().includes(query) || false;

          return nameMatch || categoryMatch || craftMatch || descMatch || fabricMatch;
        });
      },
    }),
  }),
});

export const { useGetPredictiveResultsQuery, useGetSearchResultsQuery } = searchApi;
