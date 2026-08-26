import { apiSlice } from 'src/api/apiSlice';
import { type Article } from 'src/types/editorial';


export const editorialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<Article[], void>({
      query: () => '/editorial/articles',
      transformResponse: (response: unknown) => {
        return response as Article[];
      },
    }),
    getArticleBySlug: builder.query<Article, string>({
      query: (slug) => `/editorial/articles/${slug}`,
      transformResponse: (response: unknown) => {
        return response as Article;
      },
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleBySlugQuery } = editorialApi;
