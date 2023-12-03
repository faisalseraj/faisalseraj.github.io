import React, {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Textarea
} from '@chakra-ui/react';

import { getFieldName } from '@/shared/form';
import { FormattedMessage, IntlMessageKeys } from '@/utils/intl';

import { Field, FieldProps } from '@/components/fields/Field';
import { EyeIcon } from '../icons/EyeIcon';
import { HideeyeIcon } from '../icons/HideeyeIcon';

export const TextField = (
  props: FieldProps & {
    type?: HTMLInputTypeAttribute | 'textarea';
    info?: React.ReactNode;
    onFocusPrompt?: IntlMessageKeys;
    min?: number;
    style?: any;
  }
) => {
  const {
    name,
    group,
    width,
    height,
    type,
    label,
    placeholder,
    isDisabled,
    info,
    onFocusPrompt,
    readonly = false,
    style
  } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  const [inputFocussed, setInputFocussed] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onBlur = useCallback(() => () => setInputFocussed(false), []);
  const onFocus = useCallback(() => () => setInputFocussed(true), []);

  const field = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            {...form.register(fieldName)}
            placeholder={placeholder}
            w={width ?? '100%'}
            h={height}
            isDisabled={isDisabled}
            readOnly={readonly}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        );
      case 'password':
        return (
          <React.Fragment>
            <InputGroup>
              <Input
                {...form.register(fieldName, {
                  valueAsNumber: type === 'number'
                })}
                type={showPassword ? 'text' : type}
                placeholder={
                  placeholder ?? (typeof label === 'string' ? label : undefined)
                }
                readOnly={readonly}
                w={width ?? '100%'}
                h={height}
                isDisabled={isDisabled}
                onBlur={onBlur}
                onFocus={onFocus}
              />
              <InputRightAddon
                _hover={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                height={'64px'}
              >
                {showPassword ? <HideeyeIcon /> : <EyeIcon />}
              </InputRightAddon>
            </InputGroup>
          </React.Fragment>
        );
      default:
        return (
          <Input
            {...form.register(fieldName, {
              valueAsNumber: type === 'number'
            })}
            type={type}
            placeholder={
              placeholder ?? (typeof label === 'string' ? label : undefined)
            }
            readOnly={readonly}
            w={width ?? '100%'}
            h={height}
            isDisabled={isDisabled}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        );
    }
  };

  return (
    <Field
      {...props}
      content={
        <Flex flexDirection="column" w="100%">
          <React.Fragment>{field()}</React.Fragment>
          {info !== undefined ? <Text variant="info">{info}</Text> : null}

          {onFocusPrompt && inputFocussed ? (
            <Text variant="info">
              <FormattedMessage id={onFocusPrompt} />
            </Text>
          ) : null}
        </Flex>
      }
    />
  );
};
