import {
  IconButton,
  Box,
  Collapse,
  useDisclosure,
  Tooltip,
  HStack,
  Input,
  Radio,
  Checkbox,
  Text,
  Flex,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LanguageSelector,
  LibrarySelector,
} from '@codiga/components';
import { Outlet } from 'react-router-dom';

import { useFilters } from '../FiltersContext';
import { ALL_LANGUAGES } from '../../lib/constants';
import {
  LanguageEnumeration,
  LibraryEnumeration,
} from '../../types/assistantTypes';
import { useUser } from '../UserContext';

export default function Filters() {
  const { id: userId } = useUser();
  const isAuthenticated = !!userId;

  const { isOpen, onToggle } = useDisclosure();
  const {
    searchTerm,
    setSearchTerm,
    language,
    setLanguage,
    library,
    setLibrary,
    privacy,
    setPrivacy,
    isSubscribed,
    setIsSubscribed,
    tags,
    setTags,
  } = useFilters();

  return (
    <>
      <Box bg="neutral.25" _dark={{ bg: 'base.dark' }}>
        <HStack w="full" spacing="space_16" py="space_16" pr="space_16">
          <Input
            flex={1}
            minWidth="200px"
            maxWidth="400px"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LanguageSelector
            minW="150px"
            maxW="300px"
            value={language || ''}
            options={['', ...ALL_LANGUAGES]}
            emptyLabel="All Languages"
            onChange={(newLanguage) => {
              setLanguage(newLanguage as LanguageEnumeration);
              setLibrary('' as LibraryEnumeration);
            }}
            labelProps={{ hidden: true, children: 'Filter by language' }}
          />
          <LibrarySelector
            minW="150px"
            maxW="300px"
            isCreatable
            value={library || ''}
            language={language || ''}
            onChange={(newLibrary) =>
              setLibrary(newLibrary as LibraryEnumeration)
            }
            emptyLabel="No library"
            isDisabled={!language}
            labelProps={{
              fontSize: 'md',
              fontWeight: 'bold',
              hidden: true,
            }}
          />
          <Tooltip label="More Filters" isDisabled={isOpen}>
            <IconButton
              size="xs"
              variant="unstyled"
              aria-label="Open more filter options"
              icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              onClick={onToggle}
            />
          </Tooltip>
        </HStack>

        <Collapse in={isOpen}>
          <Flex gridGap="space_16" mb="space_16" flexWrap="wrap" pr="space_16">
            <Input
              flex={1}
              minWidth="200px"
              maxWidth="400px"
              placeholder="Search by tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Flex flexWrap="nowrap" gridRowGap="0" gridColumnGap="space_16">
              <Radio
                isDisabled={!isAuthenticated}
                isChecked={privacy === 'all'}
                onChange={() => setPrivacy('all')}
                mb={0}
              >
                <Text as="span" size="sm" fontFamily="body">
                  All
                </Text>
              </Radio>
              <Radio
                isDisabled={!isAuthenticated}
                isChecked={privacy === 'public'}
                onChange={() => setPrivacy('public')}
                mb={0}
              >
                <Text as="span" size="sm" fontFamily="body">
                  Public
                </Text>
              </Radio>
              <Radio
                isDisabled={!isAuthenticated}
                isChecked={privacy === 'private'}
                onChange={() => setPrivacy('private')}
                mb={0}
              >
                <Text as="span" size="sm" fontFamily="body">
                  Private
                </Text>
              </Radio>
              <Checkbox
                isDisabled={!isAuthenticated}
                checked={isSubscribed}
                onChange={(e) => setIsSubscribed(e.target.checked)}
                mb={0}
              >
                <Text as="span" size="sm" fontFamily="body">
                  Favorites only
                </Text>
              </Checkbox>
            </Flex>
          </Flex>
        </Collapse>
      </Box>

      <Outlet />
    </>
  );
}
