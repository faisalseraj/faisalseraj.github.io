import React from 'react';
import { ReactEventHandler } from 'react';

/* eslint-disable @next/next/no-img-element */

type ItemProps = {
  description?: string;
  fullscreen?: string;
  isFullscreen: boolean;
  handleImageLoaded: (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    original: string
  ) => void;
  onImageError: ReactEventHandler<HTMLImageElement>;
  original: string;
  originalAlt?: string;
  originalHeight?: string;
  originalWidth?: string;
  originalTitle?: string;
  sizes?: string;
  srcSet?: string;
  loading?: 'eager' | 'lazy';
};

export const GalleryItem = React.memo(
  ({
    description = '',
    fullscreen = '',
    handleImageLoaded,
    isFullscreen = false,
    onImageError,
    original,
    originalAlt = '',
    originalHeight = '',
    originalWidth = '',
    originalTitle = '',
    sizes = '',
    srcSet = '',
    loading = 'eager'
  }: ItemProps) => {
    const itemSrc = isFullscreen ? fullscreen || original : original;

    return (
      <React.Fragment>
        <img
          className="image-gallery-image"
          src={itemSrc}
          alt={originalAlt}
          srcSet={srcSet}
          height={originalHeight}
          width={originalWidth}
          sizes={sizes}
          title={originalTitle}
          onLoad={(event) => handleImageLoaded(event, original)}
          onError={onImageError}
          loading={loading}
        />
        {description && (
          <span className="image-gallery-description">{description}</span>
        )}
      </React.Fragment>
    );
  }
);

GalleryItem.displayName = 'Item';
