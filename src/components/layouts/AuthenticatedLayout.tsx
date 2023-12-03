import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import isNil from 'lodash/isNil';
import { PageSpinner } from '@/components/PageSpinner';
import { UserType } from '@/shared/types';
import { useSelf } from '@/shared/hooks/useSelf';
import { useSignIn } from '@/shared/hooks/useSignIn';

type AuthenticatedLayoutProps<P extends Record<string, unknown>> = {
  layoutComponent: React.FC<P>;
  componentProps?: P;
  userTypes?: UserType[];
  children?: React.ReactNode;
};

type AuthResponse = {
  signInUserSession?: {
    accessToken?: {
      payload?: {
        'cognito:groups'?: string[];
      };
    };
  };
};

export const AuthenticatedLayout = <P extends Record<string, unknown>>({
  layoutComponent,
  componentProps,
  userTypes,
  children
}: AuthenticatedLayoutProps<P>) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const { selfLoading: userLoading, self: user } = useSelf();
  const { token } = useSignIn();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // This stops server-side generated pages from getting any further
    return null;
  }

  if (userLoading || user === undefined) return <PageSpinner />;

  // If at this point we have a user, then we're logged in.  It not then we can't access the component,
  // and we redirect

  if (isNil(user) || !token) {
    router.push({
      pathname: '/sign-in',
      query: { r: router.pathname }
    });

    return null;
  }

  // We check that the role associated with this layout is appropriate

  // if (userTypes !== undefined) {
  //   redirectToHome(user);
  //   return null;
  // }

  return React.createElement<P>(layoutComponent, componentProps, children);
};
