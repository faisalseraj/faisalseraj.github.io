// Note:
// This the react-image-gallery project (https://github.com/xiaolin/react-image-gallery)
// converted to Typescript and modified to meet our needs

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import React from 'react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import isEqual from 'react-fast-compare';
import ResizeObserver from 'resize-observer-polyfill';
import { DOWN, LEFT, RIGHT, SwipeCallback, UP } from 'react-swipeable';

import { GalleryItem } from './GalleryItem';
import { Fullscreen } from './controls/Fullscreen';
import { LeftNav } from './controls/LeftNav';
import { RightNav } from './controls/RightNav';
import { PlayPause } from './controls/PlayPause';
import { SwipeWrapper } from './SwipeWrapper';
import { ImageGalleryStyleContainer } from './ImageGalleryStyleContainer';

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

const screenChangeEvents = [
  'fullscreenchange',
  'MSFullscreenChange',
  'mozfullscreenchange',
  'webkitfullscreenchange'
];

type ReactImageGalleryImageSet = ReadonlyArray<{
  srcSet: string;
  media: string;
}>;

export type ReactImageGalleryItem = {
  bulletClass?: string;
  bulletOnClick?({
    item,
    itemIndex,
    currentIndex
  }: {
    item: ReactImageGalleryItem;
    itemIndex: number;
    currentIndex: number;
  }): void;
  description?: string;
  original: string;
  originalHeight?: string;
  originalWidth?: string;
  thumbnailHeight?: string;
  thumbnailWidth?: string;
  fullscreen?: string;
  originalAlt?: string;
  originalTitle?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailLabel?: string;
  thumbnailTitle?: string;
  originalClass?: string;
  thumbnailClass?: string;
  loading?: 'eager' | 'lazy';
  thumbnailLoading?: 'eager' | 'lazy';
  renderItem?(item: ReactImageGalleryItem): React.ReactNode;
  renderThumbInner?(item: ReactImageGalleryItem): React.ReactNode;
  imageSet?: ReactImageGalleryImageSet;
  srcSet?: string;
  sizes?: string;
};

type ReactImageGalleryProps = {
  flickThreshold?: number;
  items: ReadonlyArray<ReactImageGalleryItem>;
  fullScreenSideBar?: React.ReactNode;
  showNav?: boolean;
  autoPlay?: boolean;
  lazyLoad?: boolean;
  infinite?: boolean;
  showIndex?: boolean;
  showBullets?: boolean;
  showThumbnails?: boolean;
  showPlayButton?: boolean;
  showFullscreenButton?: boolean;
  disableThumbnailScroll?: boolean;
  disableKeyDown?: boolean;
  disableSwipe?: boolean;
  useBrowserFullscreen?: boolean;
  useWindowKeyDown?: boolean;
  preventDefaultTouchmoveEvent?: boolean;
  onErrorImageURL?: string;
  indexSeparator?: string;
  thumbnailPosition?: 'top' | 'right' | 'bottom' | 'left';
  startIndex?: number;
  slideDuration?: number;
  slideInterval?: number;
  swipeThreshold?: number;
  swipingTransitionDuration?: number;
  swipingThumbnailTransitionDuration?: number;
  disableThumbnailSwipe?: boolean;
  onSlide?: (currentIndex: number) => void;
  onBeforeSlide?: (currentIndex: number) => void;
  onScreenChange?: (fullScreen: boolean) => void;
  onPause?: (currentIndex: number) => void;
  onPlay?: (currentIndex: number) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onThumbnailError?: React.ReactEventHandler<HTMLImageElement>;
  onThumbnailClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLElement>,
    index: number
  ) => void;
  renderCustomControls?: () => React.ReactNode;
  renderLeftNav?: (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
  ) => React.ReactNode;
  renderRightNav?: (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
  ) => React.ReactNode;
  renderPlayPauseButton?: (
    onClick: React.MouseEventHandler<HTMLElement>,
    isPlaying: boolean
  ) => React.ReactNode;
  renderFullscreenButton?: (
    onClick: React.MouseEventHandler<HTMLElement>,
    isFullscreen: boolean
  ) => React.ReactNode;
  renderItem?: (item: ReactImageGalleryItem) => React.ReactNode;
  renderThumbInner?: (item: ReactImageGalleryItem) => React.ReactNode;
  stopPropagation?: boolean;
  additionalClass?: string;
  useTranslate3D?: boolean;
  isRTL?: boolean;
};

type ReactImageGalleryState = {
  currentIndex: number;
  previousIndex: number;
  thumbsTranslate: number;
  thumbsSwipedTranslate: number;
  currentSlideOffset: number;
  galleryWidth: number;
  thumbnailsWrapperWidth: number;
  thumbnailsWrapperHeight: number;
  thumbsStyle: React.CSSProperties;
  slideStyle: React.CSSProperties;
  isFullscreen: boolean;
  isSwipingThumbnail: boolean;
  isPlaying: boolean;
  isTransitioning: boolean;
  modalFullscreen: boolean;
  gallerySlideWrapperHeight: number;
  swipingUpDown: boolean;
  swipingLeftRight: boolean;
};

export class ImageGallery extends React.Component<
  ReactImageGalleryProps,
  ReactImageGalleryState
