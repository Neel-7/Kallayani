import { useParams } from 'react-router-dom';

import EditArticlePage from './EditArticlePage';
import EditIndexPage from './EditIndexPage';

/**
 * EditPage is the master entry controller for the editorial journal system.
 * Intelligently switches rendering between the Index list and specific Article details
 * based on the dynamic route parameter, keeping route wiring exceptionally clean.
 */
export default function EditPage() {
  const { storyId } = useParams<{ storyId: string }>();

  if (storyId) {
    return <EditArticlePage />;
  }

  return <EditIndexPage />;
}
