import React, { useCallback, useEffect } from 'react';
import {
  Box,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import { useStoreState } from 'pullstate';

import { AppStore } from '@/shared/stores/AppStore';

import { useSelf } from '@/shared/hooks/useSelf';
import { UserType } from '@/shared/types';
import { Header } from './components/Header';

type SideMenuLayoutProps = {
  menu: React.ReactNode;
  children?: React.ReactNode;
};

const DRAWER_WIDTH = 300;

export const SideMenuLayout = ({ menu, children }: SideMenuLayoutProps) => {
  const router = useRouter();
  const { self: user } = useSelf();

  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  const isSideMenuOpen = useStoreState(AppStore, (s) => s.isSideMenuOpen);

  const toggleSideMenu = useCallback(() => {
    AppStore.update((s) => {
      s.isSideMenuOpen = !s.isSideMenuOpen;
    });
  }, [AppStore]);

  const closeSideMenu = useCallback(() => {
    AppStore.update((s) => {
      s.isSideMenuOpen = false;
    });
  }, [AppStore]);

  useEffect(() => {
    const handleRouteChange = () => {
      closeSideMenu();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const burgerButton = (
    <IconButton
      aria-label="menu"
      variant="link"
      onClick={toggleSideMenu}
      icon={<HamburgerIcon fontSize={{ base: '2xl', sm: '3xl' }} />}
      sx={{
        '&:focus': {
          boxShadow: 'none'
        }
      }}
    />
  );

  const maxWidth = useCallback(() => {
    return 1080 + 250;
  }, [user]);
  return (
    <Flex direction="column" minHeight="100vh">
      <Header burgerButton={burgerButton} />
      <Flex flexGrow={1}>
        {platform === 'desktop' ? (
          <Box width={DRAWER_WIDTH} flexShrink={0} bgColor="brand.lighterGrey">
            <Sticky enabled={true}>
              <Box
                width={DRAWER_WIDTH}
                alignSelf="flex-start"
                bgColor="brand.lighterGrey"
              >
                {menu}
              </Box>
            </Sticky>
          </Box>
        ) : (
          <Drawer
            onClose={closeSideMenu}
            isOpen={isSideMenuOpen}
            size="sm"
            placement="left"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton
                fontSize="xl"
                sx={{
                  '&:focus': {
                    boxShadow: 'none'
                  }
                }}
              />
              {menu}
            </DrawerContent>
          </Drawer>
        )}

        <Box
          width={
            platform === 'desktop' ? `calc(100vw - ${DRAWER_WIDTH}px)` : '100%'
          }
        >
          <Container my={{ base: 8, md: 10 }} maxW={maxWidth()}>
            {children}
          </Container>
        </Box>
      </Flex>
    </Flex>
  );
};
