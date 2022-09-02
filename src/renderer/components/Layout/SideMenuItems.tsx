import { ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Link, LinkProps, Text } from '@chakra-ui/react';

type SideMenuItemProps = {
  children: ReactNode;
} & LinkProps;

type SideMenuItemLinkProps = SideMenuItemProps & {
  to: string;
};

type SideMenuItemButtonProps = SideMenuItemProps & {
  onClick: () => void;
};

export function SideMenuItemLink({
  to,
  children,
  ...props
}: SideMenuItemLinkProps) {
  return (
    <Link
      as={RouterLink}
      to={to}
      display="flex"
      py="space_8"
      px="space_20"
      boxSizing="border-box"
      borderLeft="4px solid transparent"
      _hover={{
        textDecoration: 'none',
        bg: 'neutral.50',
        _dark: {
          bg: 'base.onyx',
        },
      }}
      _focus={{
        borderLeftColor: 'base.rose',
      }}
      _active={{
        borderLeftColor: 'base.rose',
      }}
      _activeLink={{
        borderLeftColor: 'base.rose',
      }}
      {...props}
    >
      <Text
        as="span"
        size="xs"
        display="flex"
        alignItems="center"
        gridGap="space_8"
      >
        {children}
      </Text>
    </Link>
  );
}

export function SideMenuItemButton({
  onClick,
  children,
  ...props
}: SideMenuItemButtonProps) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      as="button"
      onClick={onClick}
      display="flex"
      py="space_16"
      px="space_20"
      boxSizing="border-box"
      borderLeft="4px solid transparent"
      outline="0 !important"
      color="neutral.100"
      _dark={{ color: 'neutral.0' }}
      w="full"
      _hover={{
        textDecoration: 'none',
      }}
      _focus={{
        outline: 0,
      }}
      {...props}
    >
      <Text
        as="span"
        size="xs"
        display="flex"
        alignItems="center"
        gridGap="space_8"
        color="inherit !important"
      >
        {children}
      </Text>
    </Link>
  );
}
