import {
  Box,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td as ChakraTd,
  TableCellProps,
  Skeleton,
} from '@chakra-ui/react';

const Td = (props: TableCellProps) => (
  <ChakraTd {...props} p="space_16" pr="space_64" _last={{ pr: 'space_56' }} />
);

export default function CookbookTableLoading() {
  return (
    <Box w="full" h="full" overflow="hidden">
      <TableContainer
        h="full"
        overflowY="scroll"
        overflowX="scroll"
        border="1px"
        borderColor="neutral.50"
        _dark={{ borderColor: 'base.onyx' }}
      >
        <Table variant="simple">
          <Tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((num, i) => (
              <Tr
                key={`loading-${num + i}`}
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
                  <Skeleton h="26px" w="24px" />
                </Td>
                <Td>
                  <Skeleton h="26px" w="250px" />
                </Td>
                <Td>
                  <Skeleton h="26px" w="220px" />
                </Td>
                <Td>
                  <Skeleton h="26px" w="100px" />
                </Td>
                <Td>
                  <Skeleton h="26px" w="62px" />
                </Td>
                <Td>
                  <Skeleton h="26px" w="90px" />
                </Td>
                <Td>
                  <Skeleton h="26px" w="90px" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
