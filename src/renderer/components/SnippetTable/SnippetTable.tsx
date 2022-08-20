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
} from '@chakra-ui/react';
import { LockIcon, Logo, Avatar, UsersIcon } from '@codiga/codiga-components';
import { AssistantRecipeWithStats } from 'renderer/types/assistantTypes';
import { getAvatarUrl } from 'renderer/utils/userUtils';
import FavoriteSnippet from 'renderer/components/Favorite/FavoriteSnippet';

const Td = (props: TableCellProps) => (
  <ChakraTd {...props} p="space_16" pr="space_64" _last={{ pr: 'space_56' }} />
);

type SnippetTableProps = {
  recipes: AssistantRecipeWithStats[];
};

export default function SnippetTable({ recipes }: SnippetTableProps) {
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
                          {recipe?.groups[0]?.name}
                        </Text>
                      </Flex>
                    </Td>
                  )}
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Text size="sm" noOfLines={1}>
                        {recipe.name}
                      </Text>
                      {!recipe.groups && (
                        <FavoriteSnippet
                          isSubscribed={!!recipe.isSubscribed}
                          recipeId={recipe.id}
                        />
                      )}
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Avatar
                        size="xs"
                        name={recipe.owner?.displayName || 'Anonymous'}
                        src={getAvatarUrl({ id: recipe.owner?.id })}
                      />
                      <Text size="xs" noOfLines={1}>
                        {recipe.owner?.displayName || 'Anonymous'}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <LockIcon open={!!recipe.isPublic} />
                      <Text size="xs" noOfLines={1}>
                        {recipe.isPublic ? 'Public' : 'Private'}
                      </Text>
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
