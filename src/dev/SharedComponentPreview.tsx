import * as React from 'react';

import { Breadcrumbs } from '../components/shared/Breadcrumbs';
import { Container } from '../components/shared/Container';
import { EmptyState } from '../components/shared/EmptyState';
import { LoadMoreButton } from '../components/shared/LoadMoreButton';
import { Price } from '../components/shared/Price';
import { ResponsiveImage } from '../components/shared/ResponsiveImage';
import { SectionHeading } from '../components/shared/SectionHeading';
import { Button } from '../components/ui/button';

export function SharedComponentPreview() {
  const [loadMoreState, setLoadMoreState] = React.useState<
    'default' | 'loading' | 'end'
  >('default');
  const [imageKey, setImageKey] = React.useState(0);

  const handleResetImages = () => {
    setImageKey((prev) => prev + 1);
  };

  const handleLoadMoreClick = () => {
    setLoadMoreState('loading');
    setTimeout(() => {
      setLoadMoreState('end');
    }, 2000);
  };

  const handleResetLoadMore = () => {
    setLoadMoreState('default');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-[32px] font-sans xs:p-[16px] md:p-[32px] lg:p-[48px]">
      <header className="mb-[48px] border-b border-border pb-[24px]">
        <h1 className="text-display-lg font-display text-primary">
          Kallayani Shared UI Components
        </h1>
        <p className="text-body-lg text-muted-foreground mt-[8px]">
          Diagnostic Shared Components Preview Page — Presentation Layer (Phase
          1 / M4)
        </p>
        <p className="text-caption text-secondary mt-[4px]">
          Temporary View — Reusable cross-domain components with zero e-commerce
          dependencies
        </p>
      </header>

      <main className="space-y-[64px]">
        {/* 1. Container Wrapper */}
        <section className="space-y-[24px]">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            1. Container Wrapper (Layout Thresholds)
          </h3>
          <p className="text-body-sm text-muted-foreground">
            Borders show maximum width boundaries. Shrink your browser to
            observe padding thresholds.
          </p>
          <div className="space-y-[16px]">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                width="content" (Max width: 1280px)
              </span>
              <Container
                width="content"
                className="border border-primary-text bg-surface p-[16px] rounded-soft"
              >
                <p className="text-body-sm text-center">
                  Content layout wrapper boundary
                </p>
              </Container>
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                width="wide" (Max width: 1440px)
              </span>
              <Container
                width="wide"
                className="border border-primary-text bg-surface p-[16px] rounded-soft"
              >
                <p className="text-body-sm text-center">
                  Extended hero or large visual section wrapper boundary
                </p>
              </Container>
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                width="full-bleed" (No max width cap, 100%)
              </span>
              <Container
                width="full-bleed"
                className="border border-primary-text bg-surface p-[16px]"
              >
                <p className="text-body-sm text-center">
                  Edge-to-edge layout wrapper boundary (no gutters)
                </p>
              </Container>
            </div>
          </div>
        </section>

        {/* 2. Section Heading */}
        <section className="space-y-[24px]">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            2. Section Heading
          </h3>
          <div className="space-y-[32px] p-[24px] border border-border rounded-soft bg-surface">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                align="left" (Default, with title & description)
              </span>
              <SectionHeading
                title="Sartorial Legacy"
                description="Exploring pure textures and refined patterns from hand-woven fibers. Crafted as functional statement edits."
                align="left"
              />
            </div>
            <div className="border-t border-border pt-[16px]">
              <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                align="center" (Centred with title and description)
              </span>
              <SectionHeading
                title="Seasonal Collection"
                description="Designed for elegant transition between crisp spring mornings and balmy summer evenings."
                align="center"
              />
            </div>
            <div className="border-t border-border pt-[16px]">
              <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                align="left" (Title only)
              </span>
              <SectionHeading title="New Arrivals" align="left" />
            </div>
          </div>
        </section>

        {/* 3. Breadcrumbs Trail */}
        <section className="space-y-[24px]">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            3. Breadcrumbs
          </h3>
          <div className="p-[24px] border border-border rounded-soft bg-surface space-y-[16px]">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                4-level navigation trail (last item non-interactive current
                page)
              </span>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Category Selection', href: '#' },
                  { label: 'Editorial Sublist', href: '#' },
                  { label: 'Current Accent Piece' },
                ]}
              />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                2-level basic trail
              </span>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Collection Overview' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 4. Price Component */}
        <section className="space-y-[24px]">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            4. Price Formatting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] p-[24px] border border-border rounded-soft bg-surface">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Standard whole-dollar price ($120.00)
              </span>
              <Price amount={12000} />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Cents-inclusive price ($45.99)
              </span>
              <Price amount={4599} />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                Discounted price ($29.00 vs $45.00)
              </span>
              <Price amount={2900} compareAtAmount={4500} />
            </div>
          </div>
        </section>

        {/* 5. Responsive Image */}
        <section className="space-y-[24px]">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            5. Responsive Image (CDN Ready Contract, No Layout Shift)
          </h3>
          <p className="text-body-sm text-muted-foreground">
            Bridges skeleton loader and loaded state with zero shifts. Click the
            button to trigger a reload crossfade.
          </p>
          <div className="mb-[16px]">
            <Button onClick={handleResetImages}>
              Re-trigger Crossfade Load
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[24px]">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                aspectRatio="4:5" (Portrait)
              </span>
              <ResponsiveImage
                key={`45-${imageKey}`}
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60"
                alt="Portrait fashion sample model wearing tailored long trenchcoat"
                aspectRatio="4:5"
              />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                aspectRatio="1:1" (Square)
              </span>
              <ResponsiveImage
                key={`11-${imageKey}`}
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=60"
                alt="Square format close-up detailed textile craftsmanship sample"
                aspectRatio="1:1"
              />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                aspectRatio="16:9" (Landscape/Video)
              </span>
              <ResponsiveImage
                key={`169-${imageKey}`}
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=60"
                alt="Landscape layout showing premium fabric rolls lined in rack display"
                aspectRatio="16:9"
              />
            </div>
          </div>
        </section>

        {/* 6. Empty State */}
        <section className="space-y-[24px]">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            6. Empty State Placeholder
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                EmptyState with Action CTA passed in
              </span>
              <EmptyState
                title="No items discovered"
                description="Explore our curation or adjust your search filter criteria to find tailored matches."
                action={<Button>Explore Curation</Button>}
              />
            </div>
            <div>
              <span className="block text-caption text-muted-foreground font-mono mb-[8px]">
                EmptyState without Action (pure message)
              </span>
              <EmptyState
                title="Your bag is currently empty"
                description="Edits you place inside your bag will appear right here for direct checkout."
              />
            </div>
          </div>
        </section>

        {/* 7. Load More Button */}
        <section className="space-y-[24px]">
          <h3 className="text-heading-sm font-semibold text-primary font-display border-b border-border pb-[8px]">
            7. Load More Button
          </h3>
          <div className="p-[24px] border border-border rounded-soft bg-surface space-y-[16px]">
            {loadMoreState === 'default' && (
              <div>
                <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                  Default hasMore=true state (Click to trigger simulation)
                </span>
                <LoadMoreButton hasMore={true} onClick={handleLoadMoreClick} />
              </div>
            )}
            {loadMoreState === 'loading' && (
              <div>
                <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                  Active isLoading=true loading state
                </span>
                <LoadMoreButton
                  hasMore={true}
                  isLoading={true}
                  onClick={() => {}}
                />
              </div>
            )}
            {loadMoreState === 'end' && (
              <div>
                <span className="block text-caption text-muted-foreground font-mono mb-[4px]">
                  Pagination completed hasMore=false state
                </span>
                <LoadMoreButton hasMore={false} onClick={() => {}} />
                <div className="flex justify-center mt-2">
                  <Button variant="secondary" onClick={handleResetLoadMore}>
                    Reset Simulation State
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-[64px] border-t border-border pt-[24px] text-center text-caption text-muted-foreground">
        Kallayani — Phase 1 (M4) Complete and Verified.
      </footer>
    </div>
  );
}
