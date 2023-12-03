import { Image } from '@chakra-ui/react';

export const ActiveAward = () => {
  return (
    <Image
      src="/images/activeAward.svg"
      alt="given-awards"
      width={{ md: '80px', base: '54px' }}
      height={{ md: '80px', base: '54px' }}
    />
  );
};

export const InActiveAward = () => {
  return (
    <Image
      src="/images/inActiveAward.svg"
      alt="remaining-awards"
      width={{ md: '80px', base: '54px' }}
      height={{ md: '80px', base: '54px' }}
    />
  );
};

export const ExtraAward = () => {
  return (
    <Image
      src="/images/extraAward.svg"
      alt="extra-awards"
      width={{ md: '80px', base: '54px' }}
      height={{ md: '80px', base: '54px' }}
    />
  );
};

export const NoAward = () => {
  return (
    <Image
      src="/images/no-award.svg"
      alt="no-award"
      width={{ md: '30px', base: '54px' }}
      height={{ md: '30px', base: '54px' }}
    />
  );
};

export const SilverAward = () => {
  return (
    <Image
      src="/images/silver-award.svg"
      alt="silver-award"
      width={{ md: '35px', base: '54px' }}
      height={{ md: '35px', base: '54px' }}
    />
  );
};

export const GoldAward = () => {
  return (
    <Image
      src="/images/gold-award.svg"
      alt="gold-award"
      width={{ md: '35px', base: '54px' }}
      height={{ md: '35px', base: '54px' }}
    />
  );
};
