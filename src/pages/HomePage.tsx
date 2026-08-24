import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';

export default function HomePage() {
  return (
    <Container className="py-[48px]">
      <SectionHeading
        title="Kallayani — Home"
        description="Premium fashion, bespoke jewelry, and functional lifestyle edits. Content pending."
        align="left"
      />
    </Container>
  );
}
