import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

type SplitSectionProps = {
  headerComponent: React.ReactNode;
  children?: React.ReactNode;
};

export const SplitSection = ({
  headerComponent,
  children
}: SplitSectionProps) => {
  return (
    <Flex
      layerStyle="section"
      px={0}
      py={0}
      overflow="hidden"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Flex
        width={{ base: '100%', md: 440 }}
        maxWidth={{ base: '100%', md: '50%' }}
        flexShrink={0}
        p={{ base: 8, md: 10 }}
        bgColor="brand.blue"
        alignItems="center"
        justifyContent="center"
      >
        {headerComponent}
      </Flex>

      <Box px={{ base: 4, md: 10 }} py={{ base: 10, md: 14 }} width="100%">
        {children}
      </Box>
    </Flex>
  );
};
