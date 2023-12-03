import React from 'react';

import { ScrollRightIcon } from '@/components/icons/ScrollRightIcon';
import { UserType } from '@/shared/types';
import { useSelf } from '@/shared/hooks/useSelf';

export const RightNav = React.memo(
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
        className="image-gallery-icon image-gallery-right-nav"
        disabled={disabled}
        onClick={onClick}
        aria-label="Next Slide"
      >
        <ScrollRightIcon className="image-gallery-svg" />
      </button>
    );
  }
);

RightNav.displayName = 'RightNav';

export default RightNav;
