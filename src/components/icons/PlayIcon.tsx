import { createIcon } from '@chakra-ui/icons';

export const PlayIcon = createIcon({
  defaultProps: {
    boxSize: '24px'
  },
  viewBox: '0 0 24 24',
  path: (
    <polygon
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      points="5 3 19 12 5 21 5 3"
    />
  )
});
