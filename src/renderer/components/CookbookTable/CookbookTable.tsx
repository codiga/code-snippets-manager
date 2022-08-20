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
} from '@chakra-ui/react';
import {
  LockIcon,
  Avatar,
  UsersIcon,
  CodeIcon,
} from '@codiga/codiga-components';
import { AssistantCookbook } from 'renderer/types/assistantTypes';
import { getAvatarUrl } from 'renderer/utils/userUtils';
import FavoriteCookbook from 'renderer/components/Favorite/FavoriteCookbook';

const Td = (props: TableCellProps) => (
  <ChakraTd
    {...props}
    p="space_16"
    pr="space_80"
    _first={{ pl: 'space_16' }}
    _last={{ pr: 'space_56' }}
  />
);

type CookbookTableProps = {
  cookbooks: AssistantCookbook[];
};

export default function CookbookTable({ cookbooks }: CookbookTableProps) {
  return (
    <Box w="full" overflow="auto">
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            {cookbooks.map((cookbook) => {
              return (
                <Tr
                  key={cookbook.id}
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
                    <Flex alignItems="center" gap="space_8">
                      <Text size="sm" noOfLines={1}>
                        {cookbook.name}
                      </Text>
                      {!cookbook.groups && (
                        <FavoriteCookbook
                          isSubscribed={!!cookbook.isSubscribed}
                          cookbookId={cookbook.id}
                        />
                      )}
                    </Flex>
                  </Td>
                  {cookbook.groups && cookbook.groups.length > 0 && (
                    <Td>
                      <Flex alignItems="center" gap="space_8">
                        <UsersIcon />
                        <Text size="xs" noOfLines={1}>
                          {cookbook?.groups[0]?.name}
                        </Text>
                      </Flex>
                    </Td>
                  )}
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <CodeIcon />
                      <Text size="xs" noOfLines={1}>
                        {cookbook?.recipesCount}
                      </Text>
                    </Flex>
                  </Td>

                  {/* FIXME - LANGUAGES */}

                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Avatar
                        size="xs"
                        name={cookbook.owner?.displayName || 'Anonymous'}
                        src={getAvatarUrl({ id: cookbook.owner?.id })}
                      />
                      <Text size="xs" noOfLines={1}>
                        {cookbook.owner?.displayName || 'Anonymous'}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <LockIcon open={!!cookbook.isPublic} />
                      <Text size="xs" noOfLines={1}>
                        {cookbook.isPublic ? 'Public' : 'Private'}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Text size="xs" noOfLines={1}>
                        {new Date(cookbook.creationTimestampMs!).toDateString()}
                      </Text>
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
