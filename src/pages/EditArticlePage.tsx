import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from 'src/api/catalogApi';
import { EditorialStory } from 'src/components/editorial/EditorialStory';
import { Breadcrumbs } from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import { useGetArticleBySlugQuery } from 'src/features/editorial/editorialApi';

/**
 * EditArticlePage fetches a single editorial story by its slug,
 * retrieves related product specifications, and renders the premium storytelling module.
 */
export default function EditArticlePage() {
  const { storyId } = useParams<{ storyId: string }>();

  // Fetch the article details by slug
  const {
    data: article,
    isLoading: isArticleLoading,
    isError: isArticleError,
  } = useGetArticleBySlugQuery(storyId || '');

  // Fetch all products to resolve related products for the "Shop the Story" row
  const { data: allProducts, isLoading: isProductsLoading } =
    useGetProductsQuery();

  const relatedProducts = React.useMemo(() => {
    if (!article || !allProducts) return [];
    return allProducts.filter((p) => article.relatedProductIds.includes(p.id));
  }, [article, allProducts]);

  const isLoading = isArticleLoading || isProductsLoading;

  if (isLoading) {
    return (
      <Container className="py-[48px] space-y-[32px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Editorial Journal', href: '/edit' },
            { label: 'Loading Story...' },
          ]}
        />
        <div className="space-y-[24px]">
          <Skeleton className="h-[40vh] w-full rounded-soft" />
          <div className="max-w-[720px] mx-auto space-y-[16px]">
            <Skeleton className="h-[32px] w-[80%]" />
            <Skeleton className="h-[20px] w-[40%]" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
          </div>
        </div>
      </Container>
    );
  }

  if (isArticleError || !article) {
    return (
      <Container className="py-[96px] text-center space-y-[24px]">
        <SectionHeading
          title="Story Not Discovered"
          description="The craftsmanship journal essay you are attempting to explore is missing or temporarily unavailable."
          align="center"
        />
        <Button asChild>
          <Link to="/edit">Return to Journal Hub</Link>
        </Button>
      </Container>
    );
  }

  return (
    <div className="pb-[48px]">
      {/* 1. Header Navigation Context - Clean breadcrumbs on top */}
      <Container className="pt-[24px] pb-[16px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Editorial Journal', href: '/edit' },
            { label: article.title },
          ]}
        />
      </Container>

      {/* 2. Primary Presentational Narrative component */}
      <EditorialStory article={article} products={relatedProducts} />
    </div>
  );
}
