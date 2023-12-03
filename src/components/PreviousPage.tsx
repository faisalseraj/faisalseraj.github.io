import NextLink from 'next/link';
import { Flex, Link, Text } from '@chakra-ui/react';

import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { FormattedMessage } from '@/utils/intl';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

type PreviousPageProps = {
  title?: React.ReactNode;
  href?: string;
};

export const PreviousPage = ({ title, href }: PreviousPageProps) => {
  const router = useRouter();

  const onClick = useCallback(() => {
    if (href === undefined) router.back();
  }, [href, router]);

  const link = (
    <Link
      textDecoration="none"
      textTransform="uppercase"
      fontSize={`${14 / 16}rem`}
      fontWeight="bold"
      color="brand.black"
      _hover={{
        textDecoration: 'none'
      }}
      onClick={onClick}
    >
      <Flex>
        <Text fontSize="20" mr={2}>
          <ChevronLeftIcon />
        </Text>
        <Text mt={2}>{title ?? <FormattedMessage id="cta.exit" />}</Text>
      </Flex>
    </Link>
  );

  if (href) {
    return (
      <NextLink href={href} passHref>
        {link}
      </NextLink>
    );
  }

  return link;
};
