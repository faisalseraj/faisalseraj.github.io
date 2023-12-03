import NextLink from 'next/link';
import { Flex, Link, Text } from '@chakra-ui/react';
import { MdArrowForward } from 'react-icons/md';
import { useRouter } from 'next/router';

import { useCallback } from 'react';
import { FormattedMessage } from '@/utils/intl';

type NextViewProps = {
  title?: React.ReactNode;
  href?: string;
};

export const NextView = ({ title, href }: NextViewProps) => {
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
        {title ?? <FormattedMessage id="cta.exit" />}
        <Text fontSize="20" mr={2}>
          <MdArrowForward />
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
