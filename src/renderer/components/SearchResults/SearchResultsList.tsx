import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

type SearchResultsListProps = {
  children: ReactNode;
};

export default function SearchResultsList({
  children,
}: SearchResultsListProps) {
  return (
    <Flex
      minW="250px"
      maxW="250px"
      h="full"
      flexDirection="column"
      overflowY="scroll"
    >
      {children}
    </Flex>
  );
}
