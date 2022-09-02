import { Button, Tooltip } from '@chakra-ui/react';
import { HeartFilledIcon, HeartIcon } from '@codiga/components';
import { useUser } from '../UserContext';

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
      isDisabled={!!userId} // if logged in, disable the tooltip
    >
      <Button
        variant="unstyled"
        minW="26px"
        h="26px"
        d="flex"
        justifyContent="center"
        alignItems="center"
        onClick={isSubscribed ? onUnsubscribe : onSubscribe}
        boxShadow="none !important"
        isDisabled={!userId} // if NOT logged in, disable the button
        ml="-space_4"
        _hover={{
          bg: 'neutral.50',
          _dark: {
            bg: 'base.dark',
          },
        }}
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
