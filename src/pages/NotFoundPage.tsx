import { Link } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Button } from 'src/components/ui/button';

export default function NotFoundPage() {
  return (
    <Container className="py-[96px] text-center flex flex-col items-center gap-[24px]">
      <SectionHeading
        title="404 — Page Not Found"
        description="The editorial story or curated edit you are looking for does not exist or has been relocated."
        align="center"
      />
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </Container>
  );
}
