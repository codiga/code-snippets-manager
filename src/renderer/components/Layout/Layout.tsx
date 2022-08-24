import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, useDisclosure, useColorMode } from '@chakra-ui/react';

import Login from '../Login';
import { useUser } from '../UserContext';
import SideMenu from './SideMenu';
import Titlebar from './Titlebar';
import NotAuthenticated from './NotAuthenticated';
import NoInternetConnection from './NoInternetConnection';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const { id } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const currentStatus = navigator.onLine;
      if (isOnline && !currentStatus) setIsOnline(false);
      if (!isOnline && currentStatus) setIsOnline(true);
    };

    updateOnlineStatus();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isOnline, setIsOnline]);

  return (
    <Flex
      flexDirection="column"
      h="100vh"
      w="100vw"
      overflow="hidden"
      bg="neutral.25"
      _dark={{ bg: 'base.dark' }}
      sx={{ colorScheme: colorMode }}
    >
      <Titlebar openLoginModal={onOpen} isOnline={isOnline} />

      {!isOnline ? (
        <NoInternetConnection />
      ) : (
        <Flex flex={1} overflow="hidden">
          <Box
            w="214px"
            minW="214px"
            h="full"
            bg="neutral.25"
            _dark={{ bg: 'base.dark' }}
            pt="space_16"
          >
            <SideMenu openLoginModal={onOpen} />
          </Box>

          <Flex
            flex={1}
            justifyContent="center"
            alignItems="flex-start"
            overflow="hidden"
            bg="neutral.0"
            _dark={{ bg: 'neutral.100' }}
          >
            <Box w="full" height="calc(100% - 74px)">
              {/* IF THE USER'S LOGGED IN, SHOW CONTENT, OTHERWISE SHOW AN LOGIN NOTICE */}
              {id || pathname === '/' ? (
                children
              ) : (
                <NotAuthenticated handleAction={onOpen} />
              )}
            </Box>
          </Flex>
        </Flex>
      )}

      {/* LOGIN MODAL  */}
      <Login isOpen={isOpen} closeModal={onClose} />
    </Flex>
  );
}
