import { Flex, Text } from '@chakra-ui/react';
import { Avatar } from '@codiga/components';
import { PublicUser } from '../../types/userTypes';
import { getAvatarUrl } from '../../utils/userUtils';
import UserLink from '../UserLink';

type AvatarAndNameProps = {
  owner?: PublicUser;
};

export default function AvatarAndName({ owner = {} }: AvatarAndNameProps) {
  return (
    <Flex alignItems="center" gap="space_8">
      <Avatar
        size="xs"
        name={owner?.displayName || 'Anonymous'}
        src={getAvatarUrl({ id: owner?.id })}
      />
      <Text
        size="xs"
        noOfLines={1}
        maxW="300px"
        display="inline-block"
        whiteSpace="nowrap"
      >
        <UserLink owner={owner} />
      </Text>
    </Flex>
  );
}
