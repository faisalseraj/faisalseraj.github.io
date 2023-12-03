import NextLink from 'next/link';
import { Flex, Link, Text } from '@chakra-ui/react';

import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { FormattedMessage } from '@/utils/intl';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

type NextPageProps = {
  title?: React.ReactNode;
  href?: string;
};

export const NextPage = ({ title, href }: NextPageProps) => {
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
        <Text mt={2}>{title ?? <FormattedMessage id="cta.exit" />}</Text>
        <Text fontSize="20" ml={2}>
          <ChevronRightIcon />
        </Text>
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
