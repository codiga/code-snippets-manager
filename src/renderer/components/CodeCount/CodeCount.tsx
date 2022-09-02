import { Flex, Text } from '@chakra-ui/react';
import { CodeIcon } from '@codiga/components';

type CodeCountProps = {
  count?: number;
};

export default function CodeCount({ count = 0 }: CodeCountProps) {
  return (
    <Flex alignItems="center" gap="space_8">
      <CodeIcon />
      <Text size="xs" noOfLines={1}>
        {count}
      </Text>
    </Flex>
  );
}
