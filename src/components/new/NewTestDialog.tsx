import { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { QueryObserverResult, useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from '@/utils/intl';

import { Tests } from '@/shared/services/new/tests';
import { TextField } from '../fields/TextField';
import { TranslatedError } from '../TranslatedError';
import { SelectField } from '../fields/SelectField';

export const CategoryOptions = [
  'HAEMOTOLOGY',
  'DLC',
  'BIO-CHEMISTRY',
  'SEROLOGY',
  'BRUCELLA TEST',
  'WIDAL TEST',
  'TYPHIDOT',
  'URINE COMPLETE',
  'MICROSCOPY'
];

export const testSchema = yup.object({
  testName: yup.string().required(),
  category: yup.string().required(),
  normalRange: yup.string(),
  price: yup.number().required(),
  _id: yup.string()
});

export const NewTestDialog = (props: {
  isOpen: boolean;
  onClose: () => void;
  addTest: (
    data: Partial<Tests & { ranges: string[] }>
  ) => Promise<Tests | null>;
  defaultValues: Partial<Tests>;
}) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, addTest, defaultValues } = props;
  const intl = useIntl();

  const form = useForm({
    resolver: yupResolver(testSchema),
    defaultValues
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = async () => {
    try {
      await addTest(form.getValues());
      form.reset();
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === 'TestSelect' ||
          queryKey[0] === 'adminTests' ||
          queryKey[0] === 'tests'
      });
      onClose();
    } catch (err) {
      console.log(err);
      setError(<TranslatedError err={err} />);
    }
  };

  const [error, setError] = useState<React.ReactNode | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              <FormattedMessage id="types.tests.addTest" />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TextField
                name="testName"
                label={intl.formatMessage({
                  id: 'types.tests.name'
                })}
                info={'Name of the test, it should be unique'}
              />
              <SelectField
                name="category"
                label={intl.formatMessage({
                  id: 'types.tests.category'
                })}
                options={CategoryOptions.map((item) => ({
                  value: item,
                  text: item
                }))}
              />
              <TextField
                name="normalRange"
                label={intl.formatMessage({
                  id: 'types.tests.range'
                })}
                info={
                  'This value will be printed on report as normal range/ normal value'
                }
              />
              <TextField
                name="price"
                label={intl.formatMessage({
                  id: 'types.tests.price'
                })}
                info={'Price is use to calculate the sum of all the tests'}
              />
              {error ? (
                <Alert status="error" mt={5}>
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
            </ModalBody>

            <ModalFooter>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                width="100%"
                spacing={5}
              >
                <Button
                  width="100%"
                  variant="lg-secondary-black"
                  onClick={onClose}
                  isLoading={form.formState.isSubmitting}
                >
                  <FormattedMessage id="cta.cancel" />
                </Button>
                <Button
                  width="100%"
                  type="submit"
                  variant="lg-primary"
                  isLoading={form.formState.isSubmitting}
                >
                  {defaultValues?._id ? (
                    <FormattedMessage id="types.tests.updateTest" />
                  ) : (
                    <FormattedMessage id="types.tests.addTest" />
                  )}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};
