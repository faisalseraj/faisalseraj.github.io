import { createRef, forwardRef, LegacyRef, useState } from 'react';
import { FaIdCard, FaShare } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { useIntl } from '@/utils/intl';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useBoolean,
  useToast
} from '@chakra-ui/react';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { routes } from '@/shared/routes';
import { useReport } from '@/shared/hooks/new/useReport';
import { deleteReport } from '@/shared/services/new/reports';

import { AlertModal } from '../AlertModal';

import { PrintIcon } from '../icons/PrintIcon';
import useReportPDTHTML from '../pages/Reports/ReportPDFHTML';
import { GridContainer } from '../GridContainer';

export const testSchema = yup.object({
  testName: yup.string().required(),
  category: yup.string().required(),
  normalRange: yup.string().required(),
  price: yup.number().required()
});

const AButton = (
  {
    buttonLabel,
    icon,
    onClick,
    loading,
    color = 'black',
    boxSize = '200px',
    commingSoon
  }: {
    buttonLabel: string;
    icon: React.ReactElement;
    onClick: () => void;
    loading: boolean;
    color: string;
    boxSize?: string;
    commingSoon?: boolean;
  },
  ref: any
) => {
  return (
    <Box position="relative">
      <Box position="absolute" right={1} top={1}>
        {commingSoon ? (
          <Badge variant={'solid'} bg="red.400" borderRadius={10}>
            Comming soon
          </Badge>
        ) : null}
      </Box>
      <Stack
        ref={ref}
        alignItems={'center'}
        justifyContent="center"
        boxSize={{ md: boxSize, base: '100%' }}
        minH={200}
        border="1px solid lightgray"
        borderRadius={12}
        _hover={{
          cursor: 'pointer',
          backgroundColor: commingSoon ? 'darkgray' : 'lightgray',
          border: '3px dashed ',
          borderColor: color
        }}
        onClick={
          !commingSoon
            ? onClick
            : () => {
                return;
              }
        }
      >
        {loading ? (
          <>
            <Skeleton width="54px" height={54} />
            <Skeleton width="100px" height={50} />
          </>
        ) : (
          <>
            {icon}
            <Text color={color}>{buttonLabel}</Text>
          </>
        )}
      </Stack>
    </Box>
  );
};
export const ActionButton = forwardRef(AButton);

export const ReportSuccesModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
}) => {
  const queryClient = useQueryClient();
  const { report, reportLoading } = useReport(props.id);
  const { push } = useRouter();
  const { isOpen, onClose } = props;
  const [isDeleteModal, toggleTestDeleteModal] = useBoolean();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const buttonRef: LegacyRef<HTMLButtonElement> = createRef();

  const toast = useToast();
  const onDelete = async () => {
    const response = await deleteReport(selectedIds);
    if (response) {
      toast({
        title: 'Report deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      toggleTestDeleteModal.off();
      onClose();
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'patientReports'
      });
    }
  };
  const { button } = useReportPDTHTML({
    report: report?.report,
    buttonRef,
    reportLoading,
    onReady: () => {
      buttonRef?.current?.click();
    }
  });
  const intl = useIntl();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={24} fontWeight={700}>
            Report Actions
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GridContainer>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
              mb={4}
            >
              <GridItem colSpan={1}>
                <ActionButton
                  boxSize="100%"
                  icon={
                    <PrintIcon width={54} height={54} color="brand.green" />
                  }
                  color="brand.green"
                  buttonLabel="Print this Report"
                  onClick={
                    () =>
                      window.open(
                        routes.lab.reports.print(report?.report?._id),
                        '_blank'
                      )
                    // push(routes.lab.reports.print(report?.report?._id!), {})
                  }
                  loading={reportLoading}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <ActionButton
                  boxSize="100%"
                  icon={
                    <PrintIcon width={54} height={54} color="brand.orange " />
                  }
                  color="brand.orange"
                  commingSoon
                  buttonLabel="Send in email"
                  onClick={
                    () =>
                      window.open(
                        routes.lab.reports.print(report?.report?._id),
                        '_blank'
                      )
                    // push(routes.lab.reports.print(report?.report?._id!), {})
                  }
                  loading={reportLoading}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <ActionButton
                  boxSize="100%"
                  icon={<DeleteIcon w={54} h={54} color="brand.red" />}
                  color="brand.red"
                  buttonLabel="Delete Report"
                  loading={reportLoading}
                  onClick={() => {
                    if (report?.report?._id) {
                      setSelectedIds([report?.report?._id]);
                      toggleTestDeleteModal.on();
                    }
                  }}
                />
              </GridItem>
              <GridItem>
                <ActionButton
                  boxSize="100%"
                  icon={<MdUpdate size={54} color="#16408B" />}
                  color="#16408B"
                  buttonLabel="Update Report"
                  loading={reportLoading}
                  onClick={() =>
                    push(routes.lab.reports.update(report?.report?._id))
                  }
                />
              </GridItem>
            </Grid>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
              rowGap={4}
            >
              <GridItem>{button}</GridItem>
              <GridItem colSpan={2}>
                <ActionButton
                  boxSize="100%"
                  icon={<FaIdCard size={54} />}
                  color="black"
                  buttonLabel="Generate new Report"
                  onClick={() => {
                    onClose();
                    push(routes.lab.reports.generate);
                  }}
                  loading={reportLoading}
                />
              </GridItem>
              <GridItem>
                <ActionButton
                  boxSize="100%"
                  icon={<FaShare size={54} color="#16408B" />}
                  color="brand.blue"
                  buttonLabel="Share through whatsapp"
                  onClick={() => {
                    return;
                  }}
                  commingSoon
                  loading={reportLoading}
                />
              </GridItem>
            </Grid>
          </GridContainer>
        </ModalBody>
        <AlertModal
          isOpen={isDeleteModal}
          onClose={toggleTestDeleteModal.off}
          onConfirm={onDelete}
          headerTitle={'Report Delete'}
          description={'Are you sure you want to delete this report?'}
          confirmText={intl.formatMessage({
            id: 'cta.remove'
          })}
        />

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
