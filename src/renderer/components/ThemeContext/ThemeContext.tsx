import { useContext, createContext, ReactNode, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useColorMode } from '@chakra-ui/react';

import { useUser } from '../../../renderer/components/UserContext';
import { User } from '../../../renderer/types/userTypes';
import { GET_USER_PREFERENCES } from '../../../renderer/graphql/queries';
import {
  RemoveUserPreferenceData,
  RemoveUserPreferenceVariables,
  REMOVE_USER_PREFERENCE,
  UpdateUserPreferenceData,
  UpdateUserPreferenceVariables,
  UPDATE_USER_PREFERENCE,
} from '../../../renderer/graphql/mutations';
import useLocalStorage from '../../../renderer/hooks/useLocalStorage';
import { CODIGA_THEME } from '../../../renderer/lib/config';
import { UserPreferenceKey } from '../../../renderer/lib/constants';
import { useToast } from '@codiga/codiga-components';

enum Theme {
  THEME_DARK = 'theme-dark',
  THEME_LIGHT = 'theme-light',
  USER_PREFERENCE_THEME = 'Theme',
}

type ThemeType = Theme.THEME_DARK | Theme.THEME_LIGHT;

type CacheStorageThemeType = (theme: ThemeType) => void;

type ThemeContextType = {
  changeToDarkTheme: () => Promise<void>;
  changeToLightTheme: () => Promise<void>;
};

const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const { id: userId } = useUser();

  // CHAKRA'S THEME
  const { setColorMode } = useColorMode();
  // USER'S LOCAL THEME PREFERENCE
  // @ts-ignore
  const [cacheTheme, cacheStorageTheme, hydrateValue] = useLocalStorage(
    CODIGA_THEME,
    Theme.THEME_LIGHT
  ) as [ThemeType, CacheStorageThemeType, () => string];

  /**
   * If the user is logged in, we check if they have a saved theme preference.
   * If they do, we'll update Chakra and the local version
   */
  useQuery<{ user: Partial<User> }>(GET_USER_PREFERENCES, {
    skip: !!userId,
    onCompleted: (respData) => {
      if (respData?.user?.preferences) {
        const savedTheme = respData.user.preferences
          .map((preference) => preference.key)
          .includes(UserPreferenceKey.Theme)
          ? Theme.THEME_DARK
          : Theme.THEME_LIGHT;
        cacheStorageTheme(savedTheme);
        setColorMode(savedTheme === Theme.THEME_DARK ? 'dark' : 'light');
      }
    },
  });

  /**
   * Because a user can access the app while not authenticated,
   * we need to update the theme based on locally stored settings
   */
  useEffect(() => {
    const storedTheme = hydrateValue();
    cacheStorageTheme(storedTheme as ThemeType);
    setColorMode(storedTheme === Theme.THEME_DARK ? 'dark' : 'light');
  }, [cacheStorageTheme, hydrateValue, setColorMode]);

  // used to set a DARK theme
  const [removeUserPreference] = useMutation<
    RemoveUserPreferenceData,
    RemoveUserPreferenceVariables
  >(REMOVE_USER_PREFERENCE);

  // used to set a LIGHT theme
  const [updateUserPreference] = useMutation<
    UpdateUserPreferenceData,
    UpdateUserPreferenceVariables
  >(UPDATE_USER_PREFERENCE);

  const changeToDarkTheme = async () => {
    cacheStorageTheme(Theme.THEME_DARK);
    setColorMode('dark');
    if (!userId) return;
    try {
      await updateUserPreference({
        variables: {
          key: UserPreferenceKey.Theme,
          value: Theme.THEME_DARK,
        },
        refetchQueries: [{ query: GET_USER_PREFERENCES }],
      });
    } catch (err) {
      toast({
        status: 'error',
        description:
          'An error occurred while updating your theme. Please try again.',
      });
    }
  };

  const changeToLightTheme = async () => {
    cacheStorageTheme(Theme.THEME_LIGHT);
    setColorMode('light');
    if (!userId) return;
    try {
      await removeUserPreference({
        variables: {
          key: UserPreferenceKey.Theme,
        },
        refetchQueries: [{ query: GET_USER_PREFERENCES }],
      });
    } catch (err) {
      toast({
        status: 'error',
        description:
          'An error occurred while updating your theme. Please try again.',
      });
    }
  };

  const themeContext = {
    changeToDarkTheme,
    changeToLightTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
