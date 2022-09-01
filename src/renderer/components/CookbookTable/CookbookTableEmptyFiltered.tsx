import { Button, Flex, Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { APP_URL } from '../../lib/config';
import { useFilters } from '../FiltersContext';

export default function CookbookTableEmptyFiltered() {
  const { resetAllFilters } = useFilters();

  return (
    <EmptyState
      title="No cookbooks match that criteria"
      description="You don't have any cookbooks that match your filter criteria."
      illustration="empty"
      py="space_64"
    >
      <Flex gridGap="space_16">
        <Button variant="secondary" size="sm" onClick={resetAllFilters}>
          Clear Filters
        </Button>
        <Link
          isExternal
          href={`${APP_URL}/assistant/cookbook/create`}
          variant="primary"
          size="sm"
        >
          Create Cookbook
        </Link>
      </Flex>
    </EmptyState>
  );
}
