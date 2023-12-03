import { useFormContext } from 'react-hook-form';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper
} from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';

export const NumberField = (
  props: FieldProps &
    NumberInputProps & {
      onFocusPrompt?: string;
    }
) => {
  const {
    name,
    group,
    width,
    height,
    label,
    placeholder,
    isDisabled,
    min,
    max
  } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  return (
    <Field
      {...props}
      content={
        <NumberInput
          {...form.register(fieldName, { valueAsNumber: true })}
          min={min}
          max={max}
          onChange={(valueString) => form.setValue(name, valueString)}
          w={width ?? '100%'}
          h={height}
          isDisabled={isDisabled}
        >
          <NumberInputField height="64px" placeholder={placeholder} />
        </NumberInput>
      }
    />
  );
};
