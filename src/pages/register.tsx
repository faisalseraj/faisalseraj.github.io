import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useBoolean,
  VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useQueryClient } from '@tanstack/react-query';
import { PageComponent } from '@/components/pages/PageComponent';
import { BasicLayout } from '@/components/layouts/BasicLayout';
import { StudentIcon } from '@/components/icons/StudentIcon';
import { EducatorIcon } from '@/components/icons/EducatorIcon';

import { useSignIn } from '@/shared/hooks/useSignIn';
import { TextField } from '@/components/fields/TextField';
import { TranslatedError } from '@/components/TranslatedError';
import { SplitSection } from '@/components/SplitSection';
import { routes } from '@/shared/routes';
import { FormattedMessage, useIntl } from '@/utils/intl';
import { AuthenticatedLayout } from '@/components/layouts/AuthenticatedLayout';
import { User, UserType } from '@/shared/types';
import { useRegisterNewUser } from '@/shared/hooks/useRegisterNewUser';

const schema = yup.object({
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  contact: yup.string().required().label('Contact No.'),
  email: yup.string().required().label('Email'),
  password: yup.string().required().label('Password'),
  role: yup.string().required().label('Role'),
  country: yup.string().required().label('Country'),
  province: yup.string().required().label('Province'),
  city: yup.string().required().label('City'),
  address: yup.string().required().label('Address')
});

const Register: PageComponent<void> = () => {
  const intl = useIntl();

  const { registerNewUser } = useRegisterNewUser();

  const form = useForm<Partial<User>>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'admin',
      city: 'Swat',
      province: 'Kpk',
      country: 'Pakistan'
    }
  });
  const [error, setError] = useState<React.ReactNode | null>(null);

  const onSubmit = async () => {
    setError(null);
    debugger;
    try {
      const data = form.getValues();
      await registerNewUser(data);
      form.reset({});
    } catch (err) {
      console.log(err);
      setError(<TranslatedError err={err} />);
    }
  };

  return (
    <Box pt={4} maxW={1200} mx="auto">
      <SplitSection
        headerComponent={
          <Image
            src="/images/logo-white.svg"
            alt="Lab Management Logo"
            cursor="pointer"
          />
        }
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <VStack spacing={5} align="stretch" width="100%">
              <Heading>User Registration</Heading>
              <HStack alignItems="flex-start">
                <TextField
                  name="firstName"
                  label={'First Name'}
                  placeholder={'Enter the First name of the user'}
                />
                <TextField
                  name="lastName"
                  label={'Last Name'}
                  placeholder={'Enter the Last name of the user'}
                />
              </HStack>

              <HStack alignItems="flex-start">
                <TextField
                  name="email"
                  label={intl.formatMessage({ id: 'form.emailLabel' })}
                  placeholder={intl.formatMessage({ id: 'form.emailLabel' })}
                />

                <TextField
                  name="password"
                  type="password"
                  label={intl.formatMessage({ id: 'form.passwordLabel' })}
                  placeholder={intl.formatMessage({ id: 'form.passwordLabel' })}
                />
              </HStack>

              <HStack alignItems="flex-start">
                <TextField
                  name="contact"
                  label={'Contact Number'}
                  placeholder={'Enter the Contact number of the user'}
                />
                <TextField name="role" label="Role of the user" readonly />
              </HStack>

              <HStack alignItems="flex-start">
                <TextField
                  name="address"
                  label={'User Address'}
                  placeholder={'Enter the full address of the user'}
                />
                <TextField
                  name="city"
                  readonly
                  label={'City Name'}
                  placeholder={'Which city the user belongs to?'}
                />
              </HStack>
              <HStack alignItems="flex-start">
                <TextField
                  readonly
                  name="province"
                  label={'Province'}
                  placeholder={'Which city the user belongs to?'}
                />
                <TextField
                  name="country"
                  label={'Country'}
                  readonly
                  placeholder={'Which city the user belongs to?'}
                />
              </HStack>

              <Box mt={5} />

              <Button
                maxW={'100%'}
                height={'64px'}
                type="submit"
                variant="lg-primary"
                isLoading={form.formState.isSubmitting}
              >
                Create User
              </Button>

              {error ? (
                <Alert status="error" mt={5}>
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
            </VStack>
          </form>
        </FormProvider>
      </SplitSection>

      {/* <ForgotPasswordDialog
        isOpen={isForgetPasswordOpen}
        onClose={toggleForgetPasswordOpen.off}
      /> */}
    </Box>
  );
};

Register.getLayout = (page) => (
  <AuthenticatedLayout
    layoutComponent={BasicLayout}
    userTypes={[UserType.SuperAdmin]}
  >
    {page}
  </AuthenticatedLayout>
);

export default Register;
