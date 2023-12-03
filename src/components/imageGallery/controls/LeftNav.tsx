import React from 'react';

import { ScrollLeftIcon } from '@/components/icons/ScrollLeftIcon';
import { useSelf } from '@/shared/hooks/useSelf';
import { UserType } from '@/shared/types';

export const LeftNav = React.memo(
  ({
    disabled,
    onClick
  }: {
    disabled: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    const { self: user } = useSelf();
    return (
      <button
        type="button"
        className="image-gallery-icon image-gallery-left-nav"
        disabled={disabled}
        onClick={onClick}
        aria-label="Previous Slide"
      >
        <ScrollLeftIcon className="image-gallery-svg" />
      </button>
    );
  }
);

LeftNav.displayName = 'LeftNav';
