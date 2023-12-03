import { Box, FormErrorMessage } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

import { IntlMessageKeys, useIntl } from '@/utils/intl';

export interface ErrorMessageProps {
  message?: IntlMessageKeys | string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const intl = useIntl();

  return message ? (
    <FormErrorMessage verticalAlign="baseline">
      <Box mr={1} display="flex">
        <WarningIcon />
      </Box>
      <Box>
        {' '}
        {message.startsWith('formValidation')
          ? intl.formatMessage({ id: message as IntlMessageKeys })
          : message}
      </Box>
    </FormErrorMessage>
  ) : null;
};
