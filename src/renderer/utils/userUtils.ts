import { API_ROOT_URL } from '../lib/config';
import { PublicUser, User } from '../types/userTypes';
import { UserPreferenceKey } from '../lib/constants';

export const isGravatarEnabledForUser = (user: User) => {
  return (
    user &&
    user.preferences &&
    user.preferences.some(
      (p) => p.key === UserPreferenceKey.EnableGravatar && p.value === 'true'
    )
  );
};

export const getAvatarUrl = (account?: Partial<User | PublicUser>) => {
  const userId = account?.id;
  const baseUrl = API_ROOT_URL;

  if (!userId) return '';

  if (isGravatarEnabledForUser(account)) {
    return `${baseUrl}/user/${userId}/avatar?refetch=true`;
  }

  return `${baseUrl}/user/${userId}/avatar`;
};
