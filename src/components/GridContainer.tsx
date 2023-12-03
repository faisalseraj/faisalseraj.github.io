import React, { useEffect, useRef } from 'react';
import {
  Container,
  ContainerProps,
  ScreenClassProvider
} from 'react-grid-system';
import debounce from 'lodash/debounce';

export const GridContainer = ({
  children,
  ...rest
}: Omit<ContainerProps, 'ref'>) => {
  const ignoreNextEvent = useRef(false);

  // Forces react-grid-system to recalculated the screen size after the component has successfully mounted
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  // Forces react-grid-system to recalculated the screen size after after the resize has settled.
  // This is because we were seeing side effects were the wrong screen size was sometimes used when the component
  // hadn't had time to re-render with a new width
  useEffect(() => {
    const handleWindowResized = () => {
      if (ignoreNextEvent.current) {
        ignoreNextEvent.current = false;
        return;
      }

      ignoreNextEvent.current = true;
      window.dispatchEvent(new Event('resize'));
    };
    const debounceHandler = debounce(handleWindowResized, 0.3, {
      leading: false,
      trailing: true
    });

    window.addEventListener('resize', debounceHandler, false);

    return () => {
      window.removeEventListener('resize', debounceHandler, false);
    };
  }, []);

  return (
    <ScreenClassProvider useOwnWidth>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} {...rest}>
        {children}
      </Container>
    </ScreenClassProvider>
  );
};
