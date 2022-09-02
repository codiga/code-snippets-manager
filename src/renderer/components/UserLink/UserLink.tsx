import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@codiga/components';
import { PublicUser } from '../../types/userTypes';
import { getUserUrl } from '../../utils/urlUtils';

type UserLinkProps = {
  owner?: PublicUser;
};

export default function UserLink({ owner = {} }: UserLinkProps) {
  const { hasSlug, slug, displayName } = owner || {};

  if (hasSlug && slug) {
    return (
      <Link
        isExternal
        variant="subtle"
        href={getUserUrl(slug)}
        _focus={{ boxShadow: 'none' }}
      >
        {displayName || 'Anonymous'}
        <ExternalLinkIcon ml="space_4" color="neutral.75" />
      </Link>
    );
  }

  return <>{displayName || 'Anonymous'}</>;
}
