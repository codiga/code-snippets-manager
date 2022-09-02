import { Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { APP_URL } from '../../lib/config';

export default function CookbookTableEmpty() {
  return (
    <EmptyState
      title="No cookbooks found"
      description="You don't have any cookbooks. Consider creating one now."
      illustration="empty"
      py="space_64"
    >
      <Link
        isExternal
        href={`${APP_URL}/assistant/cookbook/create`}
        variant="primary"
        size="sm"
      >
        Create Cookbook
      </Link>
    </EmptyState>
  );
}
