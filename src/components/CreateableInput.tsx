import {
  Box,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Wrap
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useSelf } from '@/shared/hooks/useSelf';

import { UserType } from '@/shared/types';
import { FieldProps } from './fields/Field';

export const CreatableInput = (
  props: FieldProps & {
    tags: string[] | null;
    setTags: (objectKeys: string[]) => void;
  }
) => {
  const { width, height, placeholder, isDisabled, tags, setTags } = props;

  const addTag = (text: string) => {
    if (text && !tags?.includes(text)) setTags([...(tags || []), text]);
  };

  const { self: user } = useSelf();

  const removeTag = (index: number) => {
    const newTags = [...(tags || [])];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTag(event.currentTarget.value);
      event.currentTarget.value = '';
    }
  };

  return (
    <Box width={width ?? '100%'}>
      <Input
        placeholder={placeholder}
        w="100%"
        h={height}
        isDisabled={isDisabled}
        onKeyUp={handleSubmit}
        onKeyPress={(event) => {
          if (event.key === 'Enter') event.preventDefault();
        }}
      />

      <Wrap mt={3}>
        {tags?.map((tag, index) => (
          <Tag
            key={tag}
            variant="solid"
            colorScheme="blue"
            height="9"
            fontSize="sm"
            lineHeight="1"
            borderRadius="6px"
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(index)} />
          </Tag>
        ))}
      </Wrap>
    </Box>
  );
};
