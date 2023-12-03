import { Button, ButtonProps } from '@chakra-ui/react';

export const CompactButton = (props: ButtonProps) => (
  <Button
    sx={{
      px: 3,
      py: 1.5,
      minH: 0,
      minWidth: 0,
      height: 'auto',
      lineHeight: 1,
      fontSize: 'xs'
    }}
    {...props}
  />
);
