import { Link } from 'react-router-dom';
import { Breadcrumbs } from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { ResponsiveImage } from 'src/components/shared/ResponsiveImage';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Skeleton } from 'src/components/ui/skeleton';
import { useGetArticlesQuery } from 'src/features/editorial/editorialApi';

/**
 * EditIndexPage displays the Editorial Journal hub, mapping curated essays,
 * artisan profiles, and regional design memoirs into a highly visual, responsive grid.
 */
export default function EditIndexPage() {
  const { data: articles, isLoading, isError } = useGetArticlesQuery();

  return (
    <Container className="py-[48px]">
      {/* 1. Page Header with Breadcrumbs Nav */}
      <header className="space-y-[16px] border-b border-border/60 pb-[24px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Editorial Journal' },
          ]}
        />
        <SectionHeading
          title="The Journal — Sartorial Stories"
          description="A curated repository of regional craft technique memoirs, masterweaver dialogues, and ancestral metalwork legacies."
          align="left"
        />
      </header>

      {/* 2. Main Content Grid - Varied vertical gap mt-[48px] md:mt-[64px] */}
      <main className="mt-[48px] md:mt-[64px]">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[48px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-[16px]">
                <Skeleton className="aspect-video w-full rounded-soft" />
                <div className="space-y-[8px]">
                  <Skeleton className="h-[14px] w-[30%]" />
                  <Skeleton className="h-[24px] w-[80%]" />
                  <Skeleton className="h-[16px] w-[95%]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="p-[16px] rounded-soft bg-error/10 text-error text-body-sm font-semibold border border-error/20">
            Failed to load journal articles. Please refresh the page to attempt reconnect.
          </div>
        )}

        {!isLoading && !isError && articles && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] md:gap-[64px]">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/edit/${article.slug}`}
                className="group flex flex-col gap-[16px]"
              >
                {/* Visual Image Card with subtle interactive scale overlay */}
                <div className="relative aspect-video overflow-hidden rounded-soft bg-muted-surface border border-border/30 shadow-sm group-hover:shadow-card transition-all duration-300">
                  <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                    <ResponsiveImage
                      src={article.heroImage.src}
                      alt={article.heroImage.alt}
                      aspectRatio="16:9"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Card Editorial Copy */}
                <div className="space-y-[8px] flex flex-col">
                  <span className="font-mono text-caption text-primary font-bold uppercase tracking-wider">
                    {article.publishedAt}
                  </span>
                  <h2 className="text-body-lg md:text-heading-sm font-display font-semibold text-primary-text leading-tight group-hover:text-primary transition-colors text-balance">
                    {article.title}
                  </h2>
                  {article.dek && (
                    <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-2 text-balance">
                      {article.dek}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </Container>
  );
}
