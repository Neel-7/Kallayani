import { useLocation } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';

export default function AccountPage() {
  const { pathname } = useLocation();
  const subPath = pathname.split('/').filter(Boolean)[1] || 'overview';

  const formatText = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');

  return (
    <Container className="py-[32px] space-y-[24px]">
      <SectionHeading
        title={`Account — ${formatText(subPath)}`}
        description={`Manage and configure your personal ${subPath} settings. Content pending.`}
        align="left"
      />
    </Container>
  );
}
