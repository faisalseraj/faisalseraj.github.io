import { useCallback, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useBoolean
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { TranslatedError } from '@/components/TranslatedError';

import { FormattedMessage, useIntl } from '@/utils/intl';

import { AlertModal } from './AlertModal';

export type UploadKeyObject = {
  key?: string;
  url?: string;
};

export const ImageUploader = (props: {
  objectKey: string | null;
  setObjectKey: (objectKey: string) => void;
  maxFileSize?: number;
  fileTypes?: string[];
  showTypes?: boolean;
  height?: number | string;
  info?: string;
}) => {
  const {
    setObjectKey,
    objectKey,
    maxFileSize,
    fileTypes,
    showTypes = true,
    height = 'auto',
    info = undefined
  } = props;
  const [error, setError] = useState<React.ReactNode | null>(null);

  const [isOpen, setIsOpen] = useBoolean();

  const intl = useIntl();

  const onDrop = async (files: File[]) => {
    const file = files[0];
    setError(null);

    try {
      // const upload = await createUpload(file.type, file.name);

      if (maxFileSize && file.size / (1024 * 1024) > maxFileSize)
        throw Error(
          intl.formatMessage(
            {
              id: 'components.imageUploader.maximumFileSize'
            },
            { max: maxFileSize }
          )
        );

      if (fileTypes && !fileTypes.includes(file.type))
        throw Error(
          intl.formatMessage(
            {
              id: 'components.imageUploader.validFileTypes'
            },
            { fileTypes: fileTypes.join(', ') }
          )
        );

      // if (upload) {
      //   const reader = new FileReader();
      //   reader.onload = async () => {
      //     await processUpload(upload, reader);
      //     setObjectKey(upload.getUrl);
      //   };
      //   reader.readAsArrayBuffer(file);
      // }
    } catch (err) {
      console.log(err);
      setError(<TranslatedError err={err} />);
    }
  };

  const onRemove = async () => {
    setObjectKey('');
    setIsOpen.off();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const link = useCallback(
    (str: any) => (
      <Text
        as="span"
        cursor="pointer"
        textDecoration="underline"
        color="#0F3E8C"
      >
        {str}
      </Text>
    ),
    []
  );

  return (
    <>
      <Flex w="100%">
        <AlertModal
          isOpen={isOpen}
          onClose={setIsOpen.off}
          onConfirm={onRemove}
          headerTitle={intl.formatMessage({
            id: 'components.imageUploader.removeImageTitle'
          })}
          description={intl.formatMessage({
            id: 'components.imageUploader.removeImageInfo'
          })}
          confirmText={intl.formatMessage({
            id: 'cta.remove'
          })}
        />
        {Boolean(objectKey) ? (
          <Box
            border="1px solid #DFE4EE"
            borderRadius="5px"
            backgroundColor="#F8F9FC"
            mr="5"
            p="5"
            position="relative"
          >
            {/* <Image maxH="100px" alt="Upload" src={objectUrl(objectKey ?? '')} /> */}
            <IconButton
              aria-label="remove image, button"
              icon={<CloseIcon />}
              position="absolute"
              top="0"
              right="0"
              bg="none"
              fontSize="xs"
              _hover={{ bg: 'none' }}
              _focus={{ boxShadow: 'none' }}
              onClick={setIsOpen.on}
            />
          </Box>
        ) : null}

        <Flex
          border="1px dashed #DFE4EE"
          borderRadius="5px"
          backgroundColor="#F8F9FC"
          align="center"
          {...getRootProps()}
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          p={[2, 12, 2, 12]}
          w="100%"
          height={height}
        >
          <input {...getInputProps()} />
          <FiUpload />
          <Text ml={1}>
            <FormattedMessage
              id="components.imageUploader.instructions"
              values={{
                link
              }}
            />
          </Text>
        </Flex>
        {showTypes ? (
          <Text mt={2} fontSize={12} color="gray.500">
            <FormattedMessage id="components.imageUploader.validFileFormatsUpdated" />
          </Text>
        ) : null}
      </Flex>

      {error ? (
        <Alert status="error" mt={5}>
          <AlertIcon />
          {error}
        </Alert>
      ) : null}
    </>
  );
};
