import { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Link,
  IconButton,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { QuestionMarkCircleIcon } from '@codiga/components';
import CodigaLogo from '../Layout/CodigaIcon.png';

export default function AboutApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [appVersion, setAppVersion] = useState('0.0.0');

  useEffect(() => {
    // eslint-disable-next-line no-alert
    window.electron?.ipcRenderer.once('app-version', (arg) => {
      setAppVersion(arg as string);
    });
    window.electron?.ipcRenderer.sendMessage('app-version', ['']);
  }, []);

  return (
    <>
      <IconButton
        aria-label="about-app"
        onClick={onOpen}
        variant="ghost"
        h="28px"
        minW="28px"
        fontSize="12px"
        icon={<QuestionMarkCircleIcon />}
        _focus={{
          boxShadow: 'none',
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="neutral.0"
          _dark={{ bg: 'base.dark' }}
          opacity="0.8 !important"
        />

        <ModalContent>
          <ModalHeader justifyContent="flex-end">
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            gridGap="space_16"
          >
            <Link
              isExternal
              _focus={{ boxShadow: 'none' }}
              href="https://www.codiga.io/"
            >
              <Image src={CodigaLogo} h="48px" mx="auto" />
            </Link>

            <Text size="sm">
              <Link
                isExternal
                variant="subtle"
                color="inherit"
                _focus={{ boxShadow: 'none' }}
                href="https://github.com/codiga/code-snippets-manager"
              >
                Codiga Code Snippets Manager
              </Link>
            </Text>

            <Text size="sm">
              <Link
                isExternal
                variant="subtle"
                color="inherit"
                _focus={{ boxShadow: 'none' }}
                href="https://github.com/codiga/code-snippets-manager/releases/latest"
              >
                Version {appVersion}
              </Link>
            </Text>

            <Text size="sm">Copyright © 2022 Codiga</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
