import { ReactNode } from 'react';
import { Box, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { getFieldName } from '@/shared/form';
import { ErrorMessage } from './ErrorMessage';

export interface FieldProps {
  name: string;
  group?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  flex?: string;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  width?: string;
  height?: string;
  isDisabled?: boolean;
  hideErrorMessage?: boolean;
  marginBottom?: number;
  onChangeHandler?: () => void;
  readonly?: boolean;
}

export const Field = (
  props: FieldProps & {
    content: ReactNode;
  }
) => {
  const {
    name,
    group,
    label,
    flex,
    prefix,
    suffix,
    content,
    hideErrorMessage = false,
    marginBottom,

    width
  } = props;

  const form = useFormContext();

  const {
    formState: { errors }
  } = form;

  const fieldName = getFieldName(name, group);

  return (
    <FormControl
      isInvalid={!!errors[fieldName]}
      flex={flex}
      mb={marginBottom ?? '5'}
    >
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Box display="flex" width="100%">
        {prefix ? (
          <Text display="inline-block" mr="3">
            {prefix}
          </Text>
        ) : null}
        {content}
        {suffix ? (
          <Text display="inline-block" ml="3">
            {suffix}
          </Text>
        ) : null}
      </Box>

      {hideErrorMessage ? null : (
        <ErrorMessage message={String(errors[fieldName]?.message)} />
      )}
    </FormControl>
  );
};
