import { useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import {
  components,
  GroupBase,
  OnChangeValue,
  OptionProps,
  StylesConfig
} from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Text, useTheme } from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';
import { theme } from '@/theme';

import { Field, FieldProps } from './Field';

export const customStyles = <
  OptionType,
  IsMulti extends boolean
>(): StylesConfig<OptionType, IsMulti> => {
  const inputStyles = theme.components.Input.variants.outline(theme).field;
  return {
    container: (base) => ({
      ...base,
      width: '100%'
    }),
    control: (base, state) => ({
      ...base,
      minHeight: inputStyles.minHeight,
      borderColor: !state.isFocused
        ? theme.colors.brand.normalGrey
        : theme.colors.brand.yellow,
      borderRadius: '6px',
      boxShadow: !state.isFocused
        ? 'none'
        : `0 0 0 1px ${theme.colors.brand.yellow}`,
      '&:hover': {
        borderColor: !state.isFocused
          ? theme.colors.brand.normalGrey
          : theme.colors.brand.yellow
      }
    }),
    option: (base) => ({
      ...base,
      backgroundColor: 'white',
      color: 'black',
      '&:hover': { backgroundColor: theme.colors.brand.lighterGrey }
    })
  };
};

export type Option = {
  value: string;
  label: string;
};

export const CreatableMultiField = (
  props: FieldProps & { options: Option[] }
) => {
  const theme = useTheme();
  const { options, name, group, placeholder } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  const selectRef = useRef<Select<Option, true, GroupBase<Option>>>(null);

  const Option = (props: OptionProps<Option, true, GroupBase<Option>>) => {
    return (
      <div>
        <components.Option {...props}>
          <Checkbox
            isChecked={props.isSelected}
            onChange={() => {
              if (selectRef && selectRef.current) selectRef.current.focus();
            }}
            pt="1"
            pr="2"
          />
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const CustomStyles = customStyles<Option, true>();

  return (
    <Field
      {...props}
      width="100%"
      content={
        <Controller
          name={fieldName}
          control={form.control}
          render={({ field: { onChange, value } }) => {
            const onSelectChange = (
              selectedOptions: OnChangeValue<Option, true>
            ) => {
              onChange(selectedOptions.map(({ value }) => value));
            };

            const valuesAsOptions = ((value ?? []) as string[]).map(
              (v) =>
                options.find(({ value }) => value === v) ?? {
                  value: v,
                  label: v
                }
            );

            return (
              <CreatableSelect
                isMulti
                value={valuesAsOptions}
                onChange={onSelectChange}
                formatCreateLabel={(text) => text}
                options={options}
                isDisabled={props.isDisabled}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                placeholder={
                  <Text color={theme.colors.brand.mediumGrey}>
                    {placeholder}
                  </Text>
                }
                styles={CustomStyles}
                ref={selectRef}
              />
            );
          }}
        />
      }
    />
  );
};
