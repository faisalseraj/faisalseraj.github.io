import { createIcon } from '@chakra-ui/icons';

export const ExitScreenIcon = createIcon({
  defaultProps: {
    boxSize: '16px'
  },
  viewBox: '0 0 512 512',
  path: (
    <>
      <svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m876.612 1043.388v710.171h-115.342v-513.28l-679.607 679.721-81.663-81.663 679.72-679.606h-513.278v-115.343h710.171zm961.782-1043.388 81.548 81.548-679.605 679.72h513.28v115.344h-710.172v-710.171h115.344v513.164z"
          fill="currentColor"
        />
      </svg>
    </>
  )
});
