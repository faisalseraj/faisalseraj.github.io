import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import { IntlShape } from 'react-intl';

import { FormattedMessage, IntlMessageKeys } from '@/utils/intl';

type TranslateErrorProps = {
  err: unknown;
  intl?: IntlShape;
};

type ServerError = {
  code?: string;
  message?: string;
};

const specialCases: Record<string, string> = {
  UserNotFoundException: 'ERR_USER_NOT_FOUND',
  NotAuthorizedException: 'ERR_BAD_PASSWORD',
  UsernameExistsException: 'ERR_USERNAME_EXISTS',
  ExpiredCodeException: 'ERR_EXPIRED_CODE',
  LimitExceededException: 'ERR_LIMIT_EXCEEDED'
};

export const TranslatedError = ({ err, intl }: TranslateErrorProps) => {
  if (isNil(err)) {
    return null;
  }

  let error: string | undefined;

  if (typeof err === 'string') {
    error = err;
  }

  if (isNil(error) && isObject(err)) {
    const serverError = err as ServerError;
    error = serverError?.message;
  }

  if (isNil(error)) {
    error = 'ERR_UNEXPECTED';
  }

  error = specialCases[error!] ?? error;

  if (error.startsWith('ERR_')) {
    const id = `errors.${error}` as IntlMessageKeys;
    return intl !== undefined ? (
      <span>{intl.formatMessage({ id: `errors.${error}` })}</span>
    ) : (
      <FormattedMessage id={id} />
    );
  }

  return <span>{error}</span>;
};
