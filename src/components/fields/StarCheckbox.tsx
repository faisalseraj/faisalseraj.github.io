import {
  chakra,
  CheckboxProps,
  useCheckbox,
  useMultiStyleConfig
} from '@chakra-ui/react';

import {
  StarIconSelected,
  StarIconUnselected
} from '@/components/icons/StarIcon';

const CheckboxControl = chakra('span', {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    userSelect: 'none',
    flexShrink: 0
  }
});

const Label = chakra('label', {
  baseStyle: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'top',
    position: 'relative'
  }
});

export const StarCheckbox = (props: CheckboxProps) => {
  const styles = useMultiStyleConfig('Checkbox', props);

  const { state, getInputProps, getLabelProps, getRootProps } =
    useCheckbox(props);

  return (
    <Label {...getRootProps()} className="chakra-checkbox">
      <input className="chakra-checkbox__input" {...getInputProps()} />
      <CheckboxControl
        className="chakra-checkbox__control"
        color={props.isDisabled ? 'gray.100' : 'undefined'}
      >
        {state.isChecked ? (
          <StarIconSelected mr={2} />
        ) : (
          <StarIconUnselected mr={2} />
        )}
      </CheckboxControl>
      {props.children && (
        <chakra.span
          className="chakra-checkbox__label"
          {...getLabelProps()}
          __css={{
            ...styles.label
          }}
        >
          {props.children}
        </chakra.span>
      )}
    </Label>
  );
};
