import React, { useEffect } from 'react';
import type { Props as ReactIntlFormattedMessageProps } from 'react-intl/src/components/message';
import {
  IntlFormatters,
  FormattedMessage as ReactIntlFormattedMessage,
  useIntl as useReactIntl
} from 'react-intl';
import { setLocale } from 'yup';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import enMessages from '@/translations/en.json';
import { User } from '@/shared/types/User';

export { FormattedNumber } from 'react-intl';

type Message = string | NestedDictionary;
type NestedDictionary = {
  [x: string]: Message;
};

type FlattenedDictionary = {
  [x: string]: string;
};

export const flattenMessages = (
  nestedMessages: NestedDictionary,
  prefix = ''
): FlattenedDictionary =>
  Object.keys(nestedMessages).reduce((messages: FlattenedDictionary, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix !== '' ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

export const YupProvider = ({ children }: { children?: React.ReactNode }) => {
  const intl = useReactIntl();

  useEffect(() => {
    setLocale({
      mixed: {
        required: intl.formatMessage({ id: 'formValidation.required' })
      },
      string: {
        email: intl.formatMessage({ id: 'formValidation.email' })
      },
      number: {
        min: ({ min }) =>
          intl.formatMessage({ id: 'formValidation.min' }, { min }),
        max: ({ max }) =>
          intl.formatMessage({ id: 'formValidation.max' }, { max })
      }
    });
  }, [intl, intl.locale]);

  return <>{children}</>;
};

type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? `${K}.${Path<T[K], keyof T[K]>}`
    : K
  : never;

// Our new union type of all available message IDs (based on the en translation)
export type IntlMessageKeys = Path<typeof enMessages>;

// The arguments to the original formatMessage function.
type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;

// Extend the original FormattedMessage props.
type FormattedMessageProps = ReactIntlFormattedMessageProps & {
  id?: IntlMessageKeys;
};

export function FormattedMessage({ id, ...rest }: FormattedMessageProps) {
  return <ReactIntlFormattedMessage id={id} {...rest} />;
}

export function useIntl() {
  const { formatMessage, ...rest } = useReactIntl();

  // Re-write the formatMessage function but with a strongly-typed id.
  const typedFormatMessage = (
    descriptor: FormatMessageArgs[0] & {
      id?: IntlMessageKeys;
    },
    values?: FormatMessageArgs[1],
    options?: FormatMessageArgs[2]
  ) => {
    return formatMessage(descriptor, values, options);
  };

  return {
    ...rest,
    formatMessage: typedFormatMessage
  };
}

export const formattableUser = (user: User) =>
  omit(user, [
    'judgePreferences',
    'educators',
    'entries',
    'schools',
    'userRegion'
  ]);

export const formattableParticipant = (user: User) =>
  pick(user, ['id', 'firstName', 'lastName', 'type']);
