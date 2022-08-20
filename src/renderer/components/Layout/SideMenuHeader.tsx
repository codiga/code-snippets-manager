import { ReactNode } from 'react';
import { Box, Heading } from '@chakra-ui/react';

type SideMenuHeaderProps = {
  children: ReactNode;
};

export default function SideMenuHeader({ children }: SideMenuHeaderProps) {
  return (
    <Box py="space_8" px="space_24">
      <Heading as="h6" size="h6">
        {children}
      </Heading>
    </Box>
  );
}
