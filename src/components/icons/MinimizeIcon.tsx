import { createIcon } from '@chakra-ui/icons';

export const MinimizeIcon = createIcon({
  defaultProps: {
    boxSize: '24px'
  },
  viewBox: '0 0 24 24',
  path: (
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
    />
  )
});
