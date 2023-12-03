import { forwardRef, MouseEventHandler, SyntheticEvent } from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { CalendarIcon } from '@chakra-ui/icons';
import { getTimeZoneCode, toLocalDate } from '@/shared/date';
import { useIntl } from '@/utils/intl';

import styles from './DatePicker.module.css';

export const DatePicker = (props: {
  minDate?: Date;
  maxDate?: Date;
  warnMaxDate?: Date;
  warnMaxDateMessage?: string;
  times?: Date[];
  selected: Date;
  withTimeZone?: boolean;
  backGroundColor?: string;
  disabled?: boolean;
  hideFormatted?: boolean;
  onChange: (
    date: Date | null,
    event: SyntheticEvent<unknown, Event> | undefined
  ) => void;
}) => {
  const intl = useIntl();
  const {
    minDate,
    maxDate,
    warnMaxDate,
    warnMaxDateMessage,
    times,
    selected,
    onChange,
    withTimeZone,
    backGroundColor,
    disabled,
    hideFormatted
  } = props;
  const localDate = minDate ? toLocalDate(minDate) : new Date();
  const localTimeZoneCode = getTimeZoneCode(localDate);

  const validSelected = () => {
    const valid =
      minDate === undefined || selected < minDate ? minDate : selected;
    return maxDate !== undefined && valid && valid > maxDate ? maxDate : valid;
  };

  const confirmChange = (
    date: Date | null,
    event: SyntheticEvent<unknown, Event> | undefined
  ) => {
    if (warnMaxDate && date && date > warnMaxDate) {
      if (
        !confirm(
          warnMaxDateMessage ??
            intl.formatMessage({ id: 'components.datePicker.rangeError' })
        )
      ) {
        return false;
      }
    }

    onChange(date, event);
  };

  type CustomInputProps = {
    value?: string;
    onClick?: MouseEventHandler<HTMLElement>;
  };

  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    (
      props,

      // ReactDatePicker requires a customInput to accept a ref...
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ref
    ) => {
      const { value, onClick } = props;

      return (
        <div onClick={onClick}>
          <Flex justifyContent="center" alignItems="center">
            <Text>{value}</Text>
            <Spacer />
            <CalendarIcon />
          </Flex>
        </div>
      );
    }
  );

  CustomInput.displayName = 'CustomInput';

  return (
    <Box display="inline-block" p={3} w="100%">
      <Box
        border="1px"
        borderColor="#C2C9D6"
        borderRadius="5px"
        cursor="pointer"
        bg={backGroundColor || 'white'}
        p={5}
      >
        <ReactDatePicker
          calendarClassName={styles.datePicker}
          showPopperArrow={false}
          showTimeSelect
          popperPlacement="bottom"
          customInput={<CustomInput />}
          selected={validSelected()}
          onChange={confirmChange}
          minDate={minDate}
          maxDate={maxDate}
          includeTimes={times}
          injectTimes={times}
          disabled={disabled}
        />
        {withTimeZone && (
          <Text color="brand.mediumGrey">
            <Text as="span" mr={2}>
              {format(selected ?? new Date(), 'p')}
            </Text>
            ({localTimeZoneCode})
          </Text>
        )}
      </Box>
      {selected === undefined || hideFormatted ? null : withTimeZone ? null : (
        <Box mt="28px">
          <Text color="brand.mediumGrey">
            <Text as="span" mr={2}>
              {format(selected ?? new Date(), 'p')}
            </Text>
            ({localTimeZoneCode})
          </Text>
        </Box>
      )}
    </Box>
  );
};
