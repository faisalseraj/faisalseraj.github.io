import '@/whyDidYouRender';
import 'focus-visible/dist/focus-visible';
import '@/styles.css';

// 1. Import controllers, elements, etc. which you'll use
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import React, { useEffect } from 'react';
import { YupProvider, flattenMessages } from '@/utils/intl';

import type { AppProps } from 'next/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChakraProvider } from '@chakra-ui/react';
import { IntlProvider } from 'react-intl';
import { PageComponent } from '@/components/pages/PageComponent';
import { ParallaxProvider } from 'react-scroll-parallax';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import enMessages from '@/translations/en.json';
import { theme } from '@/theme';

// 2. Register them
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

// I8n setup

const locales = {
  en: flattenMessages(enMessages)
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
});

type MyAppProps = AppProps & {
  Component: PageComponent<unknown>;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage
  });

  return (
    <React.StrictMode>
      <ParallaxProvider>
        <IntlProvider locale="en" messages={locales.en}>
          <ChakraProvider theme={theme} resetCSS>
            <YupProvider>
              <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{ persister: asyncStoragePersister }}
              >
                {getLayout(<Component {...pageProps} />)}
              </PersistQueryClientProvider>
            </YupProvider>
          </ChakraProvider>
        </IntlProvider>
      </ParallaxProvider>
    </React.StrictMode>
  );
}

export default MyApp;
