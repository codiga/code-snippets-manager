import { Flex } from '@chakra-ui/react';
import useUrlQuery from '../../hooks/useUrlQuery';
import { AssistantRecipeWithStats } from '../../types/assistantTypes';
import Code from '../Code/Code';
import SnippetResultsList from './SnippetResultsList';
import SnippetResultsListItem from './SnippetResultsListItem';

type SnippetResultsProps = {
  results: AssistantRecipeWithStats[];
};

export default function SnippetResults({ results }: SnippetResultsProps) {
  const query = useUrlQuery();
  const currentSnippetId = query.get('currentSnippetId');

  const currentSnippet = currentSnippetId
    ? results.find((recipe) => String(recipe.id) === currentSnippetId)
    : results[0] || {};

  return (
    <Flex h="full" overflow="hidden">
      <SnippetResultsList>
        {results.map((result) => (
          <SnippetResultsListItem
            key={result.id}
            recipe={result}
            isCurrentSnippet={currentSnippet?.id === result.id}
          />
        ))}
      </SnippetResultsList>

      {currentSnippet?.id ? <Code recipe={currentSnippet} /> : null}
    </Flex>
  );
}
