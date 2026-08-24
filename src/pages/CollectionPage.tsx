import { useLocation, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from 'src/components/shared/Breadcrumbs';
import { Container } from 'src/components/shared/Container';
import { SectionHeading } from 'src/components/shared/SectionHeading';

export default function CollectionPage() {
  const { category, occasion } = useParams();
  const { pathname } = useLocation();

  // Parse top level department from pathname (e.g. "/women/sarees" -> "women")
  const pathParts = pathname.split('/').filter(Boolean);
  const department = pathParts[0] || 'Collection';

  // Capitalize for clean rendering
  const formatText = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');

  const titleText = category
    ? `${formatText(department)} — ${formatText(category)}`
    : occasion
      ? `Festive — ${formatText(occasion)}`
      : `${formatText(department)}`;

  // CLARIFYING COMMENT (architectural constraint):
  // The "/home" path represents the Home Decor / Living department,
  // whereas the app's root "/" represents the brand's primary HomePage.
  const isDecorDept = department.toLowerCase() === 'home';

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    {
      label: isDecorDept ? 'Home Decor' : formatText(department),
      href: `/${department}`,
    },
  ];
  if (category) breadcrumbItems.push({ label: formatText(category) });
  if (occasion) breadcrumbItems.push({ label: formatText(occasion) });

  return (
    <Container className="py-[48px] space-y-[24px]">
      <Breadcrumbs items={breadcrumbItems} />
      <SectionHeading
        title={titleText}
        description={`Browsing the ${isDecorDept ? 'Home Decor & Living' : formatText(department)} curation block. Collection items pending.`}
        align="left"
      />
    </Container>
  );
}
