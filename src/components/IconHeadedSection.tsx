import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

type HeadedSectionProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export const IconHeadedSection = ({ icon, children }: HeadedSectionProps) => {
  return (
    <Flex layerStyle="section" direction="column" px={0} py={0}>
      <Flex
        width="100%"
        height={{ base: '48px', md: '64px' }}
        bgColor="brand.blue"
        justifyContent="center"
        position="relative"
        borderTopLeftRadius="6px"
        borderTopRightRadius="6px"
      >
        {icon !== undefined ? (
          <Box
            position="absolute"
            top={0}
            transform="translateY(-50%)"
            height={{ base: '64px', md: '96px' }}
            sx={{
              '& > *': {
                height: '100%',
                width: 'auto'
              }
            }}
          >
            {icon}
          </Box>
        ) : null}
      </Flex>

      <Box p={{ base: 4, md: 10 }} width="100%">
        {children}
      </Box>
    </Flex>
  );
};
