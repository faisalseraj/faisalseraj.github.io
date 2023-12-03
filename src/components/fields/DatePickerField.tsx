import React, { HTMLInputTypeAttribute, useState } from 'react';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { useOutsideClick } from '@chakra-ui/react';

import { Calendar } from 'react-date-range';

import { differenceInYears, format } from 'date-fns';
import { getFieldName } from '@/shared/form';
import { FormattedMessage, useIntl } from '@/utils/intl';

import { Field, FieldProps } from '@/components/fields/Field';

export const DatePickerField = (
  props: FieldProps & {
    type?: HTMLInputTypeAttribute | 'textarea';
  }
) => {
  const { name, group } = props;
  const form = useFormContext();
  const fieldName = getFieldName(name, group);

  const [datePickerValue, setDatePickerValue] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const intl = useIntl();

  const ref = React.useRef(null);

  useOutsideClick({
    ref: ref,
    handler: () => setShowPicker(false)
  });

  const isTooYoung = (value: Date | undefined) =>
    differenceInYears(new Date(), value ?? new Date()) >= 13;

  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  return (
    <>
      <Field
        {...props}
        content={
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <>
                <VStack display={'flex'} alignItems="flex-start">
                  <VStack spacing={5}>
                    <InputGroup>
                      <InputRightElement
                        pointerEvents="none"
                        // eslint-disable-next-line react/no-children-prop
                        children={<CalendarIcon color="black" mt={'6'} />}
                      />

                      <Input
                        value={
                          datePickerValue === undefined
                            ? intl.formatMessage({
                                id: 'participants.ageGate.dateFormatInfo'
                              })
                            : format(datePickerValue, 'MM/dd/yyyy')
                        }
                        onClick={() =>
                          setShowPicker(showPicker === true ? false : true)
                        }
                        id="calenderInput"
                      />
                    </InputGroup>

                    {datePickerValue === undefined ||
                    isTooYoung(datePickerValue) ? (
                      platform === 'desktop' ? (
                        <div style={{ width: 500 }} />
                      ) : (
                        <div style={{ width: 320 }} />
                      )
                    ) : (
                      <Alert status="error">
                        <AlertIcon />
                        <FormattedMessage id="participants.ageGate.ageLimit" />
                      </Alert>
                    )}
                  </VStack>

                  {showPicker && (
                    <div ref={ref}>
                      <div className="chooseDate">Choose date</div>
                      <Calendar
                        className="dateOfBirth"
                        color="#F1AE3C"
                        date={datePickerValue}
                        onChange={(e: any) => {
                          form.setValue(fieldName, e.toISOString());
                          setDatePickerValue(e);
                          setShowPicker(showPicker === true ? false : true);
                        }}
                        showMonthArrow={false}
                      />
                    </div>
                  )}
                </VStack>
              </>
            )}
          />
        }
      />
    </>
  );
};
