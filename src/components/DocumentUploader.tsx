import { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { TranslatedError } from '@/components/TranslatedError';
import { Upload } from '@/shared/types';
import { FormattedMessage } from '@/utils/intl';
import { LoadingIndicator } from './LoadingIndicator';

export const DocumentUploader = (props: {
  upload: Upload | null;
  setUpload: (upload: Upload) => void;
}) => {
  const { upload, setUpload } = props;
  const [fileName, setFileName] = useState<string>();
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useFormContext();

  useEffect(() => {
    const values = form.getValues();
    if (values.title && values.upload) {
      setFileName(
        (name) =>
          name || `${values.title}.${values.upload.contentType.split('/')[1]}`
      );
    }
  }, [form]);

  useEffect(() => {
    setIsLoading(false);
  }, [upload?.key]);

  const onDrop = async (files: File[]) => {
    const file = files[0];
    setError(null);

    try {
      setIsLoading(true);
      // const upload = await createUpload(file.type, file.name);
      // if (upload) {
      //   const reader = new FileReader();
      //   reader.onload = async () => {
      //     await processUpload(upload, reader);
      //     setUpload(upload);
      //   };
      //   reader.readAsArrayBuffer(file);
      //   setFileName(file.name);
      // }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(<TranslatedError err={err} />);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const fileType = upload?.contentType.split('/')[0];

  const renderImage = () => {
    const isImage = upload?.key && fileType === 'image';
    if (isLoading) return <LoadingIndicator />;
    else {
      if (isImage)
        return (
          <Box
            border="1px solid #DFE4EE"
            borderRadius="5px"
            backgroundColor="#F8F9FC"
            mr="10"
            p="5"
            position="relative"
          >
            {/* <Image
              maxW="100px"
              maxH="100px"
              alt="Upload"
              src={objectUrl(upload?.key)}
            /> */}
          </Box>
        );
    }
  };
  return (
    <Flex display={'flex'} flexWrap={'wrap'} width={'100%'}>
      <div style={{ width: '100%' }}>
        <Flex width={'100%'} mb={2}>
          <Flex
            border="1px dashed #DFE4EE"
            borderRadius="5px"
            backgroundColor="#F8F9FC"
            // width={'100%'}
            style={{ width: '100%' }}
            align="center"
            {...getRootProps()}
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            p={[2, 8, 2, 8]}
          >
            <input {...getInputProps()} />
            <FiUpload />
            <Text ml={1}>
              <FormattedMessage
                id="components.imageUploader.instructions"
                values={{
                  link: (str) => (
                    <Text
                      as="span"
                      cursor="pointer"
                      textDecoration="underline"
                      color="#0F3E8C"
                    >
                      {str}
                    </Text>
                  )
                }}
              />
            </Text>
          </Flex>
        </Flex>

        {error ? (
          <Alert status="error" mt={5}>
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
      </div>
      <Flex mt={3}>
        {renderImage()}
        {/* 
        {fileType !== 'image' && (
          <Link
            textDecoration="underline"
            color="#0F3E8C"
            href={objectUrl(upload?.key)}
            target="_blank"
          >
            {fileName}
          </Link>
        )} */}
      </Flex>
    </Flex>
  );
};
