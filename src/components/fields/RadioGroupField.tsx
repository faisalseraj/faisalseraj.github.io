import React, { useCallback } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext
} from 'react-hook-form';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';

export type RadioOption = {
  value: string;
  text: string;
  child?: React.ReactNode;
};

export type RadioGroupFieldProps = FieldProps & {
  options: RadioOption[];
  defaultValue?: string;
};

export const RadioGroupField = (props: RadioGroupFieldProps) => {
  const { name, group, options, width, label, placeholder, defaultValue } =
    props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);
  const _render = useCallback(
    ({ field }: { field: ControllerRenderProps<FieldValues, string> }) => {
      const { onChange, value } = field;
      return (
        <RadioGroup
          placeholder={
            placeholder || (typeof label === 'string' ? label : undefined)
          }
          w={width ?? '100%'}
          onChange={onChange}
          value={value || defaultValue}
        >
          <Stack direction={'column'} spacing={'3'}>
            {options?.map((option, i) => {
              return (
                <React.Fragment key={option.value}>
                  <Radio value={option.value}>{option.text}</Radio>
                  {value === option.value ? option.child : null}
                </React.Fragment>
              );
            })}
          </Stack>
        </RadioGroup>
      );
    },
    [props]
  );
  return (
    <Field
      {...props}
      content={
        <Controller
          name={fieldName}
          control={form.control}
          defaultValue={defaultValue}
          render={_render}
        />
      }
    />
  );
};
