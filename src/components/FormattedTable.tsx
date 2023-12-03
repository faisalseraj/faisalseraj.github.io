import React from 'react';
import {
  Box,
  Checkbox,
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
  useBreakpointValue
} from '@chakra-ui/react';
import without from 'lodash/without';
import isObjectLike from 'lodash/isObjectLike';
import classnames from 'classnames';
import has from 'lodash/has';

import { get, Path } from '@/utils/objectUtils';
import Pagination from './shared/Pagination'; //leaving unused bcz we will need it later

export type FormattedRow<T> = {
  row: T;
  statusColor?: string;
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

export type FormattedTableProps<T> = {
  idPath: Path<T>;
  rows: Array<FormattedRow<T> | T>;
  headings: Array<FormattedHeading | React.ReactNode>;
  getRowNodes: (row: T) => TableNodes;
  striped?: boolean;
  expandableRows?: boolean;

  selectedIds?: string[];
  setSelectedIds?: (ids: string[]) => void;
} & Omit<TableProps, 'variant'>;

export const FormattedTable = <T,>({
  idPath,
  rows,
  headings,
  expandableRows,
  striped,
  getRowNodes,
  selectedIds,
  setSelectedIds,
  ...tableProps
}: FormattedTableProps<T>) => {
  const ids = selectedIds ?? [];

  const rowFor = (r: FormattedRow<T> | T): T =>
    isFormattedRow<T>(r) ? r.row : r;

  const allIds = rows.map((r) => get(rowFor(r), idPath) as unknown as string);

  const allSelected = ids.length === allIds.length;

  const toggleAll = () => {
    if (allSelected) setSelectedIds!([]);
    else setSelectedIds!(allIds);
  };

  const toggle = (id: string) => () => {
    if (ids.includes(id)) setSelectedIds!(without(ids!, id));
    else setSelectedIds!([...ids, id]);
  };

  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  return (
    <Box overflowX="auto" width="100%">
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
          >
            <Tr>
              {setSelectedIds !== undefined ? (
                <Th px={1}>
                  <Checkbox isChecked={allSelected} onChange={toggleAll} />
                </Th>
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
                    px={3}
                    pr={0}
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
        >
          {rows.map((r, i) => {
            const formattedRow = isFormattedRow<T>(r) ? r : undefined;
            const row = isFormattedRow<T>(r) ? r.row : r;
            const statusColor = formattedRow?.statusColor;
            const expandedView = formattedRow?.expandedView;

            return (
              <React.Fragment key={get(row, idPath) as string}>
                {platform === 'mobile' ? (
                  <>
                    <Tr>
                      {setSelectedIds !== undefined ? (
                        <Td px={1}>
                          <Checkbox
                            isChecked={selectedIds?.includes(
                              get(rowFor(r), idPath) as string
                            )}
                            onChange={toggle(get(rowFor(r), idPath) as string)}
                          />
                        </Td>
                      ) : null}
                    </Tr>

                    {getRowNodes(row).map((n, i) => {
                      const node = isFormattedNode(n) ? n.node : n;
                      const tdProps = isFormattedNode(n) ? n.tdProps : {};
                      const withStatusIndicator =
                        i === 0 && statusColor !== undefined;
                      const heading = headings[i];
                      const headingNode = isFormattedHeading(heading)
                        ? heading.heading
                        : heading;
                      return (
                        <Tr key={i}>
                          <Td
                            pl={withStatusIndicator ? '18px' : 3}
                            pr={3}
                            position="relative"
                            overflow="hidden"
                            display={'flex'}
                            columnGap={1}
                            {...tdProps}
                            sx={{ border: '0px' }}
                          >
                            <Text
                              fontWeight={500}
                              color="#5E636E"
                              flexDirection={'row'}
                            >
                              {headingNode} {headingNode ? ': ' : null}
                            </Text>
                            <>
                              {withStatusIndicator ? (
                                <Box
                                  width="6px"
                                  height="100%"
                                  bgColor={statusColor}
                                  position="absolute"
                                  left={0}
                                  top={0}
                                />
                              ) : null}
                              {node}
                            </>
                          </Td>
                        </Tr>
                      );
                    })}
                    <Box sx={{ borderWidth: 1 }} />
                  </>
                ) : (
                  <Tr
                    className={classnames({
                      expanded: expandedView !== undefined,
                      even: striped && i % 2 === 0,
                      odd: striped && i % 2 === 1,
                      first: i === 0,
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
                        />
                      </Td>
                    ) : null}

                    {getRowNodes(row).map((n, i) => {
                      const node = isFormattedNode(n) ? n.node : n;
                      const tdProps = isFormattedNode(n) ? n.tdProps : {};
                      const withStatusIndicator =
                        i === 0 && statusColor !== undefined;
                      return (
                        <Td
                          key={i}
                          pl={withStatusIndicator ? '18px' : 3}
                          pr={3}
                          position="relative"
                          overflow="hidden"
                          {...tdProps}
                        >
                          <>
                            {withStatusIndicator ? (
                              <Box
                                width="6px"
                                height="100%"
                                bgColor={statusColor}
                                position="absolute"
                                left={0}
                                top={0}
                              />
                            ) : null}
                            {node}
                          </>
                        </Td>
                      );
                    })}
                  </Tr>
                )}

                {expandableRows ? (
                  <Tr
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
                      <>
                        {statusColor ? (
                          <Box
                            width="6px"
                            height="100%"
                            bgColor={statusColor}
                            position="absolute"
                            left={0}
                            top={0}
                          />
                        ) : null}
                        {expandedView}
                      </>
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
