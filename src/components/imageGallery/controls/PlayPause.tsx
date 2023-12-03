import React from 'react';

import { PlayIcon } from '@/components/icons/PlayIcon';
import { PauseIcon } from '@/components/icons/PauseIcon';

export const PlayPause = React.memo(
  ({
    isPlaying,
    onClick
  }: {
    isPlaying: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    return (
      <button
        type="button"
        className="image-gallery-icon image-gallery-play-button"
        onClick={onClick}
        aria-label="Play or Pause Slideshow"
      >
        {isPlaying ? (
          <PauseIcon className="image-gallery-svg" />
        ) : (
          <PlayIcon className="image-gallery-svg" />
        )}
      </button>
    );
  }
);

PlayPause.displayName = 'PlayPause';
