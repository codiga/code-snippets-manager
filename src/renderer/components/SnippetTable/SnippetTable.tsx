import {
  Box,
  Text,
  Flex,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td as ChakraTd,
  TableCellProps,
  Link,
} from '@chakra-ui/react';
import { Logo, UsersIcon, Tags } from '@codiga/components';

import { getGroupUrl, getSnippetUrl } from '../../utils/urlUtils';
import { AssistantRecipeWithStats } from '../../types/assistantTypes';
import { PageTypes } from '../../types/pageTypes';
import FavoriteSnippet from '../Favorite/FavoriteSnippet';
import PrivacyAndVotes from '../PrivacyAndVotes';
import FormattedDate from '../FormattedDate/FormattedDate';
import AvatarAndName from '../AvatarAndName/AvatarAndName';

const Td = (props: TableCellProps) => (
  <ChakraTd {...props} p="space_16" pr="space_64" _last={{ pr: 'space_56' }} />
);

type SnippetTableProps = {
  page: PageTypes;
  recipes: AssistantRecipeWithStats[];
};

export default function SnippetTable({ page, recipes }: SnippetTableProps) {
  return (
    <Box w="full" h="full" overflow="hidden">
      <TableContainer h="full" overflowY="scroll" overflowX="scroll">
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
                    <AvatarAndName owner={recipe.owner} />
                  </Td>

                  <Td>
                    <PrivacyAndVotes
                      isPublic={recipe.isPublic}
                      upvotes={recipe.upvotes}
                      downvotes={recipe.downvotes}
                    />
                  </Td>

                  <Td>
                    <FormattedDate timestamp={recipe.creationTimestampMs!} />
                  </Td>

                  <Td isNumeric>
                    {recipe?.tags && recipe?.tags.length > 0 && (
                      <Tags
                        values={recipe?.tags || []}
                        max={1}
                        tagProps={{ size: 'sm' }}
                      />
                    )}
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
