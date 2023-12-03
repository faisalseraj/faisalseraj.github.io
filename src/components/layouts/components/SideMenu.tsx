import React from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  IconProps,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useIntl } from '@/utils/intl';
import { useSignOut } from '@/shared/hooks/useSignout';
import { UserType } from '@/shared/types';
import { useSelf } from '@/shared/hooks/useSelf';

type SideMenuLinkProps = {
  icon?: React.ReactElement<IconProps>;
  title: string | React.ReactNode;
  href?: string;
  buttonProps?: ButtonProps;
};

export const SideMenuLink = ({
  icon,
  title,
  href,
  buttonProps
}: SideMenuLinkProps) => {
  const { asPath } = useRouter();

  const isActive = href !== undefined && asPath.startsWith(href);

  const button = (
    <Button
      variant={isActive ? 'solid' : 'ghost'}
      colorScheme="blue"
      color={isActive ? undefined : 'brand.darkestBlack'}
      leftIcon={
        icon !== undefined
          ? React.cloneElement<IconProps>(icon, {
              boxSize: '16px'
            })
          : undefined
      }
      width="100%"
      borderRadius={0}
      fontSize="1rem"
      lineHeight={`${28 / 16}rem`}
      justifyContent="flex-start"
      textTransform="none"
      fontWeight={500}
      height="auto"
      px={icon !== undefined ? 6 : 12}
      py={4}
      sx={{
        '&:focus': {
          boxShadow: 'inset 0 0 0 3px rgba(66, 153, 225, 0.6)'
        }
      }}
      {...buttonProps}
    >
      {title}
    </Button>
  );

  if (href !== undefined) {
    return (
      <NextLink href={href} passHref>
        {button}
      </NextLink>
    );
  }

  return button;
};

type SideMenuSection = {
  title?: string | React.ReactNode;
  items: React.ReactNode[];
};

type SideMenuProps = {
  header?: React.ReactNode;
  sections: SideMenuSection[];
};

export const SideMenu = ({ header, sections }: SideMenuProps) => {
  const intl = useIntl();
  const { signOut } = useSignOut();
  const { self: user } = useSelf();

  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  const allSections: SideMenuSection[] = [
    ...sections,
    ...(platform === 'mobile'
      ? [
          {
            items: [
              <SideMenuLink
                key="signout"
                title={intl.formatMessage({ id: 'authFlow.logOutButton' })}
                buttonProps={{ onClick: () => signOut() }}
              />
            ]
          }
        ]
      : [])
  ];

  return (
    <Flex direction="column" overflow="scroll">
      {header != undefined ? (
        <Box bgColor="brand.lightGrey" px={6} py={10}>
          {header}
        </Box>
      ) : null}

      <Box
        py={6}
        sx={{
          '& .menuSection + .menuSection': {
            borderTop: '1px solid',
            borderColor: 'brand.mediumGrey',
            marginTop: 4,
            paddingTop: 6
          }
        }}
      >
        {allSections.map(({ title, items }, i) => (
          <Box key={i} className="menuSection">
            {title !== undefined ? (
              <Text
                fontSize={`${14 / 16}rem`}
                color="brand.lightBlack"
                textTransform="uppercase"
                mb={4}
                mx={6}
              >
                {title}
              </Text>
            ) : null}

            {items}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
