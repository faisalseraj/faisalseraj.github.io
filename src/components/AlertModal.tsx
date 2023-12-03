import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

import { FormattedMessage } from '@/utils/intl';

export const AlertModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  headerTitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  isLoading?: boolean;
  confirmText: string;
}) => {
  const {
    isOpen,
    onClose,
    onConfirm,
    headerTitle,
    description,
    confirmText,
    isLoading
  } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {headerTitle !== undefined ? (
            <AlertDialogHeader>{headerTitle}</AlertDialogHeader>
          ) : null}

          {description !== undefined ? (
            <AlertDialogBody>{description}</AlertDialogBody>
          ) : null}

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              <FormattedMessage id="cta.cancel" />
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirm}
              ml={3}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
