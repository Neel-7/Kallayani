import { useGetProductsQuery } from 'src/api/catalogApi';
import { ProductGrid } from 'src/components/commerce/ProductGrid';
import { CampaignBanner } from 'src/components/editorial/CampaignBanner';
import { CollectionFeature } from 'src/components/editorial/CollectionFeature';
import { DepartmentGrid } from 'src/components/editorial/DepartmentGrid';
import { Hero } from 'src/components/editorial/Hero';
import { ImageTextSection } from 'src/components/editorial/ImageTextSection';
import { NewsletterCapture } from 'src/components/editorial/NewsletterCapture';
import { AnnouncementBar } from 'src/components/shared/AnnouncementBar';
import { Container } from 'src/components/shared/Container';
import { ScrollReveal } from 'src/components/shared/ScrollReveal';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { ThreadDivider } from 'src/components/shared/ThreadDivider';
import { Skeleton } from 'src/components/ui/skeleton';

export default function HomePage() {
  const { data: products, isLoading } = useGetProductsQuery();

  // 1. New Arrivals: Take the first 4 products from the catalog
  const newArrivals = products?.slice(0, 4) || [];

  // 2. Featured Collection: Filter products containing 'Jamdani' or fallback to a subset
  const jamdanis =
    products?.filter(
      (p) =>
        p.name.toLowerCase().includes('jamdani') ||
        p.description.toLowerCase().includes('jamdani'),
    ) || [];
  const featuredCollectionProducts =
    jamdanis.length > 0 ? jamdanis.slice(0, 4) : products?.slice(2, 6) || [];

  return (
    <div className="w-full flex flex-col font-sans overflow-x-hidden">
      {/* 1. Slim Ephemeral Dismissible Announcement Bar (§12.1) */}
      <AnnouncementBar message="Discover our Autumn Heritage Release • Complimentary worldwide shipping on orders over $250" />

      {/* 2. Premium Hero Section with Full ScrollReveal (§12.3) */}
      <ScrollReveal>
        <Hero
          image="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80"
          headline="Sartorial Preservation"
          subhead="Slow-made heritage sarees, luxurious hand-spun khadi sets, and bespoke accents crafted on generational looms."
          ctaLabel="Explore Heritage Weaves"
          ctaHref="/women"
        />
      </ScrollReveal>

      {/* 3. Signature Cultural Touchpoint: ThreadDivider as quiet transition marker per PART F */}
      <Container className="pt-[16px] md:pt-[24px]">
        <ThreadDivider
          color="primary"
          className="max-w-[320px] mx-auto opacity-50"
        />
      </Container>

      {/* Main Container - Spacing rhythm is varied manually at each child element to fix undifferentiated audit finding per PART D */}
      <Container className="pb-[96px] md:pb-[144px]">
        {/* 4. Shop by Department 3-Tile Block (§12.4) - Spacing: mt-[48px] md:mt-[64px] (tighter spacing to Hero) */}
        <ScrollReveal delay={100}>
          <section className="mt-[48px] md:mt-[64px] space-y-[24px]">
            <SectionHeading
              title="Shop by Department"
              description="Explore curated collections spanning high fashion, sculptural sterling jewelry, and comfort-driven interior spaces."
              align="left"
            />
            <DepartmentGrid />
          </section>
        </ScrollReveal>

        {/* 5. New Arrivals Grid (§12.5) - Spacing: mt-[80px] md:mt-[96px] (moderate segment gap) */}
        <section className="mt-[80px] md:mt-[96px] space-y-[32px] md:space-y-[48px]">
          <ScrollReveal delay={150}>
            <SectionHeading
              title="The Autumn Vernacular"
              description="Fresh arrivals from South Asia's historic artisanal pockets. Subtle hand-spun textures tailored for lightweight elegance."
              align="left"
            />
          </ScrollReveal>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] md:gap-[24px]">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-[12px] animate-pulse">
                  <Skeleton className="aspect-[4/5] w-full rounded-soft" />
                  <Skeleton className="h-[14px] w-[60%]" />
                  <Skeleton className="h-[20px] w-[80%]" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={newArrivals} />
          )}
        </section>

        {/* 6. Editorial Story Block (§12.6) - Spacing: mt-[96px] md:mt-[120px] (generous break before big editorial story) */}
        <ScrollReveal delay={200}>
          <section className="mt-[96px] md:mt-[120px]">
            <ImageTextSection
              variant="large"
              image="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&auto=format&fit=crop&q=80"
              title="A Legacy of Living Looms"
              description="Every Kallayani piece begins on a wooden pit loom. We preserve slow weaver heritage, tracing every yarn back to regional artisan clusters. Slow craft is not a marketing tool—it is our absolute operating boundary."
              ctaLabel="Read The Sartorial Journal"
              ctaHref="/edit"
            />
          </section>
        </ScrollReveal>

        {/* 7. Featured Collection Section (§12.7) - Spacing: mt-[80px] md:mt-[96px] (moderate gap) */}
        <section className="mt-[80px] md:mt-[96px]">
          {isLoading ? (
            <div className="space-y-[32px] animate-pulse">
              <Skeleton className="h-[36px] w-[320px]" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="aspect-[4/5] w-full rounded-soft"
                  />
                ))}
              </div>
            </div>
          ) : (
            <CollectionFeature
              title="The Jamdani Edit"
              description="Explore sheer, lightweight cotton and silk blends adorned with floating floral motifs—historically celebrated as the peak of hand-weaving skill."
              products={featuredCollectionProducts}
              ctaLabel="View Full Collection"
              ctaHref="/women"
            />
          )}
        </section>

        {/* 8. Seasonal Festive Campaign Banner (§12.8) - Spacing: mt-[120px] md:mt-[160px] (massive block gap for dramatic visual shift) */}
        {/* Rendered as variant="festive" (using secondary wine background per PART C) */}
        <ScrollReveal delay={100}>
          <section className="mt-[120px] md:mt-[160px]">
            <CampaignBanner
              variant="festive"
              image="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80"
              title="The Festive Heritage Curation"
              subtitle="Adorn yourself in heavy gold zari borders, luxury brocades, and vibrant organic dyes tailored for autumnal galas and intimate weddings."
              tagline="Bespoke Autumn Release"
              ctaLabel="Discover Festive Edit"
              ctaHref="/festive"
            />
          </section>
        </ScrollReveal>

        {/* 9. Brand Story Strip (§12.9) - Spacing: mt-[80px] md:mt-[96px] (moderate gap) */}
        <ScrollReveal delay={150}>
          <section className="mt-[80px] md:mt-[96px]">
            <ImageTextSection
              variant="compact"
              reverse
              image="https://images.unsplash.com/photo-1590736969955-71cb91d3376d?w=1000&auto=format&fit=crop&q=80"
              title="Preservation Through Micro-Contracts"
              description="By eliminating intermediaries and working directly with master weavers, we return up to 75% of garment value back to regional weavers. This directly sustains generational craft lineages."
              ctaLabel="Our Sourcing Promise"
              ctaHref="/edit"
            />
          </section>
        </ScrollReveal>

        {/* 10. Newsletter Email Capture (§12.10) - Spacing: mt-[120px] md:mt-[160px] (massive gap before footer closeout) */}
        <ScrollReveal delay={200}>
          <section className="mt-[120px] md:mt-[160px] pt-[16px] md:pt-[32px]">
            <NewsletterCapture />
          </section>
        </ScrollReveal>
      </Container>
    </div>
  );
}
