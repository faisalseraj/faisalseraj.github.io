import React from 'react';

import { MaximizeIcon } from '@/components/icons/MaximizeIcon';
import { MinimizeIcon } from '@/components/icons/MinimizeIcon';

export const Fullscreen = React.memo(
  ({
    isFullscreen,
    onClick
  }: {
    isFullscreen: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    return (
      <button
        type="button"
        className="image-gallery-icon image-gallery-fullscreen-button"
        onClick={onClick}
        aria-label="Open Fullscreen"
      >
        {isFullscreen ? (
          <MinimizeIcon className="image-gallery-svg" />
        ) : (
          <MaximizeIcon className="image-gallery-svg" />
        )}
      </button>
    );
  }
);

Fullscreen.displayName = 'Fullscreen';
