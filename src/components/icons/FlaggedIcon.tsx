import { createIcon } from '@chakra-ui/icons';

export const FlaggedIcon = createIcon({
  defaultProps: {
    boxSize: '20px'
  },
  viewBox: '0 0 20 20',
  path: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle cx="10" cy="10" r="10" fill="#E53E3E" />
        <path
          d="M10.1654 5.71062C8.696 4.87102 7.15173 4.79249 5.66667 5.4628V5H5V16.3778H5.66667V12.2282C7.03487 11.5105 8.47169 11.5328 9.83464 12.3116C10.652 12.7787 11.4925 13.0121 12.3333 13.0121C13.1738 13.0121 14.0146 12.7787 14.832 12.3116L15 12.2156V5.42547L14.5013 5.71062C13.0833 6.52116 11.584 6.52116 10.1654 5.71062Z"
          fill="white"
        />
      </svg>
    </>
  )
});
