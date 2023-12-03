import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, IconButton, Select, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

const Pagination = () => {
  const perPageOptions: number[] =
    useMemo(() => {
      return new Array(20).fill(null).map((_, index) => (index + 1) * 5);
    }, []) ?? [];
  return (
    <Box display="flex" height="64px" alignItems={'center'}>
      <Box width={'20%'}>
        <Text
          width={'140px'}
          marginLeft="24px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          fontSize="14px"
          lineHeight="20px"
          display="flex"
          alignItems="center"
          color="#111213"
        >
          Show rows per page
        </Text>
      </Box>

      <Box display="flex" width={'100%'}>
        <Select size="sm" width="70px">
          {perPageOptions.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Box
          display="flex"
          alignItems="center"
          width={'100%'}
          justifyContent="flex-end"
        >
          <Text fontWeight={'400'}>1-24</Text>{' '}
          <Text marginLeft={'4px'} fontWeight={'400'}>
            of 5
          </Text>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width={100}
          >
            <IconButton aria-label="back" icon={<ArrowLeftIcon />} />
            <IconButton aria-label="back" icon={<ArrowRightIcon />} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;
