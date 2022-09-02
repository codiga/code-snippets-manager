import { Flex, Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { Link as RouterLink } from 'react-router-dom';
import { APP_URL } from '../../lib/config';

export default function ViewCookbookSnippetsError() {
  return (
    <EmptyState
      title="Oops! An error occured!"
      description="We couldn't find that cookbook."
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
