import { createIcon } from '@chakra-ui/icons';

export const ExclamationMarkIcon = createIcon({
  defaultProps: {
    color: '#E53E3E', // Can't seem to access theme here :(
    boxSize: '20px'
  },
  viewBox: '0 0 21 20',
  d: 'M10.5215 20C4.99848 20 0.521484 15.523 0.521484 10C0.521484 4.477 4.99848 0 10.5215 0C16.0445 0 20.5215 4.477 20.5215 10C20.5215 15.523 16.0445 20 10.5215 20ZM9.52148 13V15H11.5215V13H9.52148ZM9.52148 5V11H11.5215V5H9.52148Z'
});
