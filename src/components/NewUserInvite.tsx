import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Stack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Col, Row } from 'react-grid-system';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from '@/utils/intl';
import { SelectField } from '@/components/fields/SelectField';

import { User, UserType } from '@/shared/types';
import { TextField } from './fields/TextField';
import { TranslatedError } from './TranslatedError';

export type props = {
  addJudge: (data: Partial<User>) => Promise<void>;
};

export const NewUserInvite: React.FC<props> = (props) => {
  const router = useRouter();
  const { addJudge } = props;
  const onClose = () => router.back();
  const intl = useIntl();
  const schema = yup.object({
    type: yup.string().required(),
    email: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    region: yup.object().when('type', {
      is: UserType.PartnerAdmin,
      then: yup.object().required()
    })
  });

  const form = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async () => {
    try {
      await addJudge(form.getValues());
      form.reset();
    } catch (err) {
      console.log(err);
      setError(<TranslatedError err={err} />);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const userType = form.watch('type');
  const [error, setError] = useState<React.ReactNode | null>(null);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <SelectField
              name="type"
              label={intl.formatMessage({
                id: 'form.userType'
              })}
              options={[
                { value: UserType.AllianceAdmin, text: 'Alliance Admin' },
                { value: UserType.PartnerAdmin, text: 'Partner Admin' }
              ]}
            />
          </Col>

          <Col
            md={12}
            style={{
              marginBottom: 24,
              paddingLeft: 16,
              paddingRight: 16
            }}
          >
            <Divider />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              name="firstName"
              label={intl.formatMessage({
                id: 'form.firstNameLabel'
              })}
            />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              name="lastName"
              label={intl.formatMessage({
                id: 'form.lastNameLabel'
              })}
            />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              name="email"
              label={intl.formatMessage({
                id: 'cta.emailAddress'
              })}
            />
          </Col>
          {/* <Col md={6} xs={12}>
            <PhoneField
              name="phone"
              label={intl.formatMessage({
                id: 'educator.signUpForm.phoneLabel'
              })}
              placeholder={intl.formatMessage({
                id: 'educator.signUpForm.phonePlaceholder'
              })}
              width="100%"
            />
          </Col> */}
        </Row>
        <Box
          width={{
            base: '100%',
            md: '70%'
          }}
          margin="auto"
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justifyContent={'center'}
            width={'100%'}
            spacing={5}
          >
            <Button
              variant="lg-secondary-black"
              onClick={onClose}
              isLoading={form.formState.isSubmitting}
            >
              <FormattedMessage id="cta.cancel" />
            </Button>
            <Button
              type="submit"
              variant="lg-primary"
              isLoading={form.formState.isSubmitting}
            >
              <FormattedMessage id="allianceAdmin.menu.invite" />
            </Button>
          </Stack>
        </Box>
        {error ? (
          <Alert status="error" mt={5}>
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
      </form>
    </FormProvider>
  );
};
