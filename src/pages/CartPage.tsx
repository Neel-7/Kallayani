import { Link } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';

export default function CartPage() {
  return (
    <Container className="py-[48px] space-y-[32px]">
      <SectionHeading
        title="Your Bag"
        description="Review your editorial selects before final checkout."
        align="left"
      />
      <EmptyState
        title="Your bag is currently empty"
        description="Bespoke edits and jewelry selections you place in your bag will appear here."
        action={
          <Button asChild>
            <Link to="/">Explore Curation</Link>
          </Button>
        }
      />
    </Container>
  );
}
