import { createIcon } from '@chakra-ui/icons';

export const ScrollLeftIcon = createIcon({
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
      points="15 18 9 12 15 6"
    />
  )
});
