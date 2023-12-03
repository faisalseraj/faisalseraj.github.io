import { createIcon } from '@chakra-ui/icons';

export const Info2Icon = createIcon({
  defaultProps: {
    color: '#E53E3E', // Can't seem to access theme here :(
    boxSize: '20px'
  },
  viewBox: '0 0 21 20',
  d: 'M 10.5215 20 C 4.9985 20 0.5215 15.523 0.5215 10 C 0.5215 4.477 4.9985 0 10.5215 0 C 16.0445 0 20.5215 4.477 20.5215 10 C 20.5215 15.523 16.0445 20 10.5215 20 Z M 9.5215 5 V 7 H 11.5215 V 5 H 9.5215 Z M 9.5215 13 V 15 H 11.5215 V 8 H 9.5215 Z'
});
