import { Box, HStack, Skeleton } from '@chakra-ui/react';
import CodeLoading from '../Code/CodeLoading';

export default function ViewSnippetLoading() {
  return (
    <Box h="full">
      <HStack
        alignItems="center"
        bg="neutral.25"
        _dark={{ bg: 'base.dark' }}
        h="74px"
        w="full"
        spacing="space_16"
      >
        <Skeleton h="28px" w="28px" />
        <Skeleton h="26px" w="26px" />
        <Skeleton h="26px" w="200px" />
        <Skeleton h="28px" w="100px" />
        <Skeleton h="28px" w="100px" />
        <Skeleton h="28px" w="100px" />
      </HStack>

      <CodeLoading />
    </Box>
  );
}
