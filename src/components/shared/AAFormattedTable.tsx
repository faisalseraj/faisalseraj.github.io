import React, { useCallback } from 'react';
import {
  Box,
  Checkbox,
  HStack,
  Table,
  TableCellProps,
  TableColumnHeaderProps,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react';
import without from 'lodash/without';
import isObjectLike from 'lodash/isObjectLike';
import classnames from 'classnames';
import has from 'lodash/has';

import { get, Path } from '@/utils/objectUtils';

export type FormattedRow<T> = {
  row: T;
  statusColor?: string;
  disabled?: boolean;
  expandedView?: React.ReactNode;
};

export type FormattedNode = {
  node: React.ReactNode;
  tdProps: TableCellProps;
};

export type TableNode = React.ReactNode | FormattedNode;
export type TableNodes = Array<TableNode>;

export type FormattedHeading = {
  heading: React.ReactNode;
  thProps: TableColumnHeaderProps;
};

export type TableHeading = React.ReactNode | FormattedHeading;
export type TableHeadings = Array<TableHeading>;

const isFormattedRow = <T,>(row: unknown): row is FormattedRow<T> =>
  isObjectLike(row) && has(row, 'row');

const isFormattedHeading = (heading: unknown): heading is FormattedHeading =>
  isObjectLike(heading) && has(heading, 'heading') && has(heading, 'thProps');

const isFormattedNode = (node: unknown): node is FormattedNode =>
  isObjectLike(node) && has(node, 'node') && has(node, 'tdProps');

export type AAFormattedTableProps<T> = {
  idPath: Path<T>;
  rows: Array<FormattedRow<T> | T>;
  headings: Array<FormattedHeading | React.ReactNode>;
  getRowNodes: (row: T) => TableNodes;
  striped?: boolean;
  expandableRows?: boolean;
  hasRowIndicator?: boolean;
  selectedIds?: string[];
  setSelectedIds?: (ids: string[]) => void;
} & Omit<TableProps, 'variant'>;

export const AAFormattedTable = <T,>({
  idPath,
  rows,
  headings,
  expandableRows,
  striped,
  getRowNodes,
  selectedIds,
  setSelectedIds,

  ...tableProps
}: AAFormattedTableProps<T>) => {
  const ids = selectedIds ?? [];

  const rowFor = (r: FormattedRow<T> | T): T =>
    isFormattedRow<T>(r) ? r.row : r;
  const allIds = rows.map((r) => get(rowFor(r), idPath) as unknown as string);

  const allSelected = ids.length === allIds.length;

  const toggleAll = useCallback(() => {
    if (allSelected) setSelectedIds!([]);
    else setSelectedIds!(allIds);
  }, []);

  const toggle = (id: string) => () => {
    if (ids.includes(id)) setSelectedIds!(without(ids!, id));
    else setSelectedIds!([...ids, id]);
  };

  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  return (
    <Box overflowX="auto">
      <Table
        overflowX="auto"
        className={classnames({
          striped
        })}
        {...tableProps}
      >
        {platform === 'mobile' ? null : (
          <Thead
            className={classnames({
              striped
            })}
            border="1px solid #DEE3ED"
          >
            <Tr>
              {setSelectedIds !== undefined ? (
                <>
                  <Th px={1}>
                    <Checkbox
                      isChecked={allSelected}
                      onChange={toggleAll}
                      ml="5px"
                    />
                  </Th>
                </>
              ) : null}

              {headings.map((heading, i) => {
                const formattedHeading = isFormattedHeading(heading)
                  ? heading
                  : undefined;
                const tdProps = formattedHeading?.thProps ?? {};
                const headingNode = isFormattedHeading(heading)
                  ? heading.heading
                  : heading;
                return (
                  <Th
                    textTransform={'capitalize'}
                    key={`${i}${headingNode}`}
                    color="gray"
                    px={8}
                    pr={0}
                    border="1px solid #DEE3ED"
                    {...tdProps}
                  >
                    {headingNode}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
        )}

        <Tbody
          className={classnames({
            striped
          })}
          mt="10px"
        >
          {rows.map((r, i) => {
            const formattedRow = isFormattedRow<T>(r) ? r : undefined;
            const row = isFormattedRow<T>(r) ? r.row : r;
            const statusColor = formattedRow?.statusColor;
            const disabled = formattedRow?.disabled;
            const expandedView = formattedRow?.expandedView;
            return (
              <React.Fragment key={get(row, idPath) as string}>
                {platform === 'mobile' ? (
                  <>
                    <Tr
                      borderLeft="4px"
                      borderColor={statusColor}
                      className={classnames({
                        expanded: expandedView !== undefined,
                        even: !disabled && striped && i % 2 === 0,
                        odd: !disabled && striped && i % 2 === 1,
                        disabled: disabled,
                        first: i === 0,
                        last:
                          i === rows.length - 1 && expandedView === undefined
                      })}
                    >
                      <Td px={1}>
                        {getRowNodes(row).map((n, i) => {
                          const node = isFormattedNode(n) ? n.node : n;
                          const tdProps = isFormattedNode(n) ? n.tdProps : {};

                          const heading = headings[i];
                          const headingNode = isFormattedHeading(heading)
                            ? heading.heading
                            : heading;

                          return (
                            <HStack
                              key={i}
                              pl={3}
                              pr={3}
                              position="relative"
                              overflow="hidden"
                              display={'flex'}
                              columnGap={1}
                              {...tdProps}
                              sx={{ border: '0px' }}
                            >
                              <HStack>
                                <VStack>
                                  <Text
                                    fontSize={`${14 / 16}rem`}
                                    fontWeight={500}
                                    color="#5E636E"
                                  >
                                    {headingNode ? headingNode : ''}
                                  </Text>
                                  <Text
                                    fontSize={`${14 / 16}rem`}
                                    fontWeight={500}
                                    color="#5E636E"
                                  >
                                    {node}
                                  </Text>
                                </VStack>
                              </HStack>
                            </HStack>
                          );
                        })}
                      </Td>
                    </Tr>
                  </>
                ) : (
                  <Tr
                    borderLeft={statusColor === 'transparent' ? '1px' : '4px'}
                    borderColor={statusColor}
                    className={classnames({
                      expanded: expandedView !== undefined,
                      even: !disabled && striped && i % 2 === 0,
                      odd: !disabled && striped && i % 2 === 1,
                      first: i === 0,
                      disabled: disabled,
                      last: i === rows.length - 1 && expandedView === undefined
                    })}
                  >
                    {setSelectedIds !== undefined ? (
                      <Td px={1}>
                        <Checkbox
                          isChecked={selectedIds?.includes(
                            get(rowFor(r), idPath) as string
                          )}
                          onChange={toggle(get(rowFor(r), idPath) as string)}
                          ml="5px"
                        />
                      </Td>
                    ) : null}

                    {getRowNodes(row).map((n, i) => {
                      const node = isFormattedNode(n) ? n.node : n;
                      const tdProps = isFormattedNode(n) ? n.tdProps : {};

                      return (
                        <Td
                          key={i}
                          pl={3}
                          pr={3}
                          position="relative"
                          overflow="hidden"
                          fontSize={`1rem`}
                          {...tdProps}
                        >
                          <>{node}</>
                        </Td>
                      );
                    })}
                  </Tr>
                )}

                {expandableRows ? (
                  <Tr
                    borderLeft="4px"
                    borderColor={statusColor}
                    className={classnames('expandedView', {
                      even: striped && i % 2 === 0,
                      odd: striped && i % 2 === 1,
                      last: i === rows.length - 1 && expandedView !== undefined
                    })}
                  >
                    <Td
                      pl={statusColor ? '18px' : 3}
                      pr={3}
                      colSpan={Number.MAX_SAFE_INTEGER}
                      position="relative"
                      overflow="hidden"
                      display={
                        expandedView === undefined ? 'none' : 'table-cell'
                      }
                    >
                      {expandedView}
                    </Td>
                  </Tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>

      {/* <Pagination /> */}
    </Box>
  );
};
