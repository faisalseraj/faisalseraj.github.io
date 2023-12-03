import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext
} from 'react-hook-form';

import { Flex, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Field, FieldProps } from '@/components/fields/Field';
import { ImageUploader } from '@/components/ImageUploader';
import { getFieldName } from '@/shared/form';
import { MultiImageUploader } from '@/components/MultiImageUploader';

export const ImageField = (
  props: FieldProps & {
    isMulti?: boolean;
    maxFileSize?: number;
    fileQuantity?: number;
    fileTypes?: string[];
    showTypes?: boolean;
    height?: number | string;
    info?: string;
  }
) => {
  const {
    name,
    group,
    isMulti = false,
    maxFileSize,
    fileQuantity,
    fileTypes,
    showTypes = true,
    height = 'auto',
    info = undefined
  } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);
  const renderField = useCallback(
    ({ field }: { field: ControllerRenderProps<FieldValues, string> }) =>
      isMulti ? (
        <MultiImageUploader
          objectKeys={field.value}
          setObjectKeys={(objectKeys) =>
            form.setValue(fieldName, objectKeys, { shouldDirty: true })
          }
          maxFileSize={maxFileSize}
          maxFileQuantity={fileQuantity}
          fileTypes={fileTypes}
        />
      ) : (
        <ImageUploader
          objectKey={field.value}
          setObjectKey={(objectKey) =>
            form.setValue(fieldName, objectKey, { shouldDirty: true })
          }
          showTypes={showTypes}
          maxFileSize={maxFileSize}
          fileTypes={fileTypes}
          height={height}
          info={info}
        />
      ),
    [fieldName]
  );
  return (
    <Field
      {...props}
      content={
        <Flex flexDirection="column" w="100%">
          <Controller
            name={fieldName}
            control={form.control}
            render={renderField}
          />
          {info !== undefined ? <Text variant="info">{info}</Text> : null}
        </Flex>
      }
    />
  );
};
