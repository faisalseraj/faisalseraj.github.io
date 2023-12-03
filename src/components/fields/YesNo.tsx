import { ButtonGroup, HStack, Radio, useRadioGroup } from '@chakra-ui/react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { FormattedMessage } from '@/utils/intl';

import { FieldProps } from './Field';

export const YesNo = (
  props: Omit<ControllerRenderProps<FieldValues, string>, 'ref'> & FieldProps
) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue:
      props.value === undefined ? undefined : props.value ? 'yes' : 'no',
    onChange: (value) => props.onChange(value === 'yes')
  });

  const group = getRootProps();

  return (
    <ButtonGroup {...group}>
      <HStack spacing={9}>
        <Radio {...getRadioProps({ value: 'yes' })}>
          <FormattedMessage id="app.yes" />
        </Radio>
        <Radio {...getRadioProps({ value: 'no' })}>
          <FormattedMessage id="app.no" />
        </Radio>
      </HStack>
    </ButtonGroup>
  );
};
