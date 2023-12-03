import { useRouter } from 'next/router';

import { User } from '@/shared/types';
import { routes } from '@/shared/routes';
import { login } from '../services';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();
  const [token, setToken] = useState<string | null>('');

  const checkAuth = async () => {
    const tk = await localStorage.getItem('token');
    queryClient.invalidateQueries(['self']);

    setToken(tk);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  const showToast = () =>
    toast({
      title: 'User not found',
      status: 'error',
      duration: 3000,
      isClosable: true
    });

  const redirectToHome = (user?: User) => {
    router.push(routes.lab.dashboard);
  };

  const signIn = async (email: string, password: string) => {
    const user = await login({ email, password });
    if (!user?.token) {
      showToast();
    } else {
      queryClient.invalidateQueries();
      localStorage.setItem('token', user.token);
      redirectToHome();
    }
  };

  return { signIn, redirectToHome, token, setToken };
};
