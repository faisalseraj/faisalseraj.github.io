import React from 'react';
import { Flex } from '@chakra-ui/react';

import { Header } from './components/Header';

export const HeaderLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      {children}
    </Flex>
  );
};
