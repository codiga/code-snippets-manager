import { Button } from '@chakra-ui/react';
import { EmptyState } from '@codiga/components';

type NotAuthenticatedProps = {
  handleAction: () => void;
};

export default function NotAuthenticated({
  handleAction,
}: NotAuthenticatedProps) {
  return (
    <EmptyState
      title="Log in to access this section"
      description="Add your API Token to access this section"
      illustration="disconnected"
      mt="space_80"
      mx="auto"
    >
      <Button variant="primary" size="sm" onClick={handleAction}>
        Add Token
      </Button>
    </EmptyState>
  );
}
