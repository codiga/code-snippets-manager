import { Flex, Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { useParams } from 'react-router-dom';
import { APP_URL } from '../../lib/config';

export default function ViewCookbookSnippetsEmpty() {
  const params = useParams();

  return (
    <EmptyState
      title="No snippets found"
      description="This cookbook doesn't have any snippets."
      illustration="empty"
      py="space_64"
    >
      <Flex gridGap="space_16">
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
