import { Flex, Image } from '@chakra-ui/react';
import { DotIcon } from '@codiga/components';
import TitlebarButton from './TitlebarButton';
import CodigaLogo from './CodigaIcon.png';

export default function TitlebarActionsMac() {
  if (!window.electron.isMac) {
    return <Image src={CodigaLogo} h="24px" ml="space_16" />;
  }

  return (
    <Flex
      gridGap="space_8"
      ml="space_16"
      sx={{ '-webkit-app-region': 'no-drag' }}
    >
      <TitlebarButton message="closeApp" boxShadow="none !important" h="12px">
        <DotIcon h="12px" w="12px" color="#f96057" />
      </TitlebarButton>

      <TitlebarButton
        message="minimizeApp"
        boxShadow="none !important"
        h="12px"
      >
        <DotIcon h="12px" w="12px" color="#f8ce52" />
      </TitlebarButton>

      <TitlebarButton
        message="maximizeApp"
        boxShadow="none !important"
        h="12px"
      >
        <DotIcon h="12px" w="12px" color="#5fcf65" />
      </TitlebarButton>
    </Flex>
  );
}
