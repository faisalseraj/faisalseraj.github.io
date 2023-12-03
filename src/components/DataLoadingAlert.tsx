import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';

import { FormattedMessage } from '@/utils/intl';

export const DataLoadingAlert = () => (
  <Alert variant="subtle">
    <AlertIcon />
    <AlertDescription>
      <FormattedMessage id="errors.dataLoadingFailure" />
    </AlertDescription>
  </Alert>
);
