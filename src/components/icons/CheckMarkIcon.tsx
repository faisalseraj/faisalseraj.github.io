import { createIcon } from '@chakra-ui/icons';

export const CheckMarkIcon = createIcon({
  defaultProps: {
    color: '#38A169', // Can't seem to access theme here :(
    boxSize: '20px'
  },
  viewBox: '0 0 100 100',
  d: 'M50 100C22.385 100 0 77.615 0 50S22.385 0 50 0s50 22.385 50 50-22.385 50-50 50Zm-4.985-30 35.35-35.355-7.07-7.07-28.28 28.285L30.87 41.715l-7.07 7.07L45.015 70Z'
});
