import { Flex, Text } from '@chakra-ui/react';

type FormattedDateProps = {
  timestamp: number;
};

export default function FormattedDate({ timestamp }: FormattedDateProps) {
  return (
    <Flex alignItems="center" gap="space_8">
      <Text size="xs" noOfLines={1}>
        {new Date(timestamp).toDateString()}
      </Text>
    </Flex>
  );
}
