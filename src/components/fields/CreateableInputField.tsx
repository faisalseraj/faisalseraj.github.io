import { Controller, useFormContext } from 'react-hook-form';
import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';
import { CreatableInput } from '../CreateableInput';

export const CreateableInputField = (props: FieldProps) => {
  const { name, group } = props;
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
            <CreatableInput
              tags={field.value}
              setTags={(tags) =>
                form.setValue(fieldName, tags, { shouldDirty: true })
              }
              {...props}
            />
          )}
        />
      }
    />
  );
};
