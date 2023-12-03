import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { useBoolean } from '@chakra-ui/react';

import { AlertModal } from '@/components/AlertModal';

import { useIntl } from '@/utils/intl';

// Next JS doesn't officially support intercepting route changes, there are very long
// threads with discussions and workarounds - this solution is the based on the
// best one that I've found (TA)
//
// https://github.com/vercel/next.js/issues/2476#issuecomment-926127255

export const WarnIfUnsavedModal = () => {
  const intl = useIntl();
  const { formState } = useFormContext();
  const urlRequested = useRef<string | null>(null);
  const [isOpen, setIsOpen] = useBoolean();
  const router = useRouter();

  const lastHistoryState = useRef<{ idx: number }>(global.history?.state);

  useEffect(() => {
    const storeLastHistoryState = () => {
      lastHistoryState.current = history.state;
    };

    router.events.on('routeChangeComplete', storeLastHistoryState);
    storeLastHistoryState();

    return () => {
      router.events.off('routeChangeComplete', storeLastHistoryState);
    };
  }, [router]);

  const killRouterEvent = useCallback(() => {
    router.events.emit('routeChangeError');

    // We revert the router's URL change. This is hacky since `idx` is not documented
    // We use it to determine in which direction to travel in the history
    const state = lastHistoryState.current;

    if (
      state !== null &&
      history.state !== null &&
      state.idx !== history.state.idx
    ) {
      history.go(lastHistoryState.current.idx < history.state.idx ? -1 : 1);
    }

    // Throwing an actual error class trips the Next.JS 500 Page, this string literal does not.
    throw 'Abort route change. Please ignore this error.';
  }, [router]);

  useEffect(() => {
    const routeChangeStart = (url: string): void => {
      if (formState.isDirty && !isOpen) {
        urlRequested.current = url;
        setIsOpen.on();

        killRouterEvent();
      }
    };

    // This handles navigating closing the tab etc.
    // It's impossible to use a custom modal here, the browser will display it's own dialog.
    const beforeUnload = (e: BeforeUnloadEvent): string | null => {
      if (formState.isDirty && urlRequested.current === null) {
        const event = e ?? window.event;
        event.returnValue = 'Unsaved';
        return 'Unsaved';
      }

      return null;
    };

    router.events.on('routeChangeStart', routeChangeStart);
    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [formState.isDirty, killRouterEvent, router, isOpen, setIsOpen]);

  const onCompleteChange = () => {
    if (urlRequested.current != null) {
      router.push(urlRequested.current).then(() => {
        setIsOpen.off();
      });
    }
  };

  const onCancel = () => {
    urlRequested.current = null;
    setIsOpen.off();
  };

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={onCancel}
      onConfirm={onCompleteChange}
      headerTitle={intl.formatMessage({
        id: 'form.unsavedTitle'
      })}
      description={intl.formatMessage({
        id: 'form.unsavedDescription'
      })}
      confirmText={intl.formatMessage({
        id: 'form.unsavedConfirm'
      })}
    />
  );
};
