import NextLink from 'next/link';
import { Flex, Link, Text } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/router';

import { FormattedMessage } from '@/utils/intl';

type ExitLinkProps = {
  title?: React.ReactNode;
  href?: string;
};

export const ExitLink = ({ title, href }: ExitLinkProps) => {
  const router = useRouter();

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
      onClick={() => {
        if (href === undefined) router.back();
      }}
    >
      <Flex>
        <Text fontSize="20" mr={2}>
          <MdArrowBack />
        </Text>
        {title ?? <FormattedMessage id="cta.exit" />}
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
