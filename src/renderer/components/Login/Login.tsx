import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { TextField, useToast } from '@codiga/codiga-components';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { APP_URL, TOKEN } from '../../../renderer/lib/config';
import { CHECK_USER } from '../../../renderer/graphql/queries';
import { useUser } from '../../../renderer/components/UserContext';

type LoginProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function Login({ isOpen, closeModal }: LoginProps) {
  const toast = useToast();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    reset: resetToken,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { token: '' } });

  // used to check, if the token provided was valid
  const [validateToken] = useLazyQuery(CHECK_USER);

  // when a user closes the modal, we're going to reset the entire state
  const closeAndReset = () => {
    closeModal();
    resetToken();
  };

  const onLogin = async (formData: { token: string }) => {
    try {
      // set the token in localStorarge, which the apollo client will grab
      localStorage.setItem(TOKEN, formData.token);
      // check if a user is returned now
      const { data } = await validateToken();
      // valid token, close/reset modal, otherwise remove token and show an error to the user
      if (data?.user) {
        setUser(data.user);
        closeAndReset();
      } else {
        localStorage.removeItem(TOKEN);
        setError('token', {
          message: 'Invalid token. Please generate a new one.',
        });
      }
    } catch (err) {
      // network errors while fetching are placed here
      toast({
        status: 'error',
        description: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <Modal isOpen={!!isOpen} onClose={closeAndReset} isCentered>
      <ModalOverlay
        bg="neutral.0"
        _dark={{ bg: 'base.dark' }}
        opacity="0.8 !important"
      />

      <ModalContent>
        <ModalHeader>
          <Heading as="h5" size="h5">
            Add Codiga API Token
          </Heading>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <Text size="md" mb="space_16">
            Login with your Codiga API Token.{' '}
            <Link isExternal href={`${APP_URL}/api-tokens`} variant="solid">
              Generate a new token.
            </Link>
          </Text>

          <TextField
            variant="hidden-label"
            w="full"
            error={errors.token?.message}
            label="API token field"
            inputProps={{
              placeholder: 'Codiga API Token',
              ...register('token', {
                required: 'Entering a token is required',
              }),
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={closeAndReset}>
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={isSubmitting}
            onClick={handleSubmit(onLogin)}
          >
            <span>Login</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
