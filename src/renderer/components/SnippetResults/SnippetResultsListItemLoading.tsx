import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { DotIcon } from '@codiga/components';

export default function SnippetResultsListItemLoading() {
  return (
    <Flex
      flexDirection="column"
      p="space_16"
      gridGap="space_8"
      borderBottom="1px"
      borderColor="neutral.50"
      bg="neutral.0"
      _dark={{ bg: 'neutral.100', borderColor: 'base.onyx' }}
      _hover={{
        bg: 'neutral.25',
        _dark: { bg: 'base.onyx' },
      }}
    >
      <Flex alignItems="center" gridGap="space_8">
        <SkeletonCircle h="18px" w="18px" />
        <Skeleton h="26px" w="140px" />
        <SkeletonCircle h="12px" w="12px" />
      </Flex>

      <Flex alignItems="center" gridGap="space_8">
        <Skeleton h="20px" w="50px" />
        <DotIcon h="2px" w="2px" />
        <Skeleton h="20px" w="40px" />
      </Flex>

      <Flex alignItems="center" gridGap="space_8">
        <Skeleton h="20px" w="70px" />
        <Skeleton h="20px" w="50px" />
      </Flex>
    </Flex>
  );
}
