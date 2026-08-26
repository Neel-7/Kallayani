import { apiSlice } from 'src/api/apiSlice';
import jewelry from 'src/mocks/data/jewelry.json';
import womenClothing from 'src/mocks/data/women-clothing.json';
import { type OccasionLanding, type OccasionLandingResolved } from 'src/types/occasion';
import { type Product } from 'src/types/product';

const allProducts = [...womenClothing, ...jewelry] as Product[];

export const occasionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOccasionBySlug: builder.query<OccasionLandingResolved, string>({
      query: (slug) => `/editorial/occasions/${slug}`,
      transformResponse: (response: unknown) => {
        const raw = response as OccasionLanding;
        const resolvedSections = raw.featuredSections.map((section) => {
          const resolvedProducts = section.productIds
            .map((id) => allProducts.find((p) => p.id === id))
            .filter((p): p is Product => p !== undefined);
          return {
            heading: section.heading,
            products: resolvedProducts,
          };
        });

        return {
          slug: raw.slug,
          title: raw.title,
          heroImage: raw.heroImage,
          intro: raw.intro,
          featuredSections: resolvedSections,
        };
      },
    }),
  }),
});

export const { useGetOccasionBySlugQuery } = occasionApi;
