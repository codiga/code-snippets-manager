import { Flex } from '@chakra-ui/react';
import SearchResultsCodeLoading from './SearchResultsCodeLoading';
import SearchResultsList from './SearchResultsList';
import SearchResultsListItemLoading from './SearchResultsListItemLoading';

export default function SearchResultsLoading() {
  return (
    <Flex h="full">
      <SearchResultsList>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <SearchResultsListItemLoading key={num} />
        ))}
      </SearchResultsList>
      <Flex flex={1}>
        <SearchResultsCodeLoading />
      </Flex>
    </Flex>
  );
}
