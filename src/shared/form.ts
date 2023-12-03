import { useEffect } from 'react';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn
} from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { ObjectShape } from 'yup/lib/object';

export const getDefaultValues = <FieldValues>(
  obj: Record<string, unknown> | null,
  schema: ObjectSchema<ObjectShape>,
  group?: string
) => {
  if (obj) {
    return Object.fromEntries(
      Object.keys(schema.describe().fields)
        .filter((n) => (group ? n.startsWith(`${group}_`) : true))
        .map((n) => [
          n as FieldPath<FieldValues>,
          obj[n.substring(n.indexOf('_') + 1)] as PathValue<
            FieldValues,
            Path<FieldValues>
          >
        ])
    ) as unknown as FieldValues;
  }
};

export const setObject = <FieldValues>(
  obj: Record<string, unknown> | null,
  form: UseFormReturn<FieldValues>,
  schema: ObjectSchema<ObjectShape>,
  group?: string
) => {
  if (obj) {
    Object.keys(schema.describe().fields)
      .filter((n) => (group ? n.startsWith(`${group}_`) : true))
      .forEach((n) =>
        form.setValue(
          n as FieldPath<FieldValues>,
          obj[n.substring(n.indexOf('_') + 1)] as PathValue<
            FieldValues,
            Path<FieldValues>
          >
        )
      );
  }
};

export const getObject = <FieldValues>(
  form: UseFormReturn<FieldValues>,
  schema: ObjectSchema<ObjectShape>,
  group?: string
) => {
  // We run the object through the schema to transform values to the right type
  const values = schema.validateSync(form.getValues());

  return Object.fromEntries(
    Object.keys(schema.describe().fields)
      .filter((n) => (group ? n.startsWith(`${group}_`) : true))
      .map((n) => [
        n.substring(n.indexOf('_') + 1),
        values[n as FieldPath<FieldValues>]
      ])
  ) as unknown as Partial<FieldValues>;
};

export const getFieldName = (name: string, group?: string) => {
  return `${group ? `${group}_` : ''}${name}`;
};

export const submitAndReset =
  <T = FieldValues>(form: UseFormReturn<T>, save: () => Promise<unknown>) =>
  () => {
    try {
      form.handleSubmit(
        () =>
          save().then(() => {
            // Clears the isDirty flag so that we can change route
            form.reset(undefined, { keepValues: true });
          }),
        (errors) => {
          console.log(errors);
        }
      )();
    } catch (err) {
      console.log(err);
    }
  };

export const useOnSubmitSuccessful = <T = FieldValues>(
  form: UseFormReturn<T>,
  handler: () => void
) => {
  const { isSubmitSuccessful } = form.formState;
  useEffect(() => {
    if (isSubmitSuccessful) {
      // Reset isSubmitSuccessful to avoid loop
      form.reset(undefined, { keepValues: true });
      handler();
    }
  }, [form, handler, isSubmitSuccessful]);
};

export const allowEmptyNumber = (value: unknown, originalValue: unknown) => {
  return isNaN(originalValue as number) ? undefined : value;
};

export const defaultToZeroNumber = (value: unknown, originalValue: unknown) => {
  return isNaN(originalValue as number) ? 0 : value;
};
