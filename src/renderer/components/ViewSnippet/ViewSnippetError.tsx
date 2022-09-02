import { Flex, Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { Link as RouterLink } from 'react-router-dom';
import { APP_URL } from 'renderer/lib/config';

export default function ViewSnippetError() {
  return (
    <EmptyState
      title="Oops! An error occurred."
      description="We couldn't find that snippet."
      illustration="empty"
      py="space_64"
    >
      <Flex gridGap="space_16">
        <Link as={RouterLink} to="/" variant="secondary" size="sm">
          Go Home
        </Link>
        <Link
          isExternal
          href={`${APP_URL}/support`}
          variant="primary"
          size="sm"
        >
          Contact Support
        </Link>
      </Flex>
    </EmptyState>
  );
}
