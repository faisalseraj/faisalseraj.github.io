import { Image } from '@chakra-ui/react';

export const WorkIcon = () => {
  return <Image src="/images/work.svg" alt="" />;
};

export const WorkIconFilled = () => {
  return <Image src="/images/paper-pencil2.svg" alt="" width={'32px'} />;
};

export const FullScreenArrowsIcon = () => {
  return <Image src="/images/fullscreen.svg" alt="" width={'18px'} />;
};
export const ExitScreenArrowsIcon = () => {
  return (
    <Image
      src="https://cdn.iconscout.com/icon/premium/png-256-thumb/exit-full-screen-3523885-2948221.png"
      alt=""
      width="1.5rem"
      height="1.5rem"
    />
  );
};

export const ArtIcon = () => {
  return <Image src="/images/paint-palette-gray.svg" alt="" />;
};

export const ArtIconFilled = () => {
  return <Image src="/images/paint-palette.svg" alt="" width={'54px'} />;
};

export const WarningFilledIcon = () => {
  return <Image src="/images/warning.svg" alt="" width={'16px'} />;
};
