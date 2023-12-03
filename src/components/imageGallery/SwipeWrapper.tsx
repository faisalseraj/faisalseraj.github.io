import React from 'react';

import { SwipeCallback, useSwipeable } from 'react-swipeable';

type SwipeWrapperProps = {
  children: React.ReactNode;
  className?: string;
  delta?: number;
  onSwiping?: SwipeCallback;
  onSwiped?: SwipeCallback;
};

export const SwipeWrapper = ({
  children,
  className,
  delta = 0,
  onSwiping,
  onSwiped
}: SwipeWrapperProps) => {
  const swipeHandlers = useSwipeable({
    delta,
    onSwiping,
    onSwiped
  });
  return (
    <div {...swipeHandlers} className={className}>
      {children}
    </div>
  );
};
