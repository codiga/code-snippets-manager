import { AccountType } from '../types/userTypes';

const GithubAvatar = `/topbar/ico-github.png`;
const GitlabAvatar = `/topbar/ico-gitlab.png`;
const BitbucketAvatar = `/topbar/ico-bitbucket.png`;
const GoogleAvatar = `/topbar/ico-google.png`;
const RegularAvatar = `/regular-avatar.png`;

export const getAccountTypeIconUrl = (accountType?: AccountType) => {
  if (accountType === 'Github') {
    return GithubAvatar;
  }
  if (accountType === 'Gitlab') {
    return GitlabAvatar;
  }
  if (accountType === 'Bitbucket') {
    return BitbucketAvatar;
  }
  if (accountType === 'Google') {
    return GoogleAvatar;
  }
  return RegularAvatar;
};
