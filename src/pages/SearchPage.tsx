import * as React from 'react';
import { Container } from 'src/components/shared/Container';
import { EmptyState } from 'src/components/shared/EmptyState';
import { SectionHeading } from 'src/components/shared/SectionHeading';
import { Input } from 'src/components/ui/input';

export default function SearchPage() {
  const [query, setQuery] = React.useState('');

  return (
    <Container className="py-[48px] space-y-[32px]">
      <SectionHeading
        title="Search Catalog"
        description="Search across premium fabrics, jewelry accents, and home collections."
        align="left"
      />
      <div className="max-w-[480px]">
        <Input
          type="search"
          placeholder="Type search queries (e.g. Silk, Brass, Gold)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <EmptyState
        title={query ? `No results for "${query}"` : 'Enter a search query'}
        description="Try searching for general materials, categories, or colors to see our premium catalog."
      />
    </Container>
  );
}
