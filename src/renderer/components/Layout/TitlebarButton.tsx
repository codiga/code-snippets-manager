import { Button, ButtonProps } from '@chakra-ui/react';

type TitlebarButtonProps = {
  message: 'minimizeApp' | 'maximizeApp' | 'closeApp';
} & ButtonProps;

export default function TitlebarButton({
  message,
  children,
  ...props
}: TitlebarButtonProps) {
  return (
    <Button
      variant="unstyled"
      minW="32px"
      maxW="32px"
      h="32px"
      m="2px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fill="neutral.100"
      _dark={{ fill: 'neutral.0' }}
      onClick={() => {
        window.electron.ipcRenderer.sendMessage(message, [message]);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
