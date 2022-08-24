import { Button, Tooltip } from '@chakra-ui/react';
import { HeartFilledIcon, HeartIcon } from '@codiga/codiga-components';
import { useUser } from 'renderer/components/UserContext';

export type FavoriteProps = {
  isSubscribed?: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
};

export default function Favorite({
  isSubscribed = false,
  onSubscribe,
  onUnsubscribe,
}: FavoriteProps) {
  const { id: userId } = useUser();

  return (
    <Tooltip
      shouldWrapChildren
      label="Log in to favorite"
      isDisabled={!!userId}
    >
      <Button
        variant="unstyled"
        minW="12px"
        h="26px"
        d="flex"
        justifyContent="center"
        alignItems="center"
        onClick={isSubscribed ? onUnsubscribe : onSubscribe}
        boxShadow="none !important"
      >
        {isSubscribed ? (
          <HeartFilledIcon h="10px" w="10px" color="base.rose" />
        ) : (
          <HeartIcon h="10px" w="10px" />
        )}
      </Button>
    </Tooltip>
  );
}
