import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import {
  AssistantRecipeWithStats,
  RecipeSummary,
} from '../../types/assistantTypes';
import Code from '../Code/Code';
import SnippetResultsList from './SnippetResultsList';
import SnippetResultsListItem from './SnippetResultsListItem';

type SnippetResultsProps = {
  results: AssistantRecipeWithStats[];
};

export default function SnippetResults({ results }: SnippetResultsProps) {
  const [snippetInFocus, setSnippetInFocus] = useState(results[0] || {});

  const changeSnippetInFocus = (recipe: RecipeSummary) => {
    setSnippetInFocus(recipe);
  };

  return (
    <Flex h="full" overflow="hidden">
      <SnippetResultsList>
        {results.map((result) => (
          <SnippetResultsListItem
            key={result.id}
            recipe={result}
            changeSnippetInFocus={changeSnippetInFocus}
            currentSnippet={result.id === snippetInFocus.id}
          />
        ))}
      </SnippetResultsList>

      {results[0] ? <Code recipe={snippetInFocus} /> : null}
    </Flex>
  );
}
