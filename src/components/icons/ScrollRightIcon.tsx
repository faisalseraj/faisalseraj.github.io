import { createIcon } from '@chakra-ui/icons';

export const ScrollRightIcon = createIcon({
  defaultProps: {
    boxSize: '24px'
  },
  viewBox: '6 0 12 24',
  path: (
    <polyline
      stroke="currentColor"
      strokeWidth={1}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="9 18 15 12 9 6"
    />
  )
});
