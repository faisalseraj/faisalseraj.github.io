import React from 'react';
import { Container } from '@chakra-ui/react';

import { useSelf } from '@/shared/hooks/useSelf';
import { UserType } from '@/shared/types';
import { Header } from './components/Header';

export const BasicLayout = ({ children }: { children?: React.ReactNode }) => {
  const { self: user } = useSelf();

  const maxWidth = () => {
    return 1080 + 300;
  };
  return (
    <>
      <Header />
      <Container my={{ base: 8, md: 16 }} maxW={maxWidth()}>
        {children}
      </Container>
    </>
  );
};
