import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

type SnippetResultsListProps = {
  children: ReactNode;
};

export default function SnippetResultsList({
  children,
}: SnippetResultsListProps) {
  return (
    <Flex
      minW="250px"
      maxW="250px"
      h="full"
      flexDirection="column"
      overflowY="scroll"
      border="1px"
      borderColor="neutral.50"
      _dark={{
        borderColor: 'base.onyx',
      }}
    >
      {children}
    </Flex>
  );
}
