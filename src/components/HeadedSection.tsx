import React, { useMemo } from 'react';
import {
  Badge,
  Box,
  Flex,
  HStack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

type HeadedSectionProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'normal' | 'cashAward';
  headingRow?: () => JSX.Element;
  bgColor?: string;
  commingSoon?: boolean;
};

export const HeadedSection = ({
  title,
  children,
  variant = 'normal',
  bgColor,
  commingSoon,
  headingRow
}: HeadedSectionProps) => {
  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';
  const centered = useMemo(() => {
    return platform === 'mobile' && variant === 'cashAward';
  }, [platform, variant]);
  return (
    <Flex layerStyle="section" direction="column" px={0} py={0} mt={5}>
      <Flex
        width="100%"
        height={centered ? '60px' : 'auto'}
        bgColor={bgColor ?? 'brand.blue'}
        position="relative"
        borderTopLeftRadius="6px"
        borderTopRightRadius="6px"
        p={5}
        alignItems="center"
        justifyContent={centered ? 'center' : 'flex-start'}
        {...(variant === 'cashAward'
          ? {
              backgroundImage:
                platform === 'mobile'
                  ? '/images/cash-award-mobile.svg'
                  : '/images/award-background.svg'
            }
          : {})}
      >
        {headingRow ? (
          headingRow()
        ) : (
          <HStack w="100%">
            <Text color="white" fontSize={`${24 / 16}rem`} fontWeight={700}>
              {title}
            </Text>
            {commingSoon ? (
              <Badge p={2} variant={'solid'} bg="red.400" borderRadius={10}>
                Comming soon
              </Badge>
            ) : null}
          </HStack>
        )}
      </Flex>

      {children}
    </Flex>
  );
};
