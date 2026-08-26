import { type Product } from './product';

export interface OccasionFeaturedSection {
  heading: string;
  productIds: string[];
}

export interface OccasionLanding {
  slug: string;
  title: string;
  heroImage: {
    src: string;
    alt: string;
  };
  intro: string; // short standfirst string
  featuredSections: OccasionFeaturedSection[];
}

export interface OccasionFeaturedSectionResolved {
  heading: string;
  products: Product[];
}

export interface OccasionLandingResolved {
  slug: string;
  title: string;
  heroImage: {
    src: string;
    alt: string;
  };
  intro: string;
  featuredSections: OccasionFeaturedSectionResolved[];
}
