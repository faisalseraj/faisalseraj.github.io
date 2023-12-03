import { Input, InputGroup, Textarea } from '@chakra-ui/react';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { getFieldName } from '@/shared/form';
import { Field, FieldProps } from './Field';

export const TextGroupField = (
  props: FieldProps & {
    type?: HTMLInputTypeAttribute | 'textarea';
    leftElement?: ReactNode;
    rightElement?: ReactNode;
  }
) => {
  const {
    name,
    group,
    width,
    type,
    placeholder,
    isDisabled,
    leftElement,
    rightElement
  } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);
  return (
    <Field
      {...props}
      content={
        type === 'textarea' ? (
          <Textarea
            {...form.register(fieldName)}
            placeholder={placeholder}
            w={width ?? '100%'}
          />
        ) : (
          <InputGroup>
            {leftElement}
            <Input
              {...form.register(fieldName)}
              type={type}
              placeholder={placeholder}
              w={width ?? '100%'}
              isDisabled={isDisabled}
            />
            {rightElement}
          </InputGroup>
        )
      }
    />
  );
};
