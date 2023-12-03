import React, { useEffect, useRef, useState } from 'react';
import { Box, useDimensions, useTheme } from '@chakra-ui/react';

type MasonryProps = {
  columns: Record<number, number>;
  gutterSize?: number;
  children?: React.ReactNode;
};

export const Masonry = ({
  columns,
  gutterSize = 30,
  children
}: MasonryProps) => {
  const theme = useTheme();
  const elementRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(elementRef, true);
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const width = dimensions?.borderBox.width;

    const breakpoints = Object.keys(columns).sort();

    const foundIndex =
      width === undefined
        ? 0
        : breakpoints.findIndex((bpWidth) => width <= parseInt(bpWidth, 10));

    const breakpointIndex =
      foundIndex === -1 ? breakpoints.length - 1 : foundIndex - 1;

    const columnsForCurrentWidth =
      columns[parseInt(breakpoints[breakpointIndex], 10)];

    if (numColumns !== columnsForCurrentWidth)
      setNumColumns(columnsForCurrentWidth ?? 1);
  }, [columns, dimensions, numColumns, theme]);

  const items = React.Children.toArray(children);
  const childrenInColumns = new Array<typeof items>(numColumns);

  items.forEach((child, index) => {
    const columnIndex = index % numColumns;
    childrenInColumns[columnIndex] = childrenInColumns[columnIndex] ?? [];
    childrenInColumns[columnIndex].push(child);
  });

  return (
    <Box ref={elementRef} display="flex" marginLeft={-gutterSize}>
      {childrenInColumns.map((items, i) => (
        <Box
          key={i}
          paddingLeft={gutterSize}
          width={`${100 / childrenInColumns.length}%`}
        >
          {items}
        </Box>
      ))}
    </Box>
  );
};
