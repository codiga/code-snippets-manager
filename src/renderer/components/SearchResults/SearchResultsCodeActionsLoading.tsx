import { Flex, Skeleton } from '@chakra-ui/react';

export default function SearchResultsCodeActionsLoading() {
  return (
    <Flex
      pos="absolute"
      alignItems="center"
      gridGap="space_8"
      top="space_8"
      right="space_8"
      zIndex="docked"
    >
      <Skeleton h="28px" w="100px" />
      <Skeleton h="32px" w="32px" />
      <Skeleton h="32px" w="43px" />
    </Flex>
  );
}
