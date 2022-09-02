/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Box, Flex, HStack, Input, Link, Text } from '@chakra-ui/react';

import { getCookbookUrl } from '../utils/urlUtils';
import { GET_COOKBOOK_INFO, GET_COOKBOOK_RECIPES } from '../graphql/queries';
import { GET_USER_RECIPES_VARIABLES } from '../graphql/variables';
import { PAGE_QUERY_POLL_INTERVAL_IN_MS } from '../lib/constants';
import ViewCookbookSnippetsError from '../components/ViewCookbookSnippets/ViewCookbookSnippetsError';
import ViewCookbookSnippetsLoading from '../components/ViewCookbookSnippets/ViewCookbookSnippetsLoading';
import ViewCookbookSnippetsEmpty from '../components/ViewCookbookSnippets/ViewCookbookSnippetsEmpty';
import ViewCookbookSnippetsEmptyFiltered from '../components/ViewCookbookSnippets/ViewCookbookSnippetsEmptyFiltered';
import BackButton from '../components/BackButton';
import FavoriteCookbook from '../components/Favorite/FavoriteCookbook';
import AvatarAndName from '../components/AvatarAndName';
import PrivacyAndVotes from '../components/PrivacyAndVotes';
import FormattedDate from '../components/FormattedDate';
import SnippetResults from '../components/SnippetResults/SnippetResults';
import SnippetResultsLoading from '../components/SnippetResults/SnippetResultsLoading';

export default function ViewCookbookSnippets() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: cookbookInfoData,
    loading: cookbookInfoLoading,
    error: cookbookInfoError,
  } = useQuery(GET_COOKBOOK_INFO, {
    pollInterval: PAGE_QUERY_POLL_INTERVAL_IN_MS,
    variables: {
      cookbookId: Number(params.cookbookId),
    },
  });

  const {
    data: cookbookSnippetData,
    loading: cookbookSnippetLoading,
    error: cookbookSnippetError,
  } = useQuery(GET_COOKBOOK_RECIPES, {
    pollInterval: PAGE_QUERY_POLL_INTERVAL_IN_MS,
    variables: {
      cookbookId: Number(params.cookbookId),
      ...GET_USER_RECIPES_VARIABLES,
      name: searchTerm || null,
    },
    context: {
      debounceKey: 'view-cookbook-snippets',
    },
  });

  const cookbook = cookbookInfoData?.cookbook;
  const snippets = cookbookSnippetData?.cookbook?.recipes || [];

  if (cookbookInfoError || cookbook === null || cookbookSnippetError) {
    return <ViewCookbookSnippetsError />;
  }

  return (
    <Box h="full">
      {/* INFO SECTION */}
      {cookbookInfoLoading ? (
        <ViewCookbookSnippetsLoading />
      ) : (
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

          <Flex w="full" flex={1} justifyContent="flex-end">
            <Input
              minWidth="100px"
              maxWidth="500px"
              justifySelf="flex-end"
              mr="space_16"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Flex>
        </HStack>
      )}

      {cookbookSnippetLoading ? (
        <SnippetResultsLoading />
      ) : snippets.length > 0 ? (
        <SnippetResults results={snippets} />
      ) : searchTerm ? (
        <ViewCookbookSnippetsEmptyFiltered
          clearSearch={() => setSearchTerm('')}
        />
      ) : (
        <ViewCookbookSnippetsEmpty />
      )}
    </Box>
  );
}
