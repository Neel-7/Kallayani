import { useParams } from 'react-router-dom';
import { Breadcrumbs } from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';

export default function EditPage() {
  const { storyId } = useParams();

  return (
    <Container className="py-[48px] space-y-[24px]">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Editorial Journal', href: '/edit' },
          ...(storyId ? [{ label: `Story ${storyId}` }] : []),
        ]}
      />
      <SectionHeading
        title={
          storyId
            ? `Journal — Story ${storyId}`
            : 'The Journal — Sartorial Stories'
        }
        description="Craftsmanship journals, weaver profiles, and curated design essays. Content pending."
        align="left"
      />
    </Container>
  );
}
