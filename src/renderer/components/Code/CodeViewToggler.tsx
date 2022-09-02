import {
  Box,
  BoxProps,
  useRadio,
  useRadioGroup,
  UseRadioGroupProps,
  UseRadioProps,
} from '@chakra-ui/react';

const RadioButton = ({
  children,
  inputProps,
  ...props
}: BoxProps & { inputProps: UseRadioProps }) => {
  const { getInputProps, getCheckboxProps } = useRadio(inputProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      as="label"
      sx={{
        _first: {
          '& div': {
            borderLeftRadius: 'sm',
          },
        },
        _last: {
          '& div': {
            borderRightRadius: 'sm',
          },
        },
      }}
      pos="relative"
      {...props}
    >
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        px="space_8"
        py="space_4"
        fontSize="12px"
        lineHeight="20px"
        textTransform="capitalize"
        color="neutral.100"
        bg="neutral.0"
        tabIndex={0}
        pos="relative"
        _active={{
          zIndex: 2,
        }}
        _checked={{
          bg: 'neutral.50',
          zIndex: 1,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _focusVisible={{
          boxShadow: 'outline',
          outline: 0,
        }}
        _dark={{
          color: 'neutral.0',
          bg: 'neutral.100',
          _checked: {
            bg: 'base.onyx',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const CodeViewToggler = ({
  inputProps,
  ...props
}: BoxProps & { inputProps: UseRadioGroupProps }) => {
  const options = ['raw', 'preview'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'code-view',
    ...inputProps,
  });

  const group = getRootProps();

  return (
    <Box
      {...props}
      {...group}
      borderRadius="base"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="neutral.50"
      _dark={{ borderColor: 'base.onyx' }}
    >
      {options.map((value) => {
        const radio = getRadioProps({ value });

        return (
          <RadioButton key={value} inputProps={radio}>
            {value}
          </RadioButton>
        );
      })}
    </Box>
  );
};

export default CodeViewToggler;
