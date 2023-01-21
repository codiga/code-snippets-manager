import { Box, Divider, Flex, useColorMode, VStack } from '@chakra-ui/react';
import { useApolloClient } from '@apollo/client';
import {
  BookIcon,
  CodeIcon,
  HeartIcon,
  MagnifierIcon,
  PowerIcon,
  MoonIcon,
  SunIcon,
} from '@codiga/components';
import { useNavigate } from 'react-router-dom';

import { TOKEN } from '../../lib/config';
import { useUser } from '../UserContext';
import { useTheme } from '../ThemeContext';

import SideMenuHeader from './SideMenuHeader';
import { SideMenuItemButton, SideMenuItemLink } from './SideMenuItems';

type SideMenuProps = {
  openLoginModal: () => void;
};

export default function SideMenu({ openLoginModal }: SideMenuProps) {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { id: userId, setUser } = useUser();
  const { changeToDarkTheme, changeToLightTheme } = useTheme();

  return (
    <Flex flexDirection="column" justifyContent="space-between" h="full">
      <VStack spacing="space_8">
        <Box w="full">
          <SideMenuHeader>Codiga</SideMenuHeader>
          <SideMenuItemLink to="/">
            <MagnifierIcon />
            Search snippets
          </SideMenuItemLink>
        </Box>

        <Box w="full">
          <SideMenuHeader>Snippets</SideMenuHeader>
          <SideMenuItemLink to="/my-snippets">
            <CodeIcon />
            My snippets
          </SideMenuItemLink>
          <SideMenuItemLink to="/favorite-snippets">
            <HeartIcon />
            Favorite snippets
          </SideMenuItemLink>
        </Box>

        <Box w="full">
          <SideMenuHeader>Cookbooks</SideMenuHeader>
          <SideMenuItemLink to="/my-cookbooks">
            <BookIcon />
            My cookbooks
          </SideMenuItemLink>
          <SideMenuItemLink to="/favorite-cookbooks">
            <HeartIcon />
            Favorite cookbooks
          </SideMenuItemLink>
        </Box>

        <Box w="full">
          <SideMenuHeader>Team</SideMenuHeader>
          <SideMenuItemLink to="/team-snippets">
            <CodeIcon /> Snippets
          </SideMenuItemLink>
          <SideMenuItemLink to="/team-cookbooks">
            <BookIcon />
            Cookbooks
          </SideMenuItemLink>
        </Box>
      </VStack>

      <Box w="full">
        <SideMenuItemButton
          onClick={
            colorMode === 'light' ? changeToDarkTheme : changeToLightTheme
          }
        >
          {colorMode === 'light' ? (
            <>
              <MoonIcon />
              Switch to dark mode
            </>
          ) : (
            <>
              <SunIcon />
              Switch to light mode
            </>
          )}
        </SideMenuItemButton>

        <Divider bg="neutral.50" _dark={{ bg: 'base.onyx' }} />

        {userId ? (
          // LOGOUT BUTTON
          <SideMenuItemButton
            onClick={async () => {
              try {
                localStorage.removeItem(TOKEN);
                setUser({});
                navigate('/');
                await apolloClient.clearStore();
                await apolloClient.cache.reset();
                await apolloClient.resetStore();
              } catch (err) {
                // eslint-disable-next-line no-console
                console.log('Error while logging out: ', err);
              }
            }}
            color="neutral.75"
            _dark={{ color: 'neutral.75' }}
          >
            <PowerIcon />
            Log out
          </SideMenuItemButton>
        ) : (
          // LOGIN BUTTON
          <SideMenuItemButton
            onClick={openLoginModal}
            color="base.rose"
            _dark={{ color: 'base.rose' }}
          >
            <PowerIcon />
            Log in
          </SideMenuItemButton>
        )}
      </Box>
    </Flex>
  );
}
