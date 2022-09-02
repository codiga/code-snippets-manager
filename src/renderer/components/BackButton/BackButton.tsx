import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@codiga/components';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      variant="ghost"
      onClick={() => navigate(-1)}
      h="28px"
      minW="28px"
      fontSize="12px"
      icon={<ChevronLeftIcon />}
      aria-label="go back"
      _focus={{
        boxShadow: 'none',
      }}
    />
  );
}
