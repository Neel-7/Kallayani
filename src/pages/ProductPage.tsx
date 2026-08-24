import { useParams } from 'react-router-dom';
import { Breadcrumbs } from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';

export default function ProductPage() {
  const { productId } = useParams();

  return (
    <Container className="py-[48px] space-y-[24px]">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Product Detail' }]}
      />
      <SectionHeading
        title={`Product — ${productId || 'Detail'}`}
        description="Bespoke luxury specifications and high-resolution visual curation. Product catalog data pending."
        align="left"
      />
    </Container>
  );
}
