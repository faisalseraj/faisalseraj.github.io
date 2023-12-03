import { createIcon } from '@chakra-ui/icons';

export const EditIcon = createIcon({
  defaultProps: {
    boxSize: '24px'
  },
  viewBox: '0 0 24 24',
  path: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="62"
        height="62"
        viewBox="0 0 62 62"
        fill="none"
      >
        <g filter="url(#filter0_d_194_217447)">
          <rect
            x="13"
            y="9"
            width="36"
            height="36"
            rx="6"
            fill="white"
            shapeRendering="crispEdges"
          />
          <g clipPath="url(#clip0_194_217447)">
            <path
              d="M28.1278 33.8459L22.5625 35.4368L24.1534 29.8715L34.8848 19.1401C35.6549 18.37 36.8973 18.37 37.6674 19.1401L38.8592 20.3319C39.6293 21.102 39.6293 22.3444 38.8592 23.1145L28.1278 33.8459Z"
              stroke="#5E636E"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M37.2674 24.701L33.293 20.7266"
              stroke="#5E636E"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
          <rect
            x="13.5"
            y="9.5"
            width="35"
            height="35"
            rx="5.5"
            stroke="#5E636E"
            shapeRendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_194_217447"
            x="0"
            y="0"
            width="62"
            height="62"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="6.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.560784 0 0 0 0 0.588235 0 0 0 0 0.639216 0 0 0 0.4 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_194_217447"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_194_217447"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_194_217447">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(19 15)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  )
});
