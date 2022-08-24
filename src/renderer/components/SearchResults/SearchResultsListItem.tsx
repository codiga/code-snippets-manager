import { Flex, Text } from '@chakra-ui/react';
import { ChartBarsIcon, DotIcon, Logo, Tags } from '@codiga/codiga-components';
import {
  AssistantRecipeWithStats,
  RecipeSummary,
} from 'renderer/types/assistantTypes';
import FavoriteSnippet from '../Favorite/FavoriteSnippet';
import Votes from './Votes';

type SearchResultsListItemProps = {
  recipe: AssistantRecipeWithStats;
  changeSnippetInFocus: (recipe: RecipeSummary) => void;
};

export default function SearchResultsListItem({
  recipe,
  changeSnippetInFocus,
}: SearchResultsListItemProps) {
  return (
    <Flex
      flexDirection="column"
      p="space_16"
      gridGap="space_8"
      border="1px"
      borderColor="neutral.50"
      bg="neutral.0"
      _dark={{ bg: 'neutral.100', borderColor: 'base.onyx' }}
      _focus={{
        bg: 'neutral.25',
        _dark: { bg: 'base.onyx' },
      }}
      _active={{
        bg: 'neutral.25',
        _dark: { bg: 'base.onyx' },
      }}
      _hover={{
        bg: 'neutral.25',
        _dark: { bg: 'base.onyx' },
      }}
      onClick={() => changeSnippetInFocus(recipe)}
      cursor="pointer"
      tabIndex={0}
    >
      <Flex alignItems="center" gridGap="space_8">
        <Logo value={recipe.language} fullSize={false} logoSize={18} />
        <Text size="sm" fontWeight="bold" noOfLines={1}>
          {recipe.name}
        </Text>
        <FavoriteSnippet
          isSubscribed={recipe.isSubscribed}
          recipeId={recipe.id}
        />
      </Flex>

      <Flex alignItems="center" gridGap="space_8">
        <Text d="flex" alignItems="center" gridGap="space_4" size="xs">
          <Votes
            upvotes={recipe.upvotes || 0}
            downvotes={recipe.downvotes || 0}
            entityType="Recipe"
            entityId={recipe.id}
          />
        </Text>
        <DotIcon h="2px" w="2px" />
        <Text d="flex" alignItems="center" gridGap="space_4" size="xs">
          <ChartBarsIcon boxSize="14px" /> {recipe.uses || 0}
        </Text>
      </Flex>

      {recipe?.tags && recipe?.tags.length > 0 && (
        <Tags values={recipe?.tags || []} max={1} tagProps={{ size: 'sm' }} />
      )}
    </Flex>
  );
}
