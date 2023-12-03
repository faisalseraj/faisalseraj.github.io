import { Controller, useFormContext } from 'react-hook-form';
import { Switch } from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';

type SwitchFieldProps = FieldProps & {
  invert?: boolean;
  children?: React.ReactNode;
};

export const SwitchField = ({ children, ...props }: SwitchFieldProps) => {
  const { name, group, invert } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);
  return (
    <Field
      {...props}
      content={
        <Controller
          name={fieldName}
          control={form.control}
          render={({ field }) => (
            <Switch
              isChecked={invert ? !field.value : field.value}
              onChange={() => {
                form.setValue(fieldName, !field.value, {
                  shouldDirty: true
                });
              }}
            >
              {children}
            </Switch>
          )}
        />
      }
    />
  );
};
