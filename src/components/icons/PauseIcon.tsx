import { createIcon } from '@chakra-ui/icons';

export const PauseIcon = createIcon({
  defaultProps: {
    boxSize: '24px'
  },
  viewBox: '0 0 24 24',
  path: (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
});
