import { LoadOptions } from 'react-select-async-paginate';
import { GroupBase } from 'react-select';
import { useQueryClient } from '@tanstack/react-query';
import { HStack, Text } from '@chakra-ui/react';

import { useCallback } from 'react';
import { useIntl } from '@/utils/intl';
import { getAllTests, Tests } from '@/shared/services/new/tests';
import { FieldProps } from '../fields/Field';
import { AsyncSelectField } from '../fields/AsyncSelectField';

export type TestOptionType = Pick<
  Tests & { id: string },
  'testName' | '_id' | 'category' | 'id'
>;

export const TestSelect = (
  props: FieldProps & { exeptFor?: { test: Tests & { id: string } }[] }
) => {
  const exceptForIds = props.exeptFor?.map(({ test }) => test?.id);
  const intl = useIntl();
  const queryClient = useQueryClient();
  const loadOptions: LoadOptions<
    TestOptionType,
    GroupBase<TestOptionType>,
    { nextPageKey?: string }
  > = useCallback(() => {
    return queryClient.fetchQuery(
      ['TestSelect'],
      async () => {
        const result = await getAllTests();

        const options =
          result?.data.map(
            ({ category, normalRange, price, testName, _id }) => ({
              category,
              normalRange,
              price,
              testName,
              id: _id
            })
          ) ?? result?.data;
        if (result !== null) {
          return {
            options: options,
            hasMore: false,
            additional: {
              nextPageKey: ''
            }
          };
        }

        return {
          options: [],
          hasMore: false
        };
      },
      {
        cacheTime: 20 * 60 * 1000,
        staleTime: Infinity
      }
    );
  }, [props, exceptForIds]);

  const placeholder =
    props.placeholder ??
    intl.formatMessage({
      id: 'types.report.testSelectPlaceholder'
    });

  const formatOptionLabel = useCallback((option: TestOptionType) => {
    return (
      <HStack spacing={2}>
        <Text>
          {option.testName} - {option.category}
        </Text>
      </HStack>
    );
  }, []);

  return (
    <>
      <AsyncSelectField<TestOptionType>
        {...props}
        placeholder={placeholder}
        loadOptions={loadOptions}
        formatOptionLabel={formatOptionLabel}
      />
    </>
  );
};
