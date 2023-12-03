import React from 'react';
import { GroupBase, OnChangeValue } from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { Text, useTheme } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { getFieldName } from '@/shared/form';

import { customStyles } from './CreatableMultiField';
import { Field, FieldProps } from './Field';

export type OptionBase = {
  id: string;
};

type MultiAsyncSelectFieldProps<OptionType> = FieldProps & {
  formatOptionLabel: (option: OptionType) => React.ReactNode;
  cacheUniqs?: any[];
  loadOptions: LoadOptions<
    OptionType,
    GroupBase<OptionType>,
    { nextPageKey?: string }
  >;
};

export const MultiAsyncSelectField = <OptionType extends OptionBase>({
  loadOptions,
  formatOptionLabel,
  name,
  group,
  placeholder,
  cacheUniqs = [],
  ...rest
}: MultiAsyncSelectFieldProps<OptionType>) => {
  const theme = useTheme();
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  const CustomStyles = customStyles<OptionType, true>();

  return (
    <Field
      name={name}
      group={group}
      {...rest}
      width="100%"
      content={
        <Controller
          name={fieldName}
          control={form.control}
          render={({ field: { onChange, value } }) => {
            const onSelectChange = (
              option: OnChangeValue<OptionType, true>
            ) => {
              onChange(option);
            };

            const getOptionValue = (value: OptionType) => value.id;

            return (
              <AsyncPaginate
                value={value}
                cacheUniqs={cacheUniqs}
                onChange={onSelectChange}
                loadOptions={loadOptions}
                getOptionValue={getOptionValue}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                formatOptionLabel={formatOptionLabel}
                isClearable
                isMulti
                placeholder={
                  <Text color={theme.colors.brand.mediumGrey}>
                    {placeholder}
                  </Text>
                }
                styles={CustomStyles}
              />
            );
          }}
        />
      }
    />
  );
};
