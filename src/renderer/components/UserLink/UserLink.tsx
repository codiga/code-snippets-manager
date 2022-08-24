import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@codiga/codiga-components';
import { PublicUser } from 'renderer/types/userTypes';
import { getUserUrl } from 'renderer/utils/urlUtils';

type UserLinkProps = {
  owner?: PublicUser;
};

export default function UserLink({ owner = {} }: UserLinkProps) {
  const { hasSlug, slug, displayName } = owner || {};

  if (hasSlug && slug) {
    return (
      <Link isExternal variant="subtle" href={getUserUrl(slug)}>
        {displayName || 'Anonymous'}
        <ExternalLinkIcon ml="space_4" color="neutral.75" />
      </Link>
    );
  }

  return <>{displayName || 'Anonymous'}</>;
}
