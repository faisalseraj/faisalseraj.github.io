import { Heading, useBreakpointValue } from '@chakra-ui/react';

type MobileOnlyHeadingProps = {
  title: string;
};

export const MobileOnlyHeading = ({ title }: MobileOnlyHeadingProps) => {
  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  if (platform !== 'mobile') return null;

  return (
    <Heading mb={0} textAlign="center">
      {title}
    </Heading>
  );
};
