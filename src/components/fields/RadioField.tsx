import { useFormContext } from 'react-hook-form';
import { Radio } from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';

export type RadioFieldProps = FieldProps & {
  value: string;
  children?: React.ReactNode;
};

export const RadioField = ({ children, ...props }: RadioFieldProps) => {
  const { name, group, value } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  return (
    <Field
      {...props}
      content={
        <Radio {...form.register(fieldName)} value={value}>
          {children}
        </Radio>
      }
    />
  );
};
