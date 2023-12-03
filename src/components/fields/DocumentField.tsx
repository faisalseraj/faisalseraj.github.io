import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldProps } from '@/components/fields/Field';
import { getFieldName } from '@/shared/form';
import { DocumentUploader } from '../DocumentUploader';

export const DocumentField = (props: FieldProps) => {
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
            <DocumentUploader
              upload={field.value}
              setUpload={(upload) =>
                form.setValue(fieldName, upload, { shouldDirty: true })
              }
            />
          )}
        />
      }
    />
  );
};
