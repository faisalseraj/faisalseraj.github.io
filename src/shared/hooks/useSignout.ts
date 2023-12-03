import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { routes } from '../routes';

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const signOut = async () => {
    localStorage.clear();
    queryClient.invalidateQueries();
    queryClient.removeQueries(['self']);
    queryClient.removeQueries(['hasAlreadyBeenShown']);
    push(routes.app.signIn);
  };

  return { signOut };
};
