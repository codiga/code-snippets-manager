import { Skeleton, VStack } from '@chakra-ui/react';

export default function SearchResultsCodeLoading() {
  return (
    <VStack
      p="space_16"
      pt="7px"
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
  );
}
