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
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Logo, UsersIcon, Tags } from '@codiga/components';
import { Link as RouterLink } from 'react-router-dom';

import { getGroupUrl } from '../../utils/urlUtils';
import { AssistantRecipeWithStats } from '../../types/assistantTypes';
import FavoriteSnippet from '../Favorite/FavoriteSnippet';
import PrivacyAndVotes from '../PrivacyAndVotes';
import FormattedDate from '../FormattedDate/FormattedDate';
import AvatarAndName from '../AvatarAndName/AvatarAndName';

const Td = (props: TableCellProps) => (
  <ChakraTd {...props} p="space_16" pr="space_64" _last={{ pr: 'space_56' }} />
);

type SnippetTableProps = {
  recipes: AssistantRecipeWithStats[];
};

export default function SnippetTable({ recipes }: SnippetTableProps) {
  return (
    <Box
      w="full"
      h="full"
      overflow="hidden"
      border="1px"
      borderColor="neutral.50"
      _dark={{ borderColor: 'base.onyx' }}
    >
      <TableContainer h="full" overflowY="scroll" overflowX="scroll">
        <Table variant="simple">
          <Tbody>
            {recipes.map((recipe) => {
              return (
                <LinkBox
                  as={Tr}
                  cursor="pointer"
                  key={recipe.id}
                  p="space_16"
                  borderBottom="1px"
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

                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Text
                        size="sm"
                        noOfLines={1}
                        maxWidth="300px"
                        display="inline-block"
                      >
                        <LinkOverlay
                          as={RouterLink}
                          to={`/view-snippet/${recipe.id}`}
                        >
                          {recipe.name}
                        </LinkOverlay>
                      </Text>
                      <FavoriteSnippet
                        isSubscribed={!!recipe.isSubscribed}
                        recipeId={recipe.id}
                      />
                    </Flex>
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
                            _focus={{ boxShadow: 'none' }}
                          >
                            {recipe.groups[0].name}
                          </Link>
                        </Text>
                      </Flex>
                    </Td>
                  )}

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
                </LinkBox>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
