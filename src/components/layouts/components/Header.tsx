import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useSelf } from '@/shared/hooks/useSelf';
import { useSignOut } from '@/shared/hooks/useSignout';
import { routes } from '@/shared/routes';
import { FormattedMessage } from '@/utils/intl';

type HeaderProps = {
  burgerButton?: React.ReactNode;
};

export const Header = ({ burgerButton }: HeaderProps) => {
  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  const { self: user } = useSelf();
  const { signOut } = useSignOut();

  const accountPath = () => {
    return '/';
  };

  return (
    <Flex
      as="nav"
      px={{ base: '16px', sm: '50px' }}
      py={{ base: '12px', sm: '45px' }}
      bg={
        'repeating-linear-gradient(-45deg, var(--chakra-colors-brand-black), var(--chakra-colors-brand-black) 10px, var(--chakra-colors-brand-blue) 10px, var(--chakra-colors-brand-blue) 20px)'
      }
      alignItems="center"
    >
      <NextLink href={accountPath()} passHref>
        <Image
          src="/images/logo-white.svg"
          alt="Art &amp; Writing Logo"
          cursor="pointer"
          maxW="20%"
          height={{ base: '22px', sm: 'auto' }}
        />
      </NextLink>

      {platform === 'desktop' ? (
        <>
          <>
            <HStack
              spacing={3}
              ml="30px"
              alignItems="center"
              fontSize="xs"
              color="brand.darkestGrey"
              textTransform="uppercase"
            ></HStack>

            <HStack spacing={3} marginLeft="auto">
              {!user ? (
                <Button>
                  <FormattedMessage id="nav.login" />
                </Button>
              ) : (
                <Menu>
                  <MenuButton>
                    <Avatar
                      name={`${user.firstName} ${user.lastName}`}
                      bg="brand.orange"
                    />
                  </MenuButton>

                  <MenuList zIndex={3}>
                    <NextLink href={routes.app.changePassword} passHref>
                      <MenuItem as="a">
                        <FormattedMessage id="authFlow.changePasswordButton" />
                      </MenuItem>
                    </NextLink>

                    <MenuDivider />

                    <NextLink href={routes.app.changeProfile} passHref>
                      <MenuItem as="a">
                        <FormattedMessage id="authFlow.changeProfileButton" />
                      </MenuItem>
                    </NextLink>

                    <MenuItem onClick={signOut}>
                      <FormattedMessage id="authFlow.logOutButton" />
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </HStack>
          </>
        </>
      ) : (
        <Box ml="auto" lineHeight={0}>
          {burgerButton}
        </Box>
      )}
    </Flex>
  );
};
