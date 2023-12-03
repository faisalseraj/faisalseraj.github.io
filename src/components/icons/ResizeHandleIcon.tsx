import { createIcon } from '@chakra-ui/icons';

export const ResizeHandleIcon = createIcon({
  defaultProps: {
    boxSize: '16px'
  },
  viewBox: '0 0 16 16',
  path: (
    <>
      <mask
        id="mask0_2717_325185"
        maskUnits="userSpaceOnUse"
        x="-1"
        y="-1"
        width="17"
        height="17"
      >
        <rect
          width="2.06781"
          height="8.27125"
          transform="matrix(0.716449 0.69764 -0.716449 0.69764 13.8516 8.10938)"
          fill="currentColor"
        />
        <rect
          width="2.06781"
          height="16.5425"
          transform="matrix(0.716448 0.69764 -0.716448 0.69764 11.7559 -0.0546875)"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_2717_325185)">
        <rect width="16" height="16" fill="#currentColor" />
      </g>
    </>
  )
});
