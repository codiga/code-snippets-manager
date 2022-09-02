import { Button } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';

export default function NoInternetConnection() {
  return (
    <EmptyState
      title="No internet connection"
      description="You must be online to use this Codiga app."
      illustration="disconnected"
      mt="space_80"
      mx="auto"
    >
      <Button
        size="sm"
        variant="primary"
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </EmptyState>
  );
}
