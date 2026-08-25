import { type Product } from 'src/types/product';

import { apiSlice } from './apiSlice';

export const catalogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { category?: string } | void>({
      query: (params) => {
        const categoryQuery = params?.category
          ? `?category=${params.category}`
          : '';
        return `/products${categoryQuery}`;
      },
      transformResponse: (response: unknown) => {
        // Verification Log (temporary, will be noted in final report)
        console.log('[transformResponse:getProducts] Raw response:', response);
        const products = response as Product[];
        console.log(
          '[transformResponse:getProducts] Domain-typed response:',
          products,
        );
        return products;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      transformResponse: (response: unknown) => {
        return response as Product;
      },
      providesTags: (_result, _error, slug) => [{ type: 'Product', id: slug }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductBySlugQuery } = catalogApi;
