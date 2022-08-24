import {
  Box,
  Text,
  Flex,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td as ChakraTd,
  Tag,
  TableCellProps,
  Link,
} from '@chakra-ui/react';
import { LockIcon, Logo, Avatar, UsersIcon } from '@codiga/codiga-components';

import { getAvatarUrl } from '../../utils/userUtils';
import { getGroupUrl, getSnippetUrl } from '../../utils/urlUtils';
import { AssistantRecipeWithStats } from '../../types/assistantTypes';
import { PageTypes } from '../../types/pageTypes';
import FavoriteSnippet from '../../components/Favorite/FavoriteSnippet';
import UserLink from '../../components/UserLink';
import VotesCurrent from '../VotesCurrent';

const Td = (props: TableCellProps) => (
  <ChakraTd {...props} p="space_16" pr="space_64" _last={{ pr: 'space_56' }} />
);

type SnippetTableProps = {
  page: PageTypes;
  recipes: AssistantRecipeWithStats[];
};

export default function SnippetTable({ page, recipes }: SnippetTableProps) {
  return (
    <Box w="full" overflow="auto">
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            {recipes.map((recipe) => {
              return (
                <Tr
                  key={recipe.id}
                  p="space_16"
                  border="1px"
                  borderColor="neutral.50"
                  bg="neutral.0"
                  _dark={{ bg: 'neutral.100', borderColor: 'base.onyx' }}
                  _hover={{
                    bg: 'neutral.25',
                    _dark: { bg: 'base.onyx' },
                  }}
                >
                  <Td>
                    <Logo
                      value={recipe.language}
                      fullSize={false}
                      logoSize={24}
                    />
                  </Td>
                  {recipe.groups && recipe.groups.length > 0 && (
                    <Td>
                      <Flex alignItems="center" gap="space_8">
                        <UsersIcon />
                        <Text size="xs" noOfLines={1}>
                          <Link
                            isExternal
                            variant="subtle"
                            href={`${getGroupUrl(
                              recipe.groups[0].id!
                            )}/snippets`}
                          >
                            {recipe.groups[0].name}
                          </Link>
                        </Text>
                      </Flex>
                    </Td>
                  )}
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Text
                        size="sm"
                        noOfLines={1}
                        maxWidth="300px"
                        display="inline-block"
                      >
                        <Link
                          isExternal
                          variant="subtle"
                          href={getSnippetUrl(
                            page,
                            recipe.id,
                            recipe.groups?.length
                              ? recipe.groups[0].id
                              : undefined
                          )}
                        >
                          {recipe.name}
                        </Link>
                      </Text>
                      <FavoriteSnippet
                        isSubscribed={!!recipe.isSubscribed}
                        recipeId={recipe.id}
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Avatar
                        size="xs"
                        name={recipe.owner?.displayName || 'Anonymous'}
                        src={getAvatarUrl({ id: recipe.owner?.id })}
                      />
                      <Text
                        size="xs"
                        noOfLines={1}
                        maxW="300px"
                        display="inline-block"
                      >
                        <UserLink owner={recipe.owner} />
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Text
                        size="xs"
                        noOfLines={1}
                        gridGap="space_4"
                        d="flex"
                        alignItems="center"
                      >
                        <LockIcon open={!!recipe.isPublic} />
                        {recipe.isPublic ? 'Public' : 'Private'}
                      </Text>
                      <VotesCurrent
                        upvotes={recipe.upvotes}
                        downvotes={recipe.downvotes}
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Text size="xs" noOfLines={1}>
                        {new Date(recipe.creationTimestampMs!).toDateString()}
                      </Text>
                    </Flex>
                  </Td>
                  <Td isNumeric>
                    <Flex gridGap="space_8">
                      {recipe.tags?.slice(0, 1).map((tag) => (
                        <Tag size="sm" key={`${tag}-${recipe.id}`}>
                          {tag}
                        </Tag>
                      ))}
                      {(recipe.tags || []).length - 1 > 0 ? (
                        <Tag size="sm">+{(recipe.tags || []).length - 1}</Tag>
                      ) : null}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
