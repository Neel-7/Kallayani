import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';

export default function CheckoutPage() {
  return (
    <Container className="py-[48px]">
      <SectionHeading
        title="Checkout — Payment & Delivery"
        description="Secure SSL encrypted transactional portal. Inputs and billing forms pending."
        align="left"
      />
    </Container>
  );
}
