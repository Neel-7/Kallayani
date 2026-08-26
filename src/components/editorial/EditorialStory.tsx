import { CollectionFeature } from 'src/components/editorial/CollectionFeature';
import { ResponsiveImage } from 'src/components/shared/ResponsiveImage';
import { type Article } from 'src/types/editorial';
import { type Product } from 'src/types/product';

export interface EditorialStoryProps {
  article: Article;
  products?: Product[];
}

/**
 * EditorialStory is a presentational storytelling component per M16.
 * Renders structured, type-safe article blocks (no dangerous HTML injection)
 * alongside an optional curated cross-department "Shop the Story" product feature block.
 *
 * Visually inherits the post-elevation floating hero panel style from Hero.tsx.
 */
export function EditorialStory({ article, products }: EditorialStoryProps) {
  return (
    <article className="space-y-[48px] md:space-y-[64px] font-sans">
      {/* 1. Floating Banner Block - Consistent with Hero.tsx's post-elevation pass layout */}
      <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] md:min-h-[500px] bg-muted-surface overflow-visible mb-[64px] md:mb-[80px]">
        <div className="absolute inset-0 select-none pointer-events-none rounded-none overflow-hidden">
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            className="w-full h-full object-cover object-center rounded-none"
          />
          {/* Subtle overlay for consistent photography depth */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Aligned left/bottom floating card representing the article's typography */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto h-full px-[24px] md:px-[40px] flex items-center md:items-end justify-center md:justify-start">
          <div className="w-full max-w-[600px] bg-surface text-foreground p-[32px] md:p-[48px] rounded-soft shadow-drawer border border-border/40 space-y-[16px] text-center md:text-left transform md:translate-y-[48px] md:translate-x-[-16px]">
            <div className="space-y-[8px]">
              <span className="text-caption font-mono uppercase tracking-wider text-primary font-bold">
                Published {article.publishedAt}
              </span>
              <h1 className="text-heading-lg md:text-display-md font-display font-semibold tracking-tight text-primary-text leading-tight text-balance">
                {article.title}
              </h1>
              {article.dek && (
                <p className="text-body-sm md:text-body-md text-muted-foreground leading-relaxed text-balance pt-[4px]">
                  {article.dek}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Structured Body Blocks Renderer (Zero HTML Injection) */}
      <div className="max-w-[720px] mx-auto space-y-[28px] px-[24px] pt-[16px] md:pt-[32px]">
        {article.body.map((block, idx) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <p
                  key={idx}
                  className="text-body-md md:text-body-lg text-foreground/80 leading-relaxed text-balance"
                >
                  {block.text}
                </p>
              );

            case 'heading':
              if (block.level === 2) {
                return (
                  <h2
                    key={idx}
                    className="text-heading-md md:text-heading-lg font-display font-semibold text-primary-text tracking-tight pt-[16px]"
                  >
                    {block.text}
                  </h2>
                );
              } else {
                return (
                  <h3
                    key={idx}
                    className="text-heading-sm md:text-heading-md font-display font-semibold text-foreground tracking-tight pt-[12px]"
                  >
                    {block.text}
                  </h3>
                );
              }

            case 'image':
              return (
                <figure key={idx} className="space-y-[12px] my-[32px]">
                  <ResponsiveImage
                    src={block.src}
                    alt={block.alt}
                    aspectRatio="16:9"
                    className="rounded-soft shadow-sm border border-border/30"
                  />
                  {block.caption && (
                    <figcaption className="text-caption text-muted-foreground text-center italic font-sans px-[16px]">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            case 'pullquote':
              return (
                <blockquote
                  key={idx}
                  className="border-l-4 border-primary pl-[24px] py-[12px] my-[32px] space-y-[8px] bg-muted-surface/40 rounded-r-soft"
                >
                  <p className="text-body-lg md:text-heading-sm font-display italic text-primary-text leading-relaxed">
                    "{block.text}"
                  </p>
                  {block.attribution && (
                    <cite className="block text-caption font-mono uppercase tracking-wider text-muted-foreground not-italic font-bold">
                      — {block.attribution}
                    </cite>
                  )}
                </blockquote>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* 3. Curated "Shop the Story" cross-department product feature */}
      {products && products.length > 0 && (
        <div className="pt-[64px] md:pt-[80px] border-t border-border/40">
          <CollectionFeature
            title="Shop the Journal Edit"
            description="Explore the authentic hand-loom garments, chisel-filigree sterling jewelry, and weaver masterworks highlighted in this story."
            products={products}
          />
        </div>
      )}
    </article>
  );
}
