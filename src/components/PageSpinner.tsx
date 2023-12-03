import { Box, CircularProgress } from '@chakra-ui/react';

import { LoadingIndicator } from '@/components/LoadingIndicator';

export const PageSpinner = () => {
  return (
    <LoadingIndicator
      render={() => (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '80px'
          }}
        >
          <CircularProgress size={38} isIndeterminate />
        </Box>
      )}
    />
  );
};
