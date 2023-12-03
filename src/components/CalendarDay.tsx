import { Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

type CalendarDayProps = {
  date: Date;
  size?: number;
};

export const CalendarDay = ({ date, size = 100 }: CalendarDayProps) => {
  return (
    <Flex
      width={`${size}px`}
      height={`${size}px`}
      minWidth={`${size}px`}
      borderRadius="12%"
      overflow="hidden"
      direction="column"
      boxShadow={`0 ${size * 0.04}px ${size * 0.13}px rgba(143, 150, 163, 0.4)`}
    >
      <Flex
        bgColor="error"
        width="100%"
        height="30%"
        color="white"
        justifyContent="center"
        alignItems="center"
        fontWeight={500}
        fontSize={`${size * 0.15}px`}
      >
        {format(date, 'MMMM')}
      </Flex>

      <Flex
        justifyContent="center"
        alignItems="center"
        direction="column"
        flexGrow={1}
      >
        <Text fontWeight={700} fontSize={`${size * 0.4}px`} lineHeight={1}>
          {format(date, 'dd')}
        </Text>
        <Text fontSize={`${size * 0.16}px`} color="brand.mediumGrey">
          {format(date, 'yyyy')}
        </Text>
      </Flex>
    </Flex>
  );
};
