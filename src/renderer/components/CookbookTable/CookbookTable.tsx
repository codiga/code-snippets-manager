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
import {
  LockIcon,
  Avatar,
  UsersIcon,
  CodeIcon,
  Logos,
} from '@codiga/codiga-components';

import { getCookbookUrl, getGroupUrl } from '../../utils/urlUtils';
import { getAvatarUrl } from '../../utils/userUtils';
import { AssistantCookbook } from '../../types/assistantTypes';
import { PageTypes } from '../../types/pageTypes';
import FavoriteCookbook from '../Favorite/FavoriteCookbook';
import UserLink from '../UserLink';
import VotesCurrent from '../VotesCurrent';

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
  page: PageTypes;
};

export default function CookbookTable({ cookbooks, page }: CookbookTableProps) {
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
                      <Text
                        size="sm"
                        noOfLines={1}
                        maxWidth="300px"
                        display="inline-block"
                      >
                        <Link
                          isExternal
                          variant="subtle"
                          href={getCookbookUrl(
                            page,
                            cookbook.id,
                            cookbook.groups?.length
                              ? cookbook.groups[0].id
                              : undefined
                          )}
                        >
                          {cookbook.name}
                        </Link>
                      </Text>
                      <FavoriteCookbook
                        isSubscribed={!!cookbook.isSubscribed}
                        cookbookId={cookbook.id}
                      />
                    </Flex>
                  </Td>
                  {cookbook.groups && cookbook.groups.length > 0 && (
                    <Td>
                      <Flex alignItems="center" gap="space_8">
                        <UsersIcon />
                        <Text size="xs" noOfLines={1}>
                          <Link
                            isExternal
                            variant="subtle"
                            href={`${getGroupUrl(
                              cookbook.groups[0].id!
                            )}/cookbooks`}
                          >
                            {cookbook.groups[0].name}
                          </Link>
                        </Text>
                      </Flex>
                    </Td>
                  )}
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Avatar
                        size="xs"
                        name={cookbook.owner?.displayName || 'Anonymous'}
                        src={getAvatarUrl({ id: cookbook.owner?.id })}
                      />
                      <Text size="xs" noOfLines={1}>
                        <UserLink owner={cookbook.owner} />
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
                        <LockIcon open={!!cookbook.isPublic} />
                        {cookbook.isPublic ? 'Public' : 'Private'}
                      </Text>
                      <VotesCurrent
                        upvotes={cookbook.upvotes}
                        downvotes={cookbook.downvotes}
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <Text size="xs" noOfLines={1}>
                        {new Date(cookbook.creationTimestampMs!).toDateString()}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems="center" gap="space_8">
                      <CodeIcon />
                      <Text size="xs" noOfLines={1}>
                        {cookbook?.recipesCount}
                      </Text>
                    </Flex>
                  </Td>

                  <Td>
                    <Logos values={cookbook?.languages || []} max={2} />
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
