import { useCallback, useMemo, useRef, useState } from 'react';
import compact from 'lodash/compact';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  CloseButton,
  Flex,
  IconButton,
  Image,
  Spinner,
  Text,
  useBoolean,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { FormattedMessage, useIntl } from '@/utils/intl';

import { TranslatedError } from '@/components/TranslatedError';

import { AlertModal } from './AlertModal';

export const getFileMimeTypes = (filterTypes: string[] | undefined) => {
  if (!filterTypes) return '';
  return filterTypes.map((type) => `.${type.split('/')[1]} `);
};

export const MultiImageUploader = (props: {
  objectKeys: string[] | null;
  setObjectKeys: (objectKeys: string[]) => void;
  maxFileSize?: number;
  fileTypes?: string[];
  maxFileQuantity?: number;
}) => {
  const { setObjectKeys, objectKeys, maxFileSize, fileTypes, maxFileQuantity } =
    props;
  const [imagesLoading, setImagesLoading] = useState<number>(0);
  const [error, setError] = useState<React.ReactNode | null>(null);

  const [isOpen, setIsOpen] = useBoolean();
  const [selectedImage, setSelectedImage] = useState(0);
  const [fileName, setFileName] = useState('');
  const intl = useIntl();

  const validFormatsMessage = useMemo(() => {
    return intl.formatMessage(
      {
        id: 'components.imageUploader.validFileTypes'
      },
      { fileTypes: fileTypes!.join(', ') }
    );
  }, []);

  const onDrop = async (files: File[]) => {
    setError(null);
    if (
      (objectKeys?.length ?? 0) + files.length + imagesLoading >
      maxFileQuantity!
    ) {
      const error = intl.formatMessage(
        {
          id: 'components.imageUploader.maximumFileQuantity'
        },
        { max: maxFileQuantity }
      );

      console.log(error);
      setError(<TranslatedError err={error} />);
      return;
    }

    setImagesLoading((value) => value + files.length);
    const keys = await Promise.all(
      files.map(async (file) => {
        try {
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
            throw Error(validFormatsMessage);

          // const upload = await createUpload(file.type, file?.name);

          // if (upload) {
          //   return await new Promise<string>((resolve) => {
          //     const reader = new FileReader();
          //     reader.onload = async () => {
          //       await processUpload(upload, reader);
          //       resolve(upload.getUrl);
          //       setFileName(file?.name);
          //     };
          //     reader.readAsArrayBuffer(file);
          //   });
          // }
        } catch (err) {
          console.log(err);
          setError(<TranslatedError err={err} />);
        }
      })
    );

    setImagesLoading((value) => value - files.length);
    // setObjectKeys([...(objectKeys ?? []), ...(compact(keys) ?? [])]);
  };

  const onRemove = async () => {
    const newObjectKeys = [...(objectKeys || [])];
    newObjectKeys.splice(selectedImage, 1);
    setObjectKeys(newObjectKeys);
    setIsOpen.off();
    setFileName('');
  };

  const acceptableFormats = fileTypes?.reduce(
    (prev, next) => ({
      ...prev,
      [next]: []
    }),
    {}
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptableFormats,
    onDropRejected: () => {
      setError(<TranslatedError err={validFormatsMessage} />);
    }
  });
  console.log(getRootProps(), getInputProps(), 'getRootProps, getInputProps,');

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

  const onClose = useCallback(() => {
    setError(undefined);
  }, [error]);

  const inputFileRef: any = useRef(null);

  return (
    <Box width="100%">
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

      <Flex
        border={isDragActive ? '1px solid' : '1px dashed'}
        borderColor={isDragActive ? 'brand.yellow' : '#DFE4EE'}
        borderRadius="5px"
        bg={isDragActive ? '#f9dfb1' : '#F8F9FC'}
        align="center"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        p={[2, 12, 2, 12]}
        width="100%"
        {...getRootProps()}
        onClick={() => {
          inputFileRef?.current?.click();
        }}
      >
        <input {...getInputProps()} ref={inputFileRef} />

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
      <Text mt={2} fontSize={12} color="gray.500">
        <FormattedMessage
          id="components.imageUploader.acceptableFileFormats"
          values={{ formats: getFileMimeTypes(fileTypes) }}
        />
      </Text>

      <Wrap mt={8} spacing={5}>
        {objectKeys?.map((key: any, index: number) => (
          <VStack key={key}>
            <Box
              border="1px solid #DFE4EE"
              borderRadius="5px"
              backgroundColor="#F8F9FC"
              p="5"
              position="relative"
              key={key}
            >
              <Image maxH="128px" alt="Upload" src={key ?? ''} />
              <IconButton
                aria-label="remove image, button"
                icon={<CloseIcon />}
                position="absolute"
                top="-1.5"
                right="-1.5"
                bg="none"
                fontSize="10"
                _hover={{ bg: 'none' }}
                _focus={{ boxShadow: 'none' }}
                onClick={() => {
                  setSelectedImage(index);
                  setIsOpen.on();
                }}
              />
            </Box>
          </VStack>
        ))}
        {[...Array(imagesLoading)].map((e) => (
          <Center
            border="1px solid #DFE4EE"
            borderRadius="5px"
            backgroundColor="#F8F9FC"
            p="5"
            position="relative"
            key={e}
            width="150px"
          >
            <Spinner />
          </Center>
        ))}
      </Wrap>
      <Text mt={2} fontSize={12} color="gray.500">
        {fileName}
      </Text>

      {error ? (
        <Alert status="error" mt={5} justifyContent="space-between">
          <Flex>
            <AlertIcon />
            {error}
          </Flex>
          <CloseButton
            alignSelf="flex-end"
            position="relative"
            onClick={onClose}
          />
        </Alert>
      ) : null}
    </Box>
  );
};
