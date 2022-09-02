import { Flex, Skeleton, VStack } from '@chakra-ui/react';

export default function CodeLoading() {
  return (
    <Flex
      flex={1}
      pos="relative"
      overflow="scroll"
      h="full"
      border="1px"
      borderColor="neutral.50"
      _dark={{
        borderColor: 'base.onyx',
      }}
    >
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

      <VStack
        p="space_16"
        pt="space_56"
        w="full"
        spacing="space_8"
        alignItems="flex-start"
      >
        <Skeleton h="16px" w="60%" />
        <Skeleton h="16px" w="40%" />
        <Skeleton h="16px" w="0%" />
        <Skeleton h="16px" w="30%" />
        <Skeleton h="16px" w="40%" />
        <Skeleton h="16px" w="60%" />
        <Skeleton h="16px" w="70%" />
        <Skeleton h="16px" w="80%" />
        <Skeleton h="16px" w="75%" />
        <Skeleton h="16px" w="65%" />
        <Skeleton h="16px" w="50%" />
        <Skeleton h="16px" w="60%" />
        <Skeleton h="16px" w="50%" />
        <Skeleton h="16px" w="30%" />
        <Skeleton h="16px" w="20%" />
      </VStack>
    </Flex>
  );
}
