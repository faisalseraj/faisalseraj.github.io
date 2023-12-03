import { createIcon } from '@chakra-ui/icons';

export const FullScreenIcon = createIcon({
  defaultProps: {
    boxSize: '16px'
  },
  viewBox: '0 0 16 16',
  path: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clipPath="url(#clip0_194_216849)">
          <path
            d="M0 9.91576V16.0034H6.05714V14.4796H2.5981L6.63619 10.4491L5.55429 9.36719L1.52381 13.4053V9.91576H0Z"
            fill="#757575"
          />
          <path
            d="M15.9995 0H9.94233V1.52381H13.4014L9.36328 5.55429L10.4452 6.63619L14.4757 2.5981V6.08762H15.9995V0Z"
            fill="#757575"
          />
        </g>
        <defs>
          <clipPath id="clip0_194_216849">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  )
});
