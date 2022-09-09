import { useContext, createContext, ReactNode, useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CODIGA_THEME } from '../../lib/config';

enum Theme {
  THEME_DARK = 'theme-dark',
  THEME_LIGHT = 'theme-light',
  USER_PREFERENCE_THEME = 'Theme',
}

type ThemeType = Theme.THEME_DARK | Theme.THEME_LIGHT;

type CacheStorageThemeType = (theme: ThemeType) => void;

type ThemeContextType = {
  changeToDarkTheme: () => void;
  changeToLightTheme: () => void;
};

const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // CHAKRA'S THEME
  const { setColorMode } = useColorMode();
  // USER'S LOCAL THEME PREFERENCE
  const [_, cacheStorageTheme, hydrateValue] = useLocalStorage(
    CODIGA_THEME,
    Theme.THEME_LIGHT
  ) as [ThemeType, CacheStorageThemeType, () => string];

  /**
   * Because a user can access the app while not authenticated,
   * we need to update the theme based on locally stored settings
   */
  useEffect(() => {
    const storedTheme = hydrateValue();
    cacheStorageTheme(storedTheme as ThemeType);
    setColorMode(storedTheme === Theme.THEME_DARK ? 'dark' : 'light');
  }, [cacheStorageTheme, hydrateValue, setColorMode]);

  const changeToDarkTheme = () => {
    cacheStorageTheme(Theme.THEME_DARK);
    setColorMode('dark');
  };

  const changeToLightTheme = () => {
    cacheStorageTheme(Theme.THEME_LIGHT);
    setColorMode('light');
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
