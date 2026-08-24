import { Link } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';

export default function WishlistPage() {
  return (
    <Container className="py-[48px] space-y-[32px]">
      <SectionHeading
        title="Your Wishlist"
        description="Save your favorite tailored edits here for quick access later."
        align="left"
      />
      <EmptyState
        title="Your wishlist is empty"
        description="Start exploring our curated collections and tap the heart icon to save products."
        action={
          <Button asChild>
            <Link to="/">Browse Collections</Link>
          </Button>
        }
      />
    </Container>
  );
}
