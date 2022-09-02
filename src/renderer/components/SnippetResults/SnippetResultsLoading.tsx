import { Flex } from '@chakra-ui/react';
import CodeLoading from '../Code/CodeLoading';
import SnippetResultsList from './SnippetResultsList';
import SnippetResultsListItemLoading from './SnippetResultsListItemLoading';

export default function SnippetResultsLoading() {
  return (
    <Flex h="full">
      <SnippetResultsList>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <SnippetResultsListItemLoading key={num} />
        ))}
      </SnippetResultsList>

      <CodeLoading />
    </Flex>
  );
}
