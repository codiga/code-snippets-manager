import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';

import { getCookbookUrl } from '../utils/urlUtils';
import { GET_COOKBOOK_RECIPES } from '../graphql/queries';
import { GET_USER_RECIPES_VARIABLES } from '../graphql/variables';
import ViewCookbookSnippetsError from '../components/ViewCookbookSnippets/ViewCookbookSnippetsError';
import ViewCookbookSnippetsLoading from '../components/ViewCookbookSnippets/ViewCookbookSnippetsLoading';
import ViewCookbookSnippetsEmpty from '../components/ViewCookbookSnippets/ViewCookbookSnippetsEmpty';
import BackButton from '../components/BackButton';
import FavoriteCookbook from '../components/Favorite/FavoriteCookbook';
import AvatarAndName from '../components/AvatarAndName';
import PrivacyAndVotes from '../components/PrivacyAndVotes';
import FormattedDate from '../components/FormattedDate';
import SnippetResults from '../components/SnippetResults/SnippetResults';

export default function ViewCookbookSnippets() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_COOKBOOK_RECIPES, {
    variables: {
      cookbookId: Number(params.cookbookId),
      ...GET_USER_RECIPES_VARIABLES,
    },
  });

  const cookbook = data?.cookbook;

  if (loading) {
    return <ViewCookbookSnippetsLoading />;
  }

  if (error || !cookbook) {
    return <ViewCookbookSnippetsError />;
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
          <Text size="sm" fontWeight="bold" noOfLines={1}>
            <Link
              isExternal
              variant="subtle"
                _focus={{ boxShadow: 'none' }}
              href={getCookbookUrl(cookbook.id)}
            >
              {cookbook.name}
            </Link>
          </Text>
          <FavoriteCookbook
            isSubscribed={cookbook.isSubscribed}
            cookbookId={cookbook.id}
          />
        </Flex>

        <AvatarAndName owner={cookbook.owner} />

        <PrivacyAndVotes
          isPublic={cookbook.isPublic}
          upvotes={cookbook.upvotes}
          downvotes={cookbook.downvotes}
        />

        <FormattedDate timestamp={cookbook.creationTimestampMs} />
      </HStack>

      {!cookbook.recipes || cookbook.recipes.length === 0 ? (
        <ViewCookbookSnippetsEmpty />
      ) : (
        <SnippetResults results={cookbook.recipes} />
      )}
    </Box>
  );
}
