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
  Box,
} from '@chakra-ui/react';
import {
  BubbleIcon,
  Code as CodigaCode,
  CodeContent,
  CopyIcon,
  useToast,
} from '@codiga/components';
import { useEffect } from 'react';
import useCodeView, { CodeViewsType } from '../../hooks/useCodeView';
import { APP_URL } from '../../lib/config';
import { AssistantRecipeWithStats } from '../../types/assistantTypes';
import { decodeIndent } from '../../utils/codeUtils';
import CodeViewToggler from './CodeViewToggler';

type CodeProps = {
  recipe: AssistantRecipeWithStats;
};

export default function Code({ recipe }: CodeProps) {
  const toast = useToast();
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
    <Flex
      position="relative"
      flex={1}
      h="full"
      w="full"
      overflowX="auto"
      overflowY="scroll"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        minHeight="full"
        minWidth="full"
        h="full"
        w="full"
      >
        <LinkBox
          as="article"
          w="full"
          minH="full"
          overflow="hidden"
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
            pos="relative"
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
            <Flex
              pos="absolute"
              alignItems="center"
              gridGap="space_8"
              top="space_8"
              right="space_8"
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
            </Flex>

            <CodeContent
              customStyle={{
                background: bg,
                overflowX: 'auto',
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
      </Box>
    </Flex>
  );
}
