import { User } from '@/shared/types';
import { register } from '../services';
import { useToast } from '@chakra-ui/react';

export const useRegisterNewUser = () => {
  const toast = useToast();

  const showSuccessToast = () =>
    toast({
      title: 'user created Succesfully',
      status: 'success',
      duration: 3000,
      isClosable: true
    });

  const showErrorToast = () =>
    toast({
      title: 'Some thing went wrong while create new user',
      status: 'error',
      duration: 3000,
      isClosable: true
    });

  const registerNewUser = async (user: Partial<User>) => {
    const createdUser = await register(user);
    if (createdUser) {
      showSuccessToast();
    } else {
      showErrorToast();
    }
  };

  return { registerNewUser };
};
