import { Button, Flex, Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { useParams } from 'react-router-dom';
import { APP_URL } from '../../lib/config';

type ViewCookbookSnippetsEmptyFilteredProps = {
  clearSearch: () => void;
};

export default function ViewCookbookSnippetsEmptyFiltered({
  clearSearch,
}: ViewCookbookSnippetsEmptyFilteredProps) {
  const params = useParams();

  return (
    <EmptyState
      title="No snippets match that search"
      description="There are no snippets in this cookbook that match your search."
      illustration="empty"
      py="space_64"
    >
      <Flex gridGap="space_16">
        <Button variant="secondary" size="sm" onClick={clearSearch}>
          Clear Filters
        </Button>

        <Link
          isExternal
          href={`${APP_URL}/assistant/snippet/create?cookbookId=${params.cookbookId}`}
          variant="primary"
          size="sm"
        >
          Add Snippet to Cookbook
        </Link>
      </Flex>
    </EmptyState>
  );
}
