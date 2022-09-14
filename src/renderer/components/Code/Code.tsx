import { useEffect } from 'react';
import {
  Flex,
  LinkBox,
  IconButton,
  useClipboard,
  useColorModeValue,
  useToken,
  Tooltip,
  Text,
  Link,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  BubbleIcon,
  Code as CodigaCode,
  CodeContent,
  CopyIcon,
  PencilIcon,
  useToast,
} from '@codiga/components';

import { getSnippetUrl } from '../../utils/urlUtils';
import useCodeView, { CodeViewsType } from '../../hooks/useCodeView';
import { APP_URL } from '../../lib/config';
import { AssistantRecipeWithStats } from '../../types/assistantTypes';
import { decodeIndent } from '../../utils/codeUtils';
import CodeViewToggler from './CodeViewToggler';
import { useUser } from '../UserContext';

type CodeProps = {
  recipe: AssistantRecipeWithStats;
};

export default function Code({ recipe }: CodeProps) {
  const toast = useToast();
  const { id: userId } = useUser();

  const [codeView, setCodeView] = useCodeView('preview');

  const neutral100 = useToken('colors', 'neutral.100');
  const bg = useColorModeValue('white', neutral100);

  const code =
    codeView === 'preview'
      ? decodeIndent(recipe?.presentableFormat)
      : decodeIndent(recipe?.code);
  const imports = recipe?.imports?.join('\n');
  const codeForCopy = imports ? `${imports}\n${code}` : code;

  const { hasCopied, onCopy } = useClipboard(codeForCopy);

  useEffect(() => {
    if (hasCopied) {
      toast({ status: 'success', description: 'Snippet copied' });
    }
  }, [hasCopied, toast]);

  const commentsCount = Number(recipe.commentsCount);
  const lines = code.split('\n').length;
  const lineMaxDigits = lines.toString().length;
  const minWidth = lineMaxDigits < 3 ? '2.7em' : `${lineMaxDigits}.25em`;

  return (
    <Flex position="relative" flex={1} h="full" w="full" overflow="hidden">
      <Flex
        pos="absolute"
        alignItems="center"
        gridGap="space_8"
        top="space_8"
        right="space_24"
        zIndex="docked"
      >
        <CodeViewToggler
          inputProps={{
            value: codeView,
            onChange: (value) => setCodeView(value as CodeViewsType),
          }}
        />

        <Tooltip label="Copy Snippet">
          <IconButton
            variant="ghost"
            h="32px"
            minW="32px"
            p="space_8"
            icon={<CopyIcon />}
            onClick={onCopy}
            aria-label="Copy Snippet"
          />
        </Tooltip>

        <Tooltip label="Comment on Snippet">
          <IconButton
            as={Link}
            isExternal
            href={`${APP_URL}/assistant/snippet/${recipe.id}/view`}
            variant="ghost"
            h="32px"
            minW="32px"
            p="space_8"
            _hover={{ textDecor: 'none' }}
            icon={
              <Flex gridGap="space_4" alignItems="center">
                <BubbleIcon />
                <Text as="span" size="xs" lineHeight="16px">
                  {commentsCount}
                </Text>
              </Flex>
            }
            aria-label="Comment on Snippet"
          />
        </Tooltip>

        {userId && recipe.owner && userId === recipe.owner.id && (
          <Menu size="sm">
            <MenuButton
              as={IconButton}
              variant="ghost"
              h="32px"
              minW="32px"
              p="space_8"
              fontSize="xx-small"
              letterSpacing="2px"
            >
              •••
            </MenuButton>
            <Portal>
              <MenuList
                zIndex="tooltip"
                boxShadow="base"
                py={0}
                overflow="hidden"
                minW="175px"
              >
                <MenuItem
                  as={Link}
                  isExternal
                  href={getSnippetUrl(recipe.id, 'edit')}
                  _hover={{
                    textDecor: 'none',
                    color: '#fff !important',
                    bg: 'base.rose',
                  }}
                  _focus={{ boxShadow: 'none' }}
                >
                  <Text
                    size="xs"
                    d="flex"
                    alignItems="center"
                    gridGap="space_4"
                    color="inherit !important"
                  >
                    <PencilIcon /> Edit Snippet
                  </Text>
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        )}
      </Flex>

      <LinkBox
        as="article"
        minH="full"
        minW="full"
        overflow="scroll"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="neutral.50"
        _dark={{
          borderColor: 'base.onyx',
        }}
      >
        <CodigaCode
          border={0}
          borderRadius={0}
          pt="space_48"
          h="full"
          w="full"
          sx={{
            'code[class*="language-"] > span:first-child > .linenumber:first-child':
              {
                paddingTop: '0.5em !important',
              },
            'code[class*="language-"] .linenumber': {
              border: '0 !important',
              background: 'transparent !important',
              fontStyle: 'normal !important',
            },
          }}
        >
          <CodeContent
            customStyle={{
              background: bg,
              h: 'full',
              w: 'full',
              position: 'absolute',
              top: 0,
              left: 0,
              paddingTop: '48px',
            }}
            codeTagProps={{
              style: {
                display: 'block',
                height: '100%',
                fontSize: '14px',
              },
            }}
            lineNumberStyle={{ minWidth }}
            language={recipe.language?.toLocaleLowerCase()}
          >
            {code}
          </CodeContent>
        </CodigaCode>
      </LinkBox>
    </Flex>
  );
}
