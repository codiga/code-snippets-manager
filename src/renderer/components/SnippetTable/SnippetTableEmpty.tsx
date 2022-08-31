import { Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { APP_URL } from '../../lib/config';

export default function SnippetTableEmpty() {
  return (
    <EmptyState
      title="No snippets found"
      description="You don't have any snippets. Consider creating one now."
      illustration="empty"
      py="space_64"
    >
      <Link
        isExternal
        href={`${APP_URL}/assistant/snippet/create`}
        variant="primary"
        size="sm"
      >
        Create Snippet
      </Link>
    </EmptyState>
  );
}
