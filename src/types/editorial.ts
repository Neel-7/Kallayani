export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level: 2 | 3 }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'pullquote'; text: string; attribution?: string };

export interface Article {
  slug: string;
  title: string;
  dek?: string; // short subtitle or standfirst
  heroImage: {
    src: string;
    alt: string;
  };
  body: ArticleBlock[];
  relatedProductIds: string[];
  publishedAt: string;
}
