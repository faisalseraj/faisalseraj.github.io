import { FormControl, useBreakpointValue } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from './Field';
import { YesNo } from './YesNo';

export const YesNoField = (props: FieldProps) => {
  const { name, group } = props;
  const platform =
    useBreakpointValue({ base: 'mobile', sm: 'desktop' }) ?? 'desktop"';
  const fieldName = getFieldName(name, group);
  const form = useFormContext();
  const {
    formState: { errors }
  } = form;

  return (
    <Field
      {...props}
      content={
        <FormControl
          isInvalid={!!errors[fieldName]}
          width={platform === 'mobile' ? '100%' : 'auto'}
        >
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <YesNo {...{ onChange, onBlur, value, name }} {...props} />
              );
            }}
          />
        </FormControl>
      }
    />
  );
};
