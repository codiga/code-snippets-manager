/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Flex, Link, Text } from '@chakra-ui/react';
import { Avatar } from '@codiga/components';
import { ProviderKind } from '@codiga/components/dist/lib/ProviderLogo';

import { useUser } from '../UserContext';
import { APP_URL } from '../../lib/config';
import { getAvatarUrl } from '../../utils/userUtils';

import TitlebarButtonsMac from './TitlebarButtonsMac';
import TitlebarButtonsWin from './TitlebarButtonsWin';
import AboutApp from '../AboutApp';

type TitlebarProps = {
  openLoginModal: () => void;
  isOnline: boolean;
};

export default function Titlebar({ openLoginModal, isOnline }: TitlebarProps) {
  const { id, username, accountType } = useUser();

  return (
    <Flex
      draggable
      as="nav"
      h="40px"
      alignItems="center"
      justifyContent="space-between"
      bg="neutral.25"
      _dark={{ bg: 'base.dark' }}
      sx={{ '-webkit-app-region': 'drag' }}
    >
      {/* LEFT SIDE */}
      {/* we either show the Mac buttons or a Codiga img here */}
      <TitlebarButtonsMac />

      {/* RIGHT SIDE */}
      {/* we show windows buttons, connecting text or CTA/Avatar here */}
      <Flex sx={{ '-webkit-app-region': 'no-drag' }}>
        <Flex alignItems="center" gridGap="space_16" mr="space_16">
          <AboutApp />

          {isOnline ? (
            <>
              <Link
                isExternal
                href={`${APP_URL}/assistant/snippet/create`}
                variant="square"
              >
                Create Snippet
              </Link>

              <Flex w="32px" alignItems="center">
                {id ? (
                  <Avatar
                    name={username || 'Anon'}
                    kind={accountType as ProviderKind}
                    src={getAvatarUrl({ id, username, accountType })}
                    size="sm"
                  />
                ) : (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <Link
                    as="button"
                    onClick={openLoginModal}
                    variant="solid"
                    size="sm"
                    p="0"
                  >
                    Login
                  </Link>
                )}
              </Flex>
            </>
          ) : (
            <Text size="xs" opacity={0.7}>
              Connecting...
            </Text>
          )}
        </Flex>
        <TitlebarButtonsWin />
      </Flex>
    </Flex>
  );
}
