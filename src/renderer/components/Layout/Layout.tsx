import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Flex, Link, useDisclosure } from '@chakra-ui/react';
import { Avatar, EmptyState } from '@codiga/codiga-components';

import { APP_URL } from 'renderer/lib/config';
import { getAvatarUrl } from 'renderer/utils/userUtils';
import Login from 'renderer/components/Login';
import { useUser } from 'renderer/components/UserContext';
import SideMenu from './SideMenu';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const { id, username, accountType } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      flexDirection="column"
      h="100vh"
      w="100vw"
      bg="neutral.25"
      _dark={{ bg: 'base.dark' }}
    >
      <Flex
        w="full"
        justifyContent="flex-end"
        alignItems="center"
        gridGap="space_16"
        pr="space_16"
        h="40px"
      >
        <Link
          isExternal
          href={`${APP_URL}/assistant/snippet/create`}
          variant="square"
        >
          Create Snippet
        </Link>

        {id ? (
          <Avatar
            name={username || 'Anon'}
            kind={accountType as any}
            src={getAvatarUrl({ id, username, accountType })}
            size="sm"
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link as="button" onClick={onOpen} variant="solid" size="sm" p="0">
            Login
          </Link>
        )}
      </Flex>

      <Flex flex={1}>
        <Box
          w="214px"
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
          pt="space_16"
          bg="neutral.0"
          _dark={{ bg: 'neutral.100' }}
        >
          <Box w="full">
            {/* IF THE USER'S LOGGED IN, SHOW CONTENT, OTHERWISE SHOW AN LOGIN NOTICE */}
            {id || pathname === '/' ? (
              children
            ) : (
              <EmptyState
                title="Log in to access this section"
                description="Add your API Token to access this section"
                illustration="disconnected"
                mt="space_80"
                mx="auto"
              >
                <Button variant="primary" size="sm" onClick={onOpen}>
                  Add Token
                </Button>
              </EmptyState>
            )}
          </Box>
        </Flex>
      </Flex>

      {/* LOGIN MODAL  */}
      <Login isOpen={isOpen} closeModal={onClose} />
    </Flex>
  );
}
