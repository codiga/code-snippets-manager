import { Flex, Text } from '@chakra-ui/react';
import { LockIcon } from '@codiga/components';
import VotesCurrent from '../VotesCurrent';

type PrivacyAndNotesProps = {
  isPublic?: boolean;
  upvotes?: number;
  downvotes?: number;
};

export default function PrivacyAndVotes({
  isPublic = true,
  upvotes = 0,
  downvotes = 0,
}: PrivacyAndNotesProps) {
  return (
    <Flex alignItems="center" gap="space_8">
      <Text
        size="xs"
        noOfLines={1}
        gridGap="space_4"
        d="flex"
        alignItems="center"
      >
        <LockIcon open={!!isPublic} />
        {isPublic ? 'Public' : 'Private'}
      </Text>
      <VotesCurrent upvotes={upvotes} downvotes={downvotes} />
    </Flex>
  );
}
