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
      minW="0px"
      minH="0px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={() => {
        window.electron.ipcRenderer.sendMessage(message, [message]);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
