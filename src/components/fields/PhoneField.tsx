import { HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';

export const PhoneField = (
  props: FieldProps & {
    type?: HTMLInputTypeAttribute | 'textarea';
  }
) => {
  const { name, group, width, type, placeholder, isDisabled } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  return (
    <Field
      {...props}
      content={
        <InputGroup>
          <InputLeftAddon height="auto">+1</InputLeftAddon>
          <Input
            {...form.register(fieldName)}
            type={type}
            placeholder={placeholder}
            w={width ?? '100%'}
            isDisabled={isDisabled}
          />
        </InputGroup>
      }
    />
  );
};
