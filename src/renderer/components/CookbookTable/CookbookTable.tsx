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
import { UsersIcon, Logos } from '@codiga/components';
import { Link as RouterLink } from 'react-router-dom';

import { getGroupUrl } from '../../utils/urlUtils';
import { AssistantCookbook } from '../../types/assistantTypes';
import FavoriteCookbook from '../Favorite/FavoriteCookbook';
import PrivacyAndVotes from '../PrivacyAndVotes';
import FormattedDate from '../FormattedDate';
import AvatarAndName from '../AvatarAndName';
import CodeCount from '../CodeCount';

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
            {cookbooks.map((cookbook) => {
              return (
                <LinkBox
                  as={Tr}
                  cursor="pointer"
                  key={cookbook.id}
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
                    <Flex alignItems="center" gap="space_8">
                      <Text
                        size="sm"
                        noOfLines={1}
                        maxWidth="300px"
                        display="inline-block"
                      >
                        <LinkOverlay
                          as={RouterLink}
                          to={`/view-cookbook/${cookbook.id}`}
                        >
                          {cookbook.name}
                        </LinkOverlay>
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
                            _focus={{ boxShadow: 'none' }}
                          >
                            {cookbook.groups[0].name}
                          </Link>
                        </Text>
                      </Flex>
                    </Td>
                  )}

                  <Td>
                    <AvatarAndName owner={cookbook.owner} />
                  </Td>

                  <Td>
                    <PrivacyAndVotes
                      isPublic={cookbook.isPublic}
                      upvotes={cookbook.upvotes}
                      downvotes={cookbook.downvotes}
                    />
                  </Td>

                  <Td>
                    <FormattedDate timestamp={cookbook.creationTimestampMs!} />
                  </Td>

                  <Td>
                    <CodeCount count={cookbook?.recipesCount} />
                  </Td>

                  <Td>
                    <Logos values={cookbook?.languages || []} max={2} />
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
