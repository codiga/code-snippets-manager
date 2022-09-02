import { useParams } from 'react-router-dom';
import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { Logo, Tags } from '@codiga/components';
import { useQuery } from '@apollo/client';

import { getSnippetUrl } from '../utils/urlUtils';
import { GET_RECIPE } from '../graphql/queries';
import FavoriteSnippet from '../components/Favorite/FavoriteSnippet';
import ViewSnippetError from '../components/ViewSnippet/ViewSnippetError';
import ViewSnippetLoading from '../components/ViewSnippet/ViewSnippetLoading';
import BackButton from '../components/BackButton';
import PrivacyAndVotes from '../components/PrivacyAndVotes';
import FormattedDate from '../components/FormattedDate';
import AvatarAndName from '../components/AvatarAndName';
import Code from '../components/Code/Code';

export default function ViewSnippet() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: {
      recipeId: Number(params.snippetId),
    },
  });

  const recipe = data?.recipe;

  if (loading) {
    return <ViewSnippetLoading />;
  }

  if (error || !recipe) {
    return <ViewSnippetError />;
  }

  return (
    <Box h="full">
      {/* INFO SECTION */}
      <HStack
        alignItems="center"
        bg="neutral.25"
        _dark={{ bg: 'base.dark' }}
        h="74px"
        w="full"
        spacing="space_16"
      >
        <BackButton />

        <Flex alignItems="center" gridGap="space_8">
          <Logo value={recipe.language} fullSize={false} logoSize={24} />
          <Text size="sm" fontWeight="bold" noOfLines={1}>
            <Link
              isExternal
              variant="subtle"
              href={getSnippetUrl(recipe.id)}
              _focus={{ boxShadow: 'none' }}
            >
              {recipe.name}
            </Link>
          </Text>
          <FavoriteSnippet
            isSubscribed={recipe.isSubscribed}
            recipeId={recipe.id}
          />
        </Flex>

        <AvatarAndName owner={recipe.owner} />

        <PrivacyAndVotes
          isPublic={recipe.isPublic}
          upvotes={recipe.upvotes}
          downvotes={recipe.downvotes}
        />

        <FormattedDate timestamp={recipe.creationTimestampMs} />

        {recipe?.tags && recipe?.tags.length > 0 && (
          <Tags values={recipe?.tags || []} max={1} tagProps={{ size: 'sm' }} />
        )}
      </HStack>

      {/* CODE */}
      <Code recipe={recipe} />
    </Box>
  );
}
