import { Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';
import { APP_URL } from '../../lib/config';

export default function CookbookTableError() {
  return (
    <EmptyState
      title="An error occurred"
      description="Please close the app and try again. Contact our support, if the issue persists."
      illustration="disconnected"
      py="space_64"
    >
      <Link isExternal href={`${APP_URL}/support`} variant="primary" size="sm">
        Contact Support
      </Link>
    </EmptyState>
  );
}
