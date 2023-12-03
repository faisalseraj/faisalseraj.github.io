import { Box, FormControl, Text, useBreakpointValue } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { getFieldName } from '@/shared/form';

import { FieldProps } from './Field';
import { ErrorMessage } from './ErrorMessage';

import { YesNo } from './YesNo';

export const YesNoBoxField = (props: FieldProps) => {
  const { name, group } = props;
  const fieldName = getFieldName(name, group);
  const form = useFormContext();
  const platform =
    useBreakpointValue({ base: 'mobile', sm: 'desktop' }) ?? 'desktop"';

  const {
    formState: { errors }
  } = form;

  const { label, ...rest } = props;

  return (
    <FormControl
      isInvalid={!!errors[fieldName]}
      width={platform === 'mobile' ? '100%' : 'auto'}
      flexGrow={1}
    >
      <Controller
        name={fieldName}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box
            layerStyle="borderless-sub-section"
            textAlign="center"
            pt={{ base: 5, sm: 7 }}
            pb={{ base: 7, sm: 9 }}
          >
            <Text mb={{ base: 7, sm: 9 }}>{label}</Text>
            <YesNo {...{ onChange, onBlur, value, name }} {...rest} />
          </Box>
        )}
      />
      <ErrorMessage message={String(errors[fieldName]?.message)} />
    </FormControl>
  );
};
