import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CollectionFeature } from 'src/components/editorial/CollectionFeature';
import { Hero } from 'src/components/editorial/Hero';
import { Breadcrumbs } from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import { useGetOccasionBySlugQuery } from 'src/features/occasion/occasionApi';

/**
 * OccasionLandingPage is a generic, 100% data-driven landing page template per M17.
 * Composes Hero + CollectionFeature + ProductGrid to render custom curated festival edits.
 * Contains ZERO occasion-specific conditional logic or hardcoded strings.
 */
export default function OccasionLandingPage() {
  const { occasion } = useParams<{ occasion: string }>();

  // Fetch the data-driven landing configurations by slug
  const {
    data: landingData,
    isLoading,
    isError,
  } = useGetOccasionBySlugQuery(occasion || '');

  // Define varied spacing classes dynamically to enforce design rhythm
  // Section 1: mt-[48px] md:mt-[64px], Section 2: mt-[80px] md:mt-[112px], etc.
  const sectionSpacings = useMemo(() => ['mt-[48px] md:mt-[64px]', 'mt-[80px] md:mt-[112px]', 'mt-[96px] md:mt-[128px]'], []);

  if (isLoading) {
    return (
      <Container className="py-[48px] space-y-[32px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Loading Occasion...' },
          ]}
        />
        <div className="space-y-[24px]">
          <Skeleton className="h-[50vh] w-full rounded-soft" />
          <div className="max-w-[720px] space-y-[12px]">
            <Skeleton className="h-[24px] w-[60%]" />
            <Skeleton className="h-[16px] w-[90%]" />
            <Skeleton className="h-[16px] w-[80%]" />
          </div>
        </div>
      </Container>
    );
  }

  if (isError || !landingData) {
    return (
      <Container className="py-[96px] text-center space-y-[24px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Occasions', href: '/' },
            { label: 'Not Found' },
          ]}
        />
        <div className="max-w-[640px] mx-auto space-y-[16px]">
          <h1 className="text-display-md font-display font-bold text-primary-text leading-tight">
            Occasion Showcase Missing
          </h1>
          <p className="text-body-md text-muted-foreground">
            The festive selection or curated collection you are trying to view is not currently modeled or has expired.
          </p>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="pb-[96px]">
      {/* 1. Breadcrumbs Nav - Positioned at top container level */}
      <Container className="pt-[24px] pb-[16px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Festive & Occasions' },
            { label: landingData.title },
          ]}
        />
      </Container>

      {/* 2. Floating Hero Banner - Consistent with post-elevation visual specs */}
      <Hero
        image={landingData.heroImage.src}
        headline={landingData.title}
        subhead="A Signature Collection Edit"
        ctaLabel="Explore the Edit"
        ctaHref="#explore"
      />

      {/* Anchor target for CTA scrolling action */}
      <div id="explore" className="scroll-mt-[24px]" />

      {/* 3. Editorial Intro Standfirst Statement */}
      <Container className="max-w-[720px] mx-auto text-center mt-[32px] md:mt-[48px]">
        <p className="text-body-md md:text-body-lg text-foreground/85 font-sans leading-relaxed text-balance italic">
          {landingData.intro}
        </p>
      </Container>

      {/* 4. Curated Heterogeneous Sections Grid */}
      <Container className="mt-[48px] md:mt-[64px]">
        <div className="space-y-0">
          {landingData.featuredSections.map((section, idx) => {
            // Apply varied spacing dynamically from the rhythm scale to avoid uniform gap blocks
            const spacingClass = sectionSpacings[idx] || 'mt-[96px] md:mt-[128px]';

            return (
              <div key={section.heading} className={spacingClass}>
                <CollectionFeature
                  title={section.heading}
                  description="Curated handcraft masterworks and heritage specialties synchronized for this occasion."
                  products={section.products}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
