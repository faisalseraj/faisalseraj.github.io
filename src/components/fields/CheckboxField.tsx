import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';

type CheckboxFieldProps = FieldProps & {
  invert?: boolean;
  children?: React.ReactNode;
  Component?: React.FC<CheckboxProps>;
};

export const CheckboxField = ({
  children,
  isDisabled,
  Component = Checkbox,
  ...props
}: CheckboxFieldProps) => {
  const { name, group, invert } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);
  return (
    <Field
      {...props}
      isDisabled={isDisabled}
      content={
        <Controller
          name={fieldName}
          control={form.control}
          render={({ field }) => (
            <Component
              isChecked={invert ? !field.value : field.value}
              isDisabled={isDisabled}
              onChange={() => {
                form.setValue(fieldName, !field.value, {
                  shouldDirty: true
                });
              }}
            >
              {children}
            </Component>
          )}
        />
      }
    />
  );
};
