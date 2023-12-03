import React, { ReactNode, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Select } from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';

export type SelectOption = {
  value: string;
  text: string | ReactNode;
};

export type SelectFieldProps = FieldProps & {
  options?: SelectOption[];
  valueAsNumber?: boolean;
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    name,
    group,
    options,
    width,
    label,
    placeholder,
    isDisabled,
    valueAsNumber = false,
    onChangeHandler,
    readonly
  } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  const { onChange, ...rest } = form.register(fieldName, { valueAsNumber });
  return (
    <Field
      {...props}
      content={
        <Select
          pointerEvents={readonly ? 'none' : 'all'}
          {...rest}
          onChange={(e) => {
            if (onChangeHandler) {
              onChangeHandler();
            }
            onChange(e);
          }}
          placeholder={
            placeholder || (typeof label === 'string' ? label : undefined)
          }
          id={`${fieldName}-dropDown`}
          w={width ?? '100%'}
          color={form?.control?._formValues[fieldName] || 'grey'}
          isDisabled={isDisabled}
        >
          {options?.map((option) => {
            return (
              <option
                style={{ color: 'black' }}
                key={option.value}
                value={option.value}
              >
                {option.text}
              </option>
            );
          })}
        </Select>
      }
    />
  );
};
