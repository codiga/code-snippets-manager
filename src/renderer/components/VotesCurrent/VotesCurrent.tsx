import { Flex, Text } from '@chakra-ui/react';
import { DownVoteIcon, UpVoteIcon } from '@codiga/components';

type VotesCurrentProps = {
  upvotes?: number;
  downvotes?: number;
};

export default function VotesCurrent({
  upvotes = 0,
  downvotes = 0,
}: VotesCurrentProps) {
  const diff = upvotes - downvotes;

  return (
    <Flex gridGap="space_4" alignItems="center">
      {diff >= 0 ? <UpVoteIcon /> : <DownVoteIcon />}
      <Text size="xs">{diff}</Text>
    </Flex>
  );
}
