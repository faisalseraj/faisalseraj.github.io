import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { ToolTipIcon } from '@/components/icons/TooltipIcon';

export const ToolTipButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      verticalAlign="sub"
      px={0}
      minW="18px"
      color="#3182CE"
      {...props}
      sx={{
        outline: 'none',
        _active: {
          backgroundColor: 'transparent'
        },
        _hover: {
          backgroundColor: 'transparent'
        },
        _focus: {
          boxShadow: 'none'
        }
      }}
    >
      <ToolTipIcon />
    </Button>
  )
);

ToolTipButton.displayName = 'ToolTipButton';