> {
  loadedImages: Record<string, boolean> = {};
  imageGallery = React.createRef<HTMLDivElement>();
  thumbnailsWrapper = React.createRef<HTMLDivElement>();
  thumbnails = React.createRef<HTMLDivElement>();
  imageGallerySlideWrapper = React.createRef<HTMLDivElement>();
  lazyLoaded: Array<boolean> = [];

  transitionTimer = 0;
  playPauseIntervalId: number | null = null;
  thumbnailMouseOverTimer: number | null = null;
  direction = '';
  resizeObserver: ResizeObserver | null = null;

  unThrottledSlideToIndex: typeof this.slideToIndex;

  constructor(props: ReactImageGalleryProps) {
    super(props);
    this.state = {
      currentIndex: props.startIndex ?? 0,
      previousIndex: props.startIndex ?? 0,
      thumbsTranslate: 0,
      thumbsSwipedTranslate: 0,
      currentSlideOffset: 0,
      galleryWidth: 0,
      thumbnailsWrapperWidth: 0,
      thumbnailsWrapperHeight: 0,
      thumbsStyle: { transition: `all ${props.slideDuration}ms ease-out` },
      slideStyle: {},
      isFullscreen: false,
      isSwipingThumbnail: false,
      isPlaying: false,
      isTransitioning: false,
      modalFullscreen: false,
      gallerySlideWrapperHeight: 0,
      swipingUpDown: false,
      swipingLeftRight: false
    };
    this.loadedImages = {};
    this.imageGallery = React.createRef();
    this.thumbnailsWrapper = React.createRef();
    this.thumbnails = React.createRef();
    this.imageGallerySlideWrapper = React.createRef();

    // Used to update the throttle if slideDuration changes
    this.unThrottledSlideToIndex = this.slideToIndex;

    this.slideToIndex = throttle(
      this.unThrottledSlideToIndex,
      props.slideDuration,
      { trailing: false }
    );

    if (props.lazyLoad) {
      this.lazyLoaded = [];
    }
  }

  componentDidMount() {
    const { autoPlay, useWindowKeyDown } = this.props;
    if (autoPlay) {
      this.play();
    }
    if (useWindowKeyDown) {
      window.addEventListener('keydown', this.handleKeyDown);
    } else {
      this.imageGallery.current!.addEventListener(
        'keydown',
        this.handleKeyDown
      );
    }
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('touchmove', this.handleTouchMove, {
      passive: false
    });
    this.initResizeObserver(this.imageGallerySlideWrapper);
    this.addScreenChangeEvent();
  }

  componentDidUpdate(
    prevProps: ReactImageGalleryProps,
    prevState: ReactImageGalleryState
  ) {
    const {
      items,
      lazyLoad,
      slideDuration,
      slideInterval,
      startIndex,
      thumbnailPosition,
      showThumbnails,
      useWindowKeyDown
    } = this.props;

    const { currentIndex, isPlaying } = this.state;
    const itemsSizeChanged = prevProps.items.length !== items.length;
    const itemsChanged = !isEqual(prevProps.items, items);
    const startIndexUpdated = prevProps.startIndex !== startIndex;
    const thumbnailsPositionChanged =
      prevProps.thumbnailPosition !== thumbnailPosition;
    const showThumbnailsChanged = prevProps.showThumbnails !== showThumbnails;

    if (
      slideInterval !== prevProps.slideInterval ||
      slideDuration !== prevProps.slideDuration
    ) {
      // Refresh setInterval
      if (isPlaying) {
        this.pause();
        this.play();
      }
    }

    if (thumbnailsPositionChanged) {
      // Re-initialize resizeObserver because slides was unmounted and mounted again
      this.removeResizeObserver();
      this.initResizeObserver(this.imageGallerySlideWrapper);
    }

    if (itemsSizeChanged || showThumbnailsChanged) {
      this.handleResize();
    }
    if (prevState.currentIndex !== currentIndex) {
      this.slideThumbnailBar();
    }

    // If slideDuration changes, update slideToIndex throttle
    if (prevProps.slideDuration !== slideDuration) {
      this.slideToIndex = throttle(
        this.unThrottledSlideToIndex,
        slideDuration,
        { trailing: false }
      );
    }
    if (lazyLoad && (!prevProps.lazyLoad || itemsChanged)) {
      this.lazyLoaded = [];
    }

    if (useWindowKeyDown !== prevProps.useWindowKeyDown) {
      if (useWindowKeyDown) {
        this.imageGallery.current!.removeEventListener(
          'keydown',
          this.handleKeyDown
        );
        window.addEventListener('keydown', this.handleKeyDown);
      } else {
        window.removeEventListener('keydown', this.handleKeyDown);
        this.imageGallery.current!.addEventListener(
          'keydown',
          this.handleKeyDown
        );
      }
    }

    if (startIndexUpdated || itemsChanged) {
      // TODO: this should be fix/removed
      this.setState({ currentIndex: startIndex! });
    }
  }

  componentWillUnmount() {
    const { useWindowKeyDown } = this.props;
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('touchmove', this.handleTouchMove);
    this.removeScreenChangeEvent();
    this.removeResizeObserver();
    if (this.playPauseIntervalId) {
      window.clearInterval(this.playPauseIntervalId);
      this.playPauseIntervalId = null;
    }
    if (this.transitionTimer) {
      window.clearTimeout(this.transitionTimer);
    }
    if (useWindowKeyDown) {
      window.removeEventListener('keydown', this.handleKeyDown);
    } else {
      this.imageGallery.current!.removeEventListener(
        'keydown',
        this.handleKeyDown
      );
    }
  }

  onSliding() {
    const { currentIndex, isTransitioning } = this.state;
    const { onSlide, slideDuration } = this.props;
    this.transitionTimer = window.setTimeout(() => {
      if (isTransitioning) {
        this.setState({
          isTransitioning: !isTransitioning,
          // reset swiping thumbnail after transitioning to new slide,
          // so we can resume thumbnail auto translate
          isSwipingThumbnail: false
        });

        if (onSlide) {
          onSlide(currentIndex);
        }
      }
    }, (slideDuration ?? 0) + 50);
  }

  onThumbnailClick(
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLElement>,
    index: number
  ) {
    const { onThumbnailClick } = this.props;

    // Blur element to remove outline cause by focus
    (
      (event.target as HTMLElement)?.parentNode?.parentNode as HTMLElement
    )?.blur();
    this.slideToIndex(index, true);
    if (onThumbnailClick) {
      onThumbnailClick(event, index);
    }
  }

  onThumbnailMouseLeave = () => {
    if (this.thumbnailMouseOverTimer) {
      const { autoPlay } = this.props;
      window.clearTimeout(this.thumbnailMouseOverTimer);
      this.thumbnailMouseOverTimer = null;
      if (autoPlay) {
        this.play();
      }
    }
  };

  setThumbsTranslate(thumbsTranslate: number) {
    this.setState({ thumbsTranslate });
  }

  setModalFullscreen(state: boolean) {
    const { onScreenChange } = this.props;
    this.setState({ modalFullscreen: state });

    // Manually call because browser does not support screen change events
    if (onScreenChange) {
      onScreenChange(state);
    }
  }

  getThumbsTranslate(indexDifference: number) {
    const { disableThumbnailScroll, items } = this.props;
    const { thumbnailsWrapperWidth, thumbnailsWrapperHeight } = this.state;
    let totalScroll;
    const thumbsElement = this.thumbnails && this.thumbnails.current;

    if (disableThumbnailScroll) return 0;

    if (thumbsElement) {
      // total scroll required to see the last thumbnail
      if (this.isThumbnailVertical()) {
        if (thumbsElement.scrollHeight <= thumbnailsWrapperHeight) {
          return 0;
        }
        totalScroll = thumbsElement.scrollHeight - thumbnailsWrapperHeight;
      } else {
        if (
          thumbsElement.scrollWidth <= thumbnailsWrapperWidth ||
          thumbnailsWrapperWidth <= 0
        ) {
          return 0;
        }
        totalScroll = thumbsElement.scrollWidth - thumbnailsWrapperWidth;
      }
      // scroll-x required per index change
      const perIndexScroll = totalScroll / (items.length - 1);
      return indexDifference * perIndexScroll;
    }
    return 0;
  }

  getAlignmentClassName(index: number) {
    // Necessary for lazing loading
    const { currentIndex } = this.state;
    const { infinite, items } = this.props;
    let alignment = '';
    const leftClassName = 'left';
    const centerClassName = 'center';
    const rightClassName = 'right';

    switch (index) {
      case currentIndex - 1:
        alignment = ` ${leftClassName}`;
        break;
      case currentIndex:
        alignment = ` ${centerClassName}`;
        break;
      case currentIndex + 1:
        alignment = ` ${rightClassName}`;
        break;
      default:
        break;
    }

    if (items.length >= 3 && infinite) {
      if (index === 0 && currentIndex === items.length - 1) {
        // set first slide as right slide if were sliding right from last slide
        alignment = ` ${rightClassName}`;
      } else if (index === items.length - 1 && currentIndex === 0) {
        // set last slide as left slide if were sliding left from first slide
        alignment = ` ${leftClassName}`;
      }
    }

    return alignment;
  }

  getTranslateXForTwoSlide(index: number) {
    // For taking care of infinite swipe when there are only two slides
    const { currentIndex, currentSlideOffset, previousIndex } = this.state;
    const indexChanged = currentIndex !== previousIndex;
    const firstSlideWasPrevSlide = index === 0 && previousIndex === 0;
    const secondSlideWasPrevSlide = index === 1 && previousIndex === 1;
    const firstSlideIsNextSlide = index === 0 && currentIndex === 1;
    const secondSlideIsNextSlide = index === 1 && currentIndex === 0;
    const swipingEnded = currentSlideOffset === 0;
    const baseTranslateX = -100 * currentIndex;
    let translateX = baseTranslateX + index * 100 + currentSlideOffset;

    // Keep track of user swiping direction
    // Important to understand how to translateX based on last direction
    if (currentSlideOffset > 0) {
      this.direction = 'left';
    } else if (currentSlideOffset < 0) {
      this.direction = 'right';
    }

    // when swiping between two slides make sure the next and prev slides
    // are on both left and right
    if (secondSlideIsNextSlide && currentSlideOffset > 0) {
      // swiping right
      translateX = -100 + currentSlideOffset;
    }
    if (firstSlideIsNextSlide && currentSlideOffset < 0) {
      // swiping left
      translateX = 100 + currentSlideOffset;
    }

    if (indexChanged) {
      // when indexChanged move the slide to the correct side
      if (firstSlideWasPrevSlide && swipingEnded && this.direction === 'left') {
        translateX = 100;
      } else if (
        secondSlideWasPrevSlide &&
        swipingEnded &&
        this.direction === 'right'
      ) {
        translateX = -100;
      }
    } else {
      // keep the slide on the correct side if the swipe was not successful
      if (secondSlideIsNextSlide && swipingEnded && this.direction === 'left') {
        translateX = -100;
      }
      if (firstSlideIsNextSlide && swipingEnded && this.direction === 'right') {
        translateX = 100;
      }
    }

    return translateX;
  }

  getThumbnailBarHeight() {
    if (this.isThumbnailVertical()) {
      const { gallerySlideWrapperHeight } = this.state;
      return { height: gallerySlideWrapperHeight };
    }
    return {};
  }

  getSlideStyle(index: number) {
    const { currentIndex, currentSlideOffset, slideStyle } = this.state;
    const { infinite, items, useTranslate3D, isRTL } = this.props;
    const baseTranslateX = -100 * currentIndex;
    const totalSlides = items.length - 1;

    // calculates where the other slides belong based on currentIndex
    // if it is RTL the base line should be reversed
    let translateX =
      (baseTranslateX + index * 100) * (isRTL ? -1 : 1) + currentSlideOffset;

    if (infinite && items.length > 2) {
      if (currentIndex === 0 && index === totalSlides) {
        // make the last slide the slide before the first
        // if it is RTL the base line should be reversed
        translateX = -100 * (isRTL ? -1 : 1) + currentSlideOffset;
      } else if (currentIndex === totalSlides && index === 0) {
        // make the first slide the slide after the last
        // if it is RTL the base line should be reversed
        translateX = 100 * (isRTL ? -1 : 1) + currentSlideOffset;
      }
    }

    // Special case when there are only 2 items with infinite on
    if (infinite && items.length === 2) {
      translateX = this.getTranslateXForTwoSlide(index);
    }

    let translate = `translate(${translateX}%, 0)`;

    if (useTranslate3D) {
      translate = `translate3d(${translateX}%, 0, 0)`;
    }

    // don't show some slides while transitioning to avoid background transitions
    const isVisible = this.isSlideVisible(index);

    return {
      display: isVisible ? 'inherit' : 'none',
      WebkitTransform: translate,
      MozTransform: translate,
      msTransform: translate,
      OTransform: translate,
      transform: translate,
      ...slideStyle
    };
  }

  getCurrentIndex() {
    const { currentIndex } = this.state;
    return currentIndex;
  }

  getThumbnailStyle() {
    let translate;
    const { useTranslate3D, isRTL } = this.props;
    const { thumbsTranslate, thumbsStyle } = this.state;
    const verticalTranslateValue = isRTL
      ? thumbsTranslate * -1
      : thumbsTranslate;

    if (this.isThumbnailVertical()) {
      translate = `translate(0, ${thumbsTranslate}px)`;
      if (useTranslate3D) {
        translate = `translate3d(0, ${thumbsTranslate}px, 0)`;
      }
    } else {
      translate = `translate(${verticalTranslateValue}px, 0)`;
      if (useTranslate3D) {
        translate = `translate3d(${verticalTranslateValue}px, 0, 0)`;
      }
    }
    return {
      WebkitTransform: translate,
      MozTransform: translate,
      msTransform: translate,
      OTransform: translate,
      transform: translate,
      ...thumbsStyle
    };
  }

  getSlideItems() {
    const { currentIndex } = this.state;
    const {
      items,
      onClick,
      lazyLoad,
      onTouchMove,
      onTouchEnd,
      onTouchStart,
      onMouseLeave,
      renderItem,
      renderThumbInner,
      showThumbnails,
      showBullets
    } = this.props;

    const slides: Array<React.ReactNode> = [];
    const thumbnails: Array<React.ReactNode> = [];
    const bullets: Array<React.ReactNode> = [];

    items.forEach((item, index) => {
      const alignment = this.getAlignmentClassName(index);
      const originalClass = item.originalClass ? ` ${item.originalClass}` : '';
      const thumbnailClass = item.thumbnailClass
        ? ` ${item.thumbnailClass}`
        : '';
      const handleRenderItem = item.renderItem || renderItem || this.renderItem;
      const handleRenderThumbInner =
        item.renderThumbInner || renderThumbInner || this.renderThumbInner;

      const showItem = !lazyLoad || alignment || this.lazyLoaded[index];
      if (showItem && lazyLoad && !this.lazyLoaded[index]) {
        this.lazyLoaded[index] = true;
      }

      const slideStyle = this.getSlideStyle(index);

      const slide = (
        <div
          aria-label={`Go to Slide ${index + 1}`}
          key={`slide-${index}`}
          tabIndex={-1}
          className={`image-gallery-slide ${alignment} ${originalClass}`}
          style={slideStyle}
          onClick={onClick}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onMouseLeave={onMouseLeave}
          role="button"
        >
          {showItem ? (
            handleRenderItem(item)
          ) : (
            <div style={{ height: '100%' }} />
          )}
        </div>
      );

      slides.push(slide);

      // Don't add thumbnails if there is none
      if (showThumbnails && item.thumbnail) {
        const igThumbnailClass = clsx(
          'image-gallery-thumbnail',
          thumbnailClass,
          { active: currentIndex === index }
        );

        thumbnails.push(
          <button
            key={`thumbnail-${index}`}
            type="button"
            tabIndex={0}
            aria-pressed={currentIndex === index ? 'true' : 'false'}
            aria-label={`Go to Slide ${index + 1}`}
            className={igThumbnailClass}
            onKeyUp={(event) => this.handleThumbnailKeyUp(event, index)}
            onClick={(event) => this.onThumbnailClick(event, index)}
          >
            {handleRenderThumbInner(item)}
          </button>
        );
      }

      if (showBullets) {
        // Generate bullet elements and store them in array
        const bulletOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          if (item.bulletOnClick) {
            item.bulletOnClick({ item, itemIndex: index, currentIndex });
          }

          // Blur element to remove outline caused by focus
          (event.target as HTMLElement).blur();
          return this.slideToIndex.call(this, index, true);
        };

        const igBulletClass = clsx('image-gallery-bullet', item.bulletClass, {
          active: currentIndex === index
        });

        bullets.push(
          <button
            type="button"
            key={`bullet-${index}`}
            className={igBulletClass}
            onClick={bulletOnClick}
            aria-pressed={currentIndex === index ? 'true' : 'false'}
            aria-label={`Go to Slide ${index + 1}`}
          />
        );
      }
    });

    return {
      slides,
      thumbnails,
      bullets
    };
  }

  ignoreIsTransitioning() {
    // Ignore isTransitioning because were not going to sibling slides
    // e.g. center to left or center to right

    const { items } = this.props;
    const { previousIndex, currentIndex } = this.state;
    const totalSlides = items.length - 1;

    // we want to show the in between slides transition
    const slidingMoreThanOneSlideLeftOrRight =
      Math.abs(previousIndex - currentIndex) > 1;
    const notGoingFromFirstToLast = !(
      previousIndex === 0 && currentIndex === totalSlides
    );
    const notGoingFromLastToFirst = !(
      previousIndex === totalSlides && currentIndex === 0
    );

    return (
      slidingMoreThanOneSlideLeftOrRight &&
      notGoingFromFirstToLast &&
      notGoingFromLastToFirst
    );
  }

  isFirstOrLastSlide(index: number) {
    const { items } = this.props;
    const totalSlides = items.length - 1;
    const isLastSlide = index === totalSlides;
    const isFirstSlide = index === 0;
    return isLastSlide || isFirstSlide;
  }

  slideIsTransitioning(index: number) {
    // Returns true if the gallery is transitioning and the index is not the
    // previous or currentIndex
    const { isTransitioning, previousIndex, currentIndex } = this.state;
    const indexIsNotPreviousOrNextSlide = !(
      index === previousIndex || index === currentIndex
    );
    return isTransitioning && indexIsNotPreviousOrNextSlide;
  }

  isSlideVisible(index: number) {
    /*
      Show slide if slide is the current slide and the next slide
      OR
      The slide is going more than one slide left or right, but not going from
      first to last and not going from last to first

      Edge case:
      If you go to the first or last slide, when they're
      not left, or right of each other they will try to catch up in the background
      so unless were going from first to last or vice versa we don't want the first
      or last slide to show up during the transition
    */
    return (
      !this.slideIsTransitioning(index) ||
      (this.ignoreIsTransitioning() && !this.isFirstOrLastSlide(index))
    );
  }

  slideThumbnailBar() {
    const { currentIndex, isSwipingThumbnail } = this.state;
    const nextTranslate = -this.getThumbsTranslate(currentIndex);
    if (isSwipingThumbnail) {
      return;
    }

    if (currentIndex === 0) {
      this.setState({ thumbsTranslate: 0, thumbsSwipedTranslate: 0 });
    } else {
      this.setState({
        thumbsTranslate: nextTranslate,
        thumbsSwipedTranslate: nextTranslate
      });
    }
  }

  canSlide() {
    const { items } = this.props;
    return items.length >= 2;
  }

  canSlideLeft() {
    const { infinite, isRTL } = this.props;
    return infinite || (isRTL ? this.canSlideNext() : this.canSlidePrevious());
  }

  canSlideRight() {
    const { infinite, isRTL } = this.props;
    return infinite || (isRTL ? this.canSlidePrevious() : this.canSlideNext());
  }

  canSlidePrevious() {
    const { currentIndex } = this.state;
    return currentIndex > 0;
  }

  canSlideNext() {
    const { currentIndex } = this.state;
    const { items } = this.props;
    return currentIndex < items.length - 1;
  }

  handleSwiping: SwipeCallback = ({ event, absX, dir }) => {
    const { disableSwipe, stopPropagation } = this.props;
    const { galleryWidth, isTransitioning, swipingUpDown, swipingLeftRight } =
      this.state;

    // if the initial swiping is up/down prevent moving the slides until swipe ends
    if ((dir === UP || dir === DOWN || swipingUpDown) && !swipingLeftRight) {
      if (!swipingUpDown) {
        this.setState({ swipingUpDown: true });
      }
      return;
    }

    if ((dir === LEFT || dir === RIGHT) && !swipingLeftRight) {
      this.setState({ swipingLeftRight: true });
    }

    if (disableSwipe) return;

    const { swipingTransitionDuration } = this.props;
    if (stopPropagation) {
      event.preventDefault();
    }

    if (!isTransitioning) {
      const side = dir === RIGHT ? 1 : -1;

      let currentSlideOffset = (absX / galleryWidth) * 100;
      if (Math.abs(currentSlideOffset) >= 100) {
        currentSlideOffset = 100;
      }

      const swipingTransition = {
        transition: `transform ${swipingTransitionDuration}ms ease-out`
      };

      this.setState({
        currentSlideOffset: side * currentSlideOffset,
        slideStyle: swipingTransition
      });
    } else {
      // don't move the slide
      this.setState({ currentSlideOffset: 0 });
    }
  };

  handleThumbnailSwiping: SwipeCallback = ({ event, absX, absY, dir }) => {
    const { stopPropagation, swipingThumbnailTransitionDuration } = this.props;
    const {
      thumbsSwipedTranslate,
      thumbnailsWrapperHeight,
      thumbnailsWrapperWidth,
      swipingUpDown,
      swipingLeftRight
    } = this.state;

    if (this.isThumbnailVertical()) {
      // If the initial swiping is left/right, prevent moving the thumbnail bar until swipe ends
      if (
        (dir === LEFT || dir === RIGHT || swipingLeftRight) &&
        !swipingUpDown
      ) {
        if (!swipingLeftRight) {
          this.setState({ swipingLeftRight: true });
        }
        return;
      }

      if ((dir === UP || dir === DOWN) && !swipingUpDown) {
        this.setState({ swipingUpDown: true });
      }
    } else {
      // If the initial swiping is up/down, prevent moving the thumbnail bar until swipe ends
      if ((dir === UP || dir === DOWN || swipingUpDown) && !swipingLeftRight) {
        if (!swipingUpDown) {
          this.setState({ swipingUpDown: true });
        }
        return;
      }

      if ((dir === LEFT || dir === RIGHT) && !swipingLeftRight) {
        this.setState({ swipingLeftRight: true });
      }
    }

    const thumbsElement = this.thumbnails && this.thumbnails.current!;
    const emptySpaceMargin = 20; // 20px to add some margin to show empty space

    let thumbsTranslate;
    let totalSwipeableLength;
    let hasSwipedPassedEnd;
    let hasSwipedPassedStart;
    let isThumbnailBarSmallerThanContainer;

    if (this.isThumbnailVertical()) {
      const slideY = dir === DOWN ? absY : -absY;
      thumbsTranslate = thumbsSwipedTranslate + slideY;
      totalSwipeableLength =
        thumbsElement.scrollHeight - thumbnailsWrapperHeight + emptySpaceMargin;
      hasSwipedPassedEnd = Math.abs(thumbsTranslate) > totalSwipeableLength;
      hasSwipedPassedStart = thumbsTranslate > emptySpaceMargin;
      isThumbnailBarSmallerThanContainer =
        thumbsElement.scrollHeight <= thumbnailsWrapperHeight;
    } else {
      const slideX = dir === RIGHT ? absX : -absX;
      thumbsTranslate = thumbsSwipedTranslate + slideX;
      totalSwipeableLength =
        thumbsElement.scrollWidth - thumbnailsWrapperWidth + emptySpaceMargin;
      hasSwipedPassedEnd = Math.abs(thumbsTranslate) > totalSwipeableLength;
      hasSwipedPassedStart = thumbsTranslate > emptySpaceMargin;
      isThumbnailBarSmallerThanContainer =
        thumbsElement.scrollWidth <= thumbnailsWrapperWidth;
    }

    if (isThumbnailBarSmallerThanContainer) {
      // No need to swipe a thumbnail bar smaller/shorter than its container
      return;
    }

    if ((dir === LEFT || dir === UP) && hasSwipedPassedEnd) {
      // Prevent further swiping
      return;
    }

    if ((dir === RIGHT || dir === DOWN) && hasSwipedPassedStart) {
      // Prevent further swiping
      return;
    }

    if (stopPropagation) event.stopPropagation();

    const swipingTransition = {
      transition: `transform ${swipingThumbnailTransitionDuration}ms ease-out`
    };

    this.setState({
      thumbsTranslate,
      thumbsStyle: swipingTransition
    });
  };

  handleOnThumbnailSwiped = () => {
    const { thumbsTranslate } = this.state;
    const { slideDuration } = this.props;
    this.resetSwipingDirection();
    this.setState({
      isSwipingThumbnail: true,
      thumbsSwipedTranslate: thumbsTranslate,
      thumbsStyle: { transition: `all ${slideDuration}ms ease-out` }
    });
  };

  sufficientSwipe() {
    const { currentSlideOffset } = this.state;
    const { swipeThreshold } = this.props;
    return Math.abs(currentSlideOffset) > swipeThreshold!;
  }

  resetSwipingDirection() {
    const { swipingUpDown, swipingLeftRight } = this.state;
    if (swipingUpDown) {
      // user stopped swipingUpDown, reset
      this.setState({ swipingUpDown: false });
    }

    if (swipingLeftRight) {
      // user stopped swipingLeftRight, reset
      this.setState({ swipingLeftRight: false });
    }
  }

  handleOnSwiped: SwipeCallback = ({ event, dir, velocity }) => {
    const { disableSwipe, stopPropagation, flickThreshold } = this.props;

    if (disableSwipe) return;

    const { isRTL } = this.props;
    if (stopPropagation) event.stopPropagation();
    this.resetSwipingDirection();

    // if it is RTL the direction is reversed
    const swipeDirection = (dir === LEFT ? 1 : -1) * (isRTL ? -1 : 1);
    const isSwipeUpOrDown = dir === UP || dir === DOWN;
    const isLeftRightFlick = velocity > flickThreshold! && !isSwipeUpOrDown;
    this.handleOnSwipedTo(swipeDirection, isLeftRightFlick);
  };

  handleOnSwipedTo(swipeDirection: number, isLeftRightFlick: boolean) {
    const { currentIndex, isTransitioning } = this.state;
    let slideTo = currentIndex;

    if ((this.sufficientSwipe() || isLeftRightFlick) && !isTransitioning) {
      // Slide to the next/prev slide
      slideTo += swipeDirection;
    }

    // If we can't swipe left or right, stay in the current index (noop)
    if (
      (swipeDirection === -1 && !this.canSlideLeft()) ||
      (swipeDirection === 1 && !this.canSlideRight())
    ) {
      slideTo = currentIndex;
    }

    this.unThrottledSlideToIndex(slideTo);
  }

  handleTouchMove = (event: TouchEvent) => {
    const { swipingLeftRight } = this.state;
    if (swipingLeftRight) {
      // prevent background scrolling up and down while swiping left and right
      event.preventDefault();
    }
  };

  handleMouseDown = () => {
    // keep track of mouse vs keyboard usage for a11y
    this.imageGallery.current!.classList.add('image-gallery-using-mouse');
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const { disableKeyDown, useBrowserFullscreen } = this.props;
    const { isFullscreen } = this.state;
    // keep track of mouse vs keyboard usage for a11y
    this.imageGallery.current!.classList.remove('image-gallery-using-mouse');

    if (disableKeyDown) return;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;
    const ESC_KEY = 27;

    // eslint-disable-next-line
    // @ts-ignore:next-line
    const key = parseInt(event.keyCode || event.which || 0, 10);

    switch (key) {
      case LEFT_ARROW:
        if (this.canSlideLeft() && !this.playPauseIntervalId) {
          this.slideLeft();
        }
        break;
      case RIGHT_ARROW:
        if (this.canSlideRight() && !this.playPauseIntervalId) {
          this.slideRight();
        }
        break;
      case ESC_KEY:
        if (isFullscreen && !useBrowserFullscreen) {
          this.exitFullScreen();
        }
        break;
      default:
        break;
    }
  };

  handleImageError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    const { onErrorImageURL } = this.props;
    if (
      onErrorImageURL &&
      (event.target as HTMLImageElement).src.indexOf(onErrorImageURL) === -1
    ) {
      /* eslint-disable no-param-reassign */
      (event.target as HTMLImageElement).src = onErrorImageURL;
      /* eslint-enable no-param-reassign */
    }
  };

  removeResizeObserver() {
    if (
      this.resizeObserver &&
      this.imageGallerySlideWrapper &&
      this.imageGallerySlideWrapper.current
    ) {
      this.resizeObserver.unobserve(this.imageGallerySlideWrapper.current);
      this.resizeObserver = null;
    }
  }

  handleResize() {
    const { currentIndex } = this.state;

    // if there is no resizeObserver, component has been unmounted
    if (!this.resizeObserver) {
      return;
    }

    if (this.imageGallery && this.imageGallery.current) {
      this.setState({ galleryWidth: this.imageGallery.current.offsetWidth });
    }

    if (
      this.imageGallerySlideWrapper &&
      this.imageGallerySlideWrapper.current
    ) {
      this.setState({
        gallerySlideWrapperHeight:
          this.imageGallerySlideWrapper.current.offsetHeight
      });
    }

    if (this.thumbnailsWrapper && this.thumbnailsWrapper.current) {
      if (this.isThumbnailVertical()) {
        this.setState({
          thumbnailsWrapperHeight: this.thumbnailsWrapper.current.offsetHeight
        });
      } else {
        this.setState({
          thumbnailsWrapperWidth: this.thumbnailsWrapper.current.offsetWidth
        });
      }
    }

    // Adjust thumbnail container when thumbnail width or height is adjusted
    this.setThumbsTranslate(-this.getThumbsTranslate(currentIndex));
  }

  initResizeObserver(element: React.RefObject<HTMLDivElement>) {
    this.resizeObserver = new ResizeObserver(
      debounce((entries) => {
        if (!entries) return;
        entries.forEach(() => {
          this.handleResize();
        });
      }, 300)
    );

    this.resizeObserver.observe(element.current!);
  }

  toggleFullScreen = () => {
    const { isFullscreen } = this.state;
    if (isFullscreen) {
      this.exitFullScreen();
    } else {
      this.fullScreen();
    }
  };

  togglePlay = () => {
    if (this.playPauseIntervalId) {
      this.pause();
    } else {
      this.play();
    }
  };

  handleScreenChange = () => {
    /*
      handles screen change events that the browser triggers e.g. esc key
    */
    const { onScreenChange, useBrowserFullscreen } = this.props;
    const fullScreenElement =
      document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;

    // check if screen change element is the gallery
    const isFullscreen = this.imageGallery.current === fullScreenElement;
    if (onScreenChange) onScreenChange(isFullscreen);
    if (useBrowserFullscreen) this.setState({ isFullscreen });
  };

  slideToIndex(index: number, byEvent?: boolean) {
    const { currentIndex, isTransitioning } = this.state;
    const { items, slideDuration, onBeforeSlide } = this.props;

    if (!isTransitioning) {
      if (byEvent) {
        if (this.playPauseIntervalId) {
          // user triggered event while ImageGallery is playing, reset interval
          this.pause(false);
          this.play(false);
        }
      }

      const slideCount = items.length - 1;
      let nextIndex = index;
      if (index < 0) {
        nextIndex = slideCount;
      } else if (index > slideCount) {
        nextIndex = 0;
      }

      if (onBeforeSlide && nextIndex !== currentIndex) {
        onBeforeSlide(nextIndex);
      }

      this.setState(
        {
          previousIndex: currentIndex,
          currentIndex: nextIndex,
          isTransitioning: nextIndex !== currentIndex,
          currentSlideOffset: 0,
          slideStyle: { transition: `all ${slideDuration}ms ease-out` }
        },
        this.onSliding
      );
    }
  }

  slideLeft = () => {
    const { isRTL } = this.props;
    this.slideTo(isRTL ? 'right' : 'left');
  };

  slideRight = () => {
    const { isRTL } = this.props;
    this.slideTo(isRTL ? 'left' : 'right');
  };

  slideTo(direction: 'left' | 'right') {
    const { currentIndex, currentSlideOffset, isTransitioning } = this.state;
    const { items } = this.props;
    const nextIndex = currentIndex + (direction === 'left' ? -1 : 1);

    if (isTransitioning) return;

    if (items.length === 2) {
      /*
        When there are only 2 slides fake a tiny swipe to get the slides
        on the correct side for transitioning
      */
      this.setState(
        {
          // this will reset once index changes
          currentSlideOffset:
            currentSlideOffset + (direction === 'left' ? 0.001 : -0.001),
          slideStyle: { transition: 'none' } // move the slide over instantly
        },
        () => {
          // add 25ms timeout to avoid delay in moving slides over
          window.setTimeout(() => this.slideToIndex(nextIndex, true), 25);
        }
      );
    } else {
      this.slideToIndex(nextIndex, true);
    }
  }

  handleThumbnailKeyUp(event: React.KeyboardEvent<HTMLElement>, index: number) {
    // eslint-disable-next-line
    // @ts-ignore:next-line
    const key = parseInt(event.keyCode || event.which || 0, 10);
    const ENTER_KEY_CODE = 66;
    const SPACE_BAR_KEY_CODE = 62;
    if (key === ENTER_KEY_CODE || key === SPACE_BAR_KEY_CODE)
      this.onThumbnailClick(event, index);
  }

  isThumbnailVertical() {
    const { thumbnailPosition } = this.props;
    return thumbnailPosition === 'left' || thumbnailPosition === 'right';
  }

  addScreenChangeEvent() {
    screenChangeEvents.forEach((eventName) => {
      document.addEventListener(eventName, this.handleScreenChange);
    });
  }

  removeScreenChangeEvent() {
    screenChangeEvents.forEach((eventName) => {
      document.removeEventListener(eventName, this.handleScreenChange);
    });
  }

  fullScreen() {
    const { useBrowserFullscreen } = this.props;
    const gallery = this.imageGallery.current!;
    if (useBrowserFullscreen) {
      if (gallery.requestFullscreen) {
        gallery.requestFullscreen();
      } else if (gallery.msRequestFullscreen) {
        gallery.msRequestFullscreen();
      } else if (gallery.mozRequestFullScreen) {
        gallery.mozRequestFullScreen();
      } else if (gallery.webkitRequestFullscreen) {
        gallery.webkitRequestFullscreen();
      } else {
        // fallback to fullscreen modal for unsupported browsers
        this.setModalFullscreen(true);
      }
    } else {
      this.setModalFullscreen(true);
    }
    this.setState({ isFullscreen: true });
  }

  exitFullScreen() {
    const { isFullscreen } = this.state;
    const { useBrowserFullscreen } = this.props;
    if (isFullscreen) {
      if (useBrowserFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else {
          // fallback to fullscreen modal for unsupported browsers
          this.setModalFullscreen(false);
        }
      } else {
        this.setModalFullscreen(false);
      }
      this.setState({ isFullscreen: false });
    }
  }

  pauseOrPlay = () => {
    const { infinite } = this.props;
    const { currentIndex } = this.state;
    if (!infinite && !this.canSlideRight()) {
      this.pause();
    } else {
      this.slideToIndex(currentIndex + 1);
    }
  };

  play(shouldCallOnPlay = true) {
    const { onPlay, slideInterval, slideDuration } = this.props;
    const { currentIndex } = this.state;
    if (!this.playPauseIntervalId) {
      this.setState({ isPlaying: true });
      this.playPauseIntervalId = window.setInterval(
        this.pauseOrPlay,
        Math.max(slideInterval!, slideDuration!)
      );
      if (onPlay && shouldCallOnPlay) {
        onPlay(currentIndex);
      }
    }
  }

  pause(shouldCallOnPause = true) {
    const { onPause } = this.props;
    const { currentIndex } = this.state;
    if (this.playPauseIntervalId) {
      window.clearInterval(this.playPauseIntervalId);
      this.playPauseIntervalId = null;
      this.setState({ isPlaying: false });
      if (onPause && shouldCallOnPause) {
        onPause(currentIndex);
      }
    }
  }

  isImageLoaded(item: ReactImageGalleryItem) {
    /*
      Keep track of images loaded so that onImageLoad prop is not
      called multiple times when re-render the images
    */
    const imageExists = this.loadedImages[item.original];
    if (imageExists) {
      return true;
    }
    // add image as loaded
    this.loadedImages[item.original] = true;
    return false;
  }

  handleImageLoaded = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    original: string
  ) => {
    const { onImageLoad } = this.props;
    const imageExists = this.loadedImages[original];
    if (!imageExists && onImageLoad) {
      this.loadedImages[original] = true; // prevent from call again
      // image just loaded, call onImageLoad
      onImageLoad(event);
    }
  };

  renderItem = (item: ReactImageGalleryItem) => {
    const { isFullscreen } = this.state;
    const { onImageError } = this.props;
    const handleImageError = onImageError || this.handleImageError;

    return (
      <GalleryItem
        description={item.description}
        fullscreen={item.fullscreen}
        handleImageLoaded={this.handleImageLoaded}
        isFullscreen={isFullscreen}
        onImageError={handleImageError}
        original={item.original}
        originalAlt={item.originalAlt}
        originalHeight={item.originalHeight}
        originalWidth={item.originalWidth}
        originalTitle={item.originalTitle}
        sizes={item.sizes}
        loading={item.loading}
        srcSet={item.srcSet}
      />
    );
  };

  renderThumbInner = (item: ReactImageGalleryItem) => {
    const { onThumbnailError } = this.props;
    const handleThumbnailError = onThumbnailError || this.handleImageError;

    return (
      <span className="image-gallery-thumbnail-inner">
        <img
          className="image-gallery-thumbnail-image"
          src={item.thumbnail}
          height={item.thumbnailHeight}
          width={item.thumbnailWidth}
          alt={item.thumbnailAlt}
          title={item.thumbnailTitle}
          loading={item.thumbnailLoading}
          onError={handleThumbnailError}
        />
        {item.thumbnailLabel && (
          <div className="image-gallery-thumbnail-label">
            {item.thumbnailLabel}
          </div>
        )}
      </span>
    );
  };

  render() {
    const { currentIndex, isFullscreen, modalFullscreen, isPlaying } =
      this.state;

    const {
      additionalClass,
      disableThumbnailSwipe,
      indexSeparator, // deprecate soon, and allow custom render
      isRTL,
      items,
      thumbnailPosition,
      renderFullscreenButton,
      renderCustomControls,
      renderLeftNav,
      renderRightNav,
      showBullets,
      showFullscreenButton,
      showIndex,
      showThumbnails,
      showNav,
      showPlayButton,
      renderPlayPauseButton,
      fullScreenSideBar
    } = this.props;

    const thumbnailStyle = this.getThumbnailStyle();
    const { slides, thumbnails, bullets } = this.getSlideItems();
    const slideWrapperClass = clsx(
      'image-gallery-slide-wrapper',
      thumbnailPosition,
      { 'image-gallery-rtl': isRTL }
    );

    const slideWrapper = (
      <div ref={this.imageGallerySlideWrapper} className={slideWrapperClass}>
        {renderCustomControls && renderCustomControls()}
        {this.canSlide() ? (
          <React.Fragment>
            {showNav && items.length > 1 && (
              <React.Fragment>
                {renderLeftNav!(this.slideLeft, !this.canSlideLeft())}
                {renderRightNav!(this.slideRight, !this.canSlideRight())}
              </React.Fragment>
            )}
            <SwipeWrapper
              className="image-gallery-swipe"
              delta={0}
              onSwiping={this.handleSwiping}
              onSwiped={this.handleOnSwiped}
            >
              <div className="image-gallery-slides">{slides}</div>
            </SwipeWrapper>
          </React.Fragment>
        ) : (
          <div className="image-gallery-slides">{slides}</div>
        )}
        {showPlayButton &&
          items.length > 1 &&
          renderPlayPauseButton!(this.togglePlay, isPlaying)}
        {showBullets && items.length > 1 && (
          <div className="image-gallery-bullets">
            <div
              className="image-gallery-bullets-container"
              role="navigation"
              aria-label="Bullet Navigation"
            >
              {bullets}
            </div>
          </div>
        )}

        {showFullscreenButton &&
          renderFullscreenButton!(this.toggleFullScreen, isFullscreen)}

        {showIndex && (
          <div className="image-gallery-index">
            <span className="image-gallery-index-current">
              {currentIndex + 1}
            </span>
            <span className="image-gallery-index-separator">
              {indexSeparator}
            </span>
            <span className="image-gallery-index-total">{items.length}</span>
          </div>
        )}
      </div>
    );

    const igClass = clsx('image-gallery', additionalClass, {
      'fullscreen-modal': modalFullscreen
    });

    const igContentClass = clsx('image-gallery-content', thumbnailPosition, {
      fullscreen: isFullscreen
    });

    const thumbnailWrapperClass = clsx(
      'image-gallery-thumbnails-wrapper',
      thumbnailPosition,
      { 'thumbnails-wrapper-rtl': !this.isThumbnailVertical() && isRTL },
      {
        'thumbnails-swipe-horizontal':
          !this.isThumbnailVertical() && !disableThumbnailSwipe
      },
      {
        'thumbnails-swipe-vertical':
          this.isThumbnailVertical() && !disableThumbnailSwipe
      }
    );

    return (
      <div ref={this.imageGallery} className={igClass} aria-live="polite">
        <ImageGalleryStyleContainer>
          <div className={clsx('wrapper', { fullscreen: isFullscreen })}>
            <div className={igContentClass}>
              {(thumbnailPosition === 'bottom' ||
                thumbnailPosition === 'right') &&
                slideWrapper}

              {showThumbnails && thumbnails.length > 1 ? (
                <SwipeWrapper
                  className={thumbnailWrapperClass}
                  delta={0}
                  onSwiping={
                    !disableThumbnailSwipe
                      ? this.handleThumbnailSwiping
                      : undefined
                  }
                  onSwiped={
                    !disableThumbnailSwipe
                      ? this.handleOnThumbnailSwiped
                      : undefined
                  }
                >
                  <div
                    className="image-gallery-thumbnails"
                    ref={this.thumbnailsWrapper}
                    style={this.getThumbnailBarHeight()}
                  >
                    <nav
                      ref={this.thumbnails}
                      className="image-gallery-thumbnails-container"
                      style={thumbnailStyle}
                      aria-label="Thumbnail Navigation"
                    >
                      {thumbnails}
                    </nav>
                  </div>
                </SwipeWrapper>
              ) : null}

              {(thumbnailPosition === 'top' || thumbnailPosition === 'left') &&
                slideWrapper}
            </div>{' '}
            {isFullscreen ? (
              <div className="sidebar">{fullScreenSideBar}</div>
            ) : null}
          </div>
        </ImageGalleryStyleContainer>
      </div>
    );
  }

  static defaultProps = {
    onErrorImageURL: '',
    additionalClass: '',
    showNav: true,
    autoPlay: false,
    lazyLoad: false,
    infinite: true,
    showIndex: false,
    showBullets: false,
    showThumbnails: true,
    showPlayButton: true,
    showFullscreenButton: true,
    disableThumbnailScroll: false,
    disableKeyDown: false,
    disableSwipe: false,
    disableThumbnailSwipe: false,
    useTranslate3D: true,
    isRTL: false,
    useBrowserFullscreen: true,
    flickThreshold: 0.4,
    stopPropagation: false,
    indexSeparator: ' / ',
    thumbnailPosition: 'bottom',
    startIndex: 0,
    slideDuration: 450,
    swipingTransitionDuration: 0,
    swipingThumbnailTransitionDuration: 0,
    onSlide: null,
    onBeforeSlide: null,
    onScreenChange: null,
    onPause: null,
    onPlay: null,
    onClick: null,
    onImageLoad: null,
    onImageError: null,
    onTouchMove: null,
    onTouchEnd: null,
    onTouchStart: null,
    onMouseLeave: null,
    onThumbnailError: null,
    onThumbnailClick: null,
    renderCustomControls: null,
    renderThumbInner: null,
    renderItem: null,
    slideInterval: 3000,
    swipeThreshold: 30,

    renderLeftNav: (
      onClick: React.MouseEventHandler<HTMLButtonElement>,
      disabled: boolean
    ) => <LeftNav onClick={onClick} disabled={disabled} />,

    renderRightNav: (
      onClick: React.MouseEventHandler<HTMLButtonElement>,
      disabled: boolean
    ) => <RightNav onClick={onClick} disabled={disabled} />,

    renderPlayPauseButton: (
      onClick: React.MouseEventHandler<HTMLButtonElement>,
      isPlaying: boolean
    ) => <PlayPause onClick={onClick} isPlaying={isPlaying} />,

    renderFullscreenButton: (
      onClick: React.MouseEventHandler<HTMLButtonElement>,
      isFullscreen: boolean
    ) => <Fullscreen onClick={onClick} isFullscreen={isFullscreen} />,
    useWindowKeyDown: true
  };
}
