import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import {
  AssistantRecipeWithStats,
  RecipeSummary,
} from 'renderer/types/assistantTypes';
import SearchResultsCode from './SearchResultsCode';
import SearchResultsList from './SearchResultsList';
import SearchResultsListItem from './SearchResultsListItem';

type SearchResultsProps = {
  results: AssistantRecipeWithStats[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  const [snippetInFocus, setSnippetInFocus] = useState(results[0] || {});

  const changeSnippetInFocus = (recipe: RecipeSummary) => {
    setSnippetInFocus(recipe);
  };

  return (
    <Flex h="full" overflow="hidden">
      <SearchResultsList>
        {results.map((result) => (
          <SearchResultsListItem
            key={result.id}
            recipe={result}
            changeSnippetInFocus={changeSnippetInFocus}
          />
        ))}
      </SearchResultsList>
      <Flex position="relative" flex={1} h="full" w="full" overflowX="scroll">
        <Box
          position="absolute"
          top="0"
          left="0"
          minHeight="full"
          minWidth="full"
          h="full"
        >
          {results[0] ? <SearchResultsCode recipe={snippetInFocus} /> : null}
        </Box>
      </Flex>
    </Flex>
  );
}
