import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const SectionHeading = ({ title }: { title: string }) => {
  return (
    <>
      <Flex layerStyle="section" direction="column" px={0} py={0}>
        <Flex
          width="100%"
          height="78px"
          bgColor="brand.blue"
          position="relative"
          borderTopLeftRadius="6px"
          borderTopRightRadius="6px"
          p={5}
          alignItems="center"
        >
          <Text color="white" fontSize={`${24 / 16}rem`} fontWeight={700}>
            {title}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default SectionHeading;
