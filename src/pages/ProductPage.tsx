import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useGetProductBySlugQuery,
  useGetProductsQuery,
} from 'src/api/catalogApi';
import { ProductGallery } from 'src/components/commerce/ProductGallery';
import { ProductGrid } from 'src/components/commerce/ProductGrid';
import { SizeGuideModal } from 'src/components/commerce/SizeGuideModal';
import { VariantSelector } from 'src/components/commerce/VariantSelector';
import { WishlistButton } from 'src/components/commerce/WishlistButton';
import { CraftsmanshipBlock } from 'src/components/editorial/CraftsmanshipBlock';
import { Breadcrumbs } from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { Price } from 'src/components/shared/Price';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import { addToCart } from 'src/features/cart/cartSlice';
import {
  resetProductUi,
  setSelectedColor,
  setSelectedSize,
} from 'src/features/product/productSlice';
import { useProductGallery } from 'src/features/product/useProductGallery';
import { useVariantSelection } from 'src/features/product/useVariantSelection';
import { useToast } from 'src/hooks/use-toast';
import { useAppDispatch } from 'src/store/hooks';

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const { productId: slug } = useParams<{ productId: string }>();
  const { toast } = useToast();

  // Reset local UI states whenever the product slug changes (prevents cache leakage across detail views)
  React.useEffect(() => {
    dispatch(resetProductUi());
  }, [slug, dispatch]);

  // Fetch central product data via RTK Query
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductBySlugQuery(slug || '');

  // Fetch full products list to extract dynamically related products from the same category
  const { data: allProducts } = useGetProductsQuery();

  // Connect local gallery and size states via selectors
  const { activeIndex, setIndex } = useProductGallery();
  const { selectedSize, selectedColor, selectedVariant, isSingleVariant } =
    useVariantSelection(product);

  const relatedProducts = React.useMemo(() => {
    if (!product || !allProducts) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  if (isLoading) {
    return (
      <Container className="py-[48px] space-y-[32px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px]">
          <Skeleton className="aspect-[4/5] w-full rounded-soft" />
          <div className="space-y-[24px]">
            <Skeleton className="h-[32px] w-[80%]" />
            <Skeleton className="h-[24px] w-[40%]" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[48px] w-full" />
          </div>
        </div>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container className="py-[96px] text-center space-y-[24px]">
        <SectionHeading
          title="Product not discovered"
          description="The product profile you are attempting to view is missing or temporarily unavailable."
          align="center"
        />
        <Button asChild>
          <Link to="/women">Return to Catalog</Link>
        </Button>
      </Container>
    );
  }

  // Resolve whether selected variant is out of stock
  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    dispatch(
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        quantity: 1,
      }),
    );
    toast({
      title: 'Added to Bag',
      description: `"${product.name}" in Size ${selectedSize || 'OS'} has been added to your shopping bag.`,
    });
  };

  const handleNotifyMe = () => {
    // STUBBED UI ACTION (As strictly required by M10):
    console.log(
      '[M10 STUB] Notify Me triggered for variant ID:',
      selectedVariant?.id,
    );
    toast({
      title: 'Notification Requested',
      description: `We will notify you immediately once shade "${selectedColor || 'Default'}" in Size ${selectedSize || 'OS'} is restocked!`,
    });
  };

  return (
    <Container className="py-[48px]">
      {/* 1. Breadcrumbs Nav & Main Detail layout */}
      <div className="space-y-[24px]">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: formatText(product.category),
              href: `/${product.category}`,
            },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] md:gap-[48px] items-start">
          {/* Gallery View Module */}
          <ProductGallery
            images={product.images}
            activeIndex={activeIndex}
            onIndexChange={setIndex}
          />

          {/* Details & Interactive Buy Box Segment */}
          <div className="space-y-[32px]">
            {/* Header info */}
            <div className="space-y-[8px]">
              <span className="text-caption uppercase tracking-wider font-mono text-primary font-bold">
                {product.fabric}
              </span>
              <h1 className="text-display-md font-display font-bold tracking-tight text-foreground">
                {product.name}
              </h1>

              {/* Price Display */}
              <Price
                amount={product.price.amount}
                className="text-heading-md"
              />

              {/* Craftsmanship Line */}
              <p className="text-body-sm text-muted-foreground mt-[8px]">
                Adorned with traditional{' '}
                <strong>{product.productStory.craftTechnique}</strong>,
                painstakingly hand-worked in{' '}
                <strong>{product.productStory.regionalOrigin}</strong>.
              </p>
            </div>

            {/* Variant Selector Block */}
            <div className="border-t border-b border-border/40 py-[24px] space-y-[24px]">
              <VariantSelector
                variants={product.variants}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeSelect={(size) => dispatch(setSelectedSize(size))}
                onColorSelect={(color) => dispatch(setSelectedColor(color))}
              />

              {!isSingleVariant && <SizeGuideModal />}
            </div>

            {/* Buy / CTA Actions Block */}
            <div className="space-y-[16px]">
              {isOutOfStock ? (
                // Notify Me out-of-stock path
                <div className="space-y-[12px]">
                  <p className="text-body-sm font-semibold text-error">
                    This selection is currently out of stock.
                  </p>
                  <Button
                    onClick={handleNotifyMe}
                    className="w-full h-[56px] text-body-sm font-bold bg-primary hover:bg-primary-text text-surface"
                  >
                    Notify Me When Available
                  </Button>
                </div>
              ) : (
                // Normal add-to-cart path
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-[56px] text-body-sm font-bold bg-primary hover:bg-primary-text text-surface"
                >
                  Add to Bag
                </Button>
              )}

              {/* Wishlist Controller Button */}
              <WishlistButton
                productId={product.id}
                productName={product.name}
                variant="button"
              />
            </div>

            {/* Shipping & Returns Accordion */}
            <Accordion
              type="single"
              collapsible
              className="w-full border-t border-border/40"
            >
              <AccordionItem
                value="shipping"
                className="border-b border-border/40"
              >
                <AccordionTrigger className="text-body-sm font-semibold py-[16px] hover:no-underline">
                  Shipping & Delivery
                </AccordionTrigger>
                <AccordionContent className="text-body-sm text-muted-foreground leading-relaxed">
                  Complimentary standard shipping across the United States.
                  Deliveries arrive in 3–5 business days, beautifully packaged
                  in premium linen bags. Express options are available at
                  checkout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="returns"
                className="border-b border-border/40"
              >
                <AccordionTrigger className="text-body-sm font-semibold py-[16px] hover:no-underline">
                  Returns & Exchanges
                </AccordionTrigger>
                <AccordionContent className="text-body-sm text-muted-foreground leading-relaxed">
                  We accept exchanges or returns within 14 days of delivery.
                  Garments must remain in pristine unworn condition with tags
                  intact. Complimentary return tags will be issued upon request.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* 2. Product Story Block (Craftsmanship details) - Spacing: mt-[64px] md:mt-[80px] (generous spacing before storytelling) */}
      <div className="mt-[64px] md:mt-[80px] space-y-[20px]">
        <h3 className="text-heading-sm font-display font-semibold tracking-wide text-primary-text">
          Craftsmanship Details
        </h3>
        <CraftsmanshipBlock
          isJewelry={product.category === 'jewelry'}
          craftTechnique={product.productStory.craftTechnique}
          regionalOrigin={product.productStory.regionalOrigin}
          description={product.productStory.description}
        />
      </div>

      {/* 3. Specs Details & Care grids - Spacing: mt-[48px] md:mt-[64px] (moderate gap) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[48px] border-t border-border/40 pt-[48px] mt-[48px] md:mt-[64px]">
        <div className="space-y-[12px]">
          <h4 className="text-body-sm font-bold uppercase tracking-wider text-primary">
            Garment Specifications
          </h4>
          <ul className="text-body-sm text-muted-foreground space-y-[8px] leading-relaxed list-disc list-inside">
            <li>Weft Structure: 100% fine hand-loom fibers</li>
            <li>Thread Details: Mysore Mulberry heavy weave</li>
            <li>Sizing Fit: Regular classic silhouette drape</li>
            <li>Craft Origin: Varanasi weavers co-operative</li>
          </ul>
        </div>
        <div className="space-y-[12px]">
          <h4 className="text-body-sm font-bold uppercase tracking-wider text-primary">
            Garment Care
          </h4>
          <ul className="text-body-sm text-muted-foreground space-y-[8px] leading-relaxed list-disc list-inside">
            <li>
              Laundering: Dry clean only to preserve natural fiber structure
            </li>
            <li>Ironing: Low heat warm steam iron inside out</li>
            <li>
              Embellishments: Protect gold zari threads from direct friction
            </li>
            <li>Storage: Wrap in dry muslin bag inside airy closets</li>
          </ul>
        </div>
      </div>

      {/* 4. Related Products Grid - Spacing: mt-[80px] md:mt-[96px] (even more generous spacing before cross-sell) */}
      {relatedProducts.length > 0 && (
        <div className="space-y-[24px] border-t border-border/40 pt-[48px] mt-[80px] md:mt-[96px]">
          <h3 className="text-heading-sm font-display font-bold text-primary-text">
            Related Collections
          </h3>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </Container>
  );
}

function formatText(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');
}
