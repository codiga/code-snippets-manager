import { Button, Flex, Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { APP_URL } from '../../lib/config';
import { useFilters } from '../FiltersContext';

export default function SearchResultsEmpty() {
  const { resetAllFilters } = useFilters();

  return (
    <EmptyState
      title="No snippets match that criteria"
      description="We didn't find any snippets that match your filter criteria."
      illustration="empty"
      py="space_64"
    >
      <Flex gridGap="space_16">
        <Button variant="secondary" size="sm" onClick={resetAllFilters}>
          Clear Filters
        </Button>
        <Link
          isExternal
          href={`${APP_URL}/assistant/snippet/create`}
          variant="primary"
          size="sm"
        >
          Create Snippet
        </Link>
      </Flex>
    </EmptyState>
  );
}
