import { useState, useMemo } from 'react';
import ResizableHeaderCell from './resizableHeaderCell';
import { ResizableColumnProps, Column } from './types';
import useMergedState from './hooks/useMergedState';
import { INTERNAL_KEY } from './constant';


const InternalResizableColumn = (props: ResizableColumnProps) => {

  const { columns, minWidth = 120, maxWidth = 2000, defaultWidth = 120 } = props;

  if (columns.every((column) => 'width' in column)) {
    return {
      resizableColumns: columns,
      components: {},
      tableWidth: false,
    };
  };

  const [tableWidth, setTableWidth] = useState<number | boolean>(0);

  const handleResizableColumns = (key: string | number, interWidth: number) => {
    setResizableColumns((prev) => {
      return prev.map((column) => {
        const cellKey = column[INTERNAL_KEY] || column.key
        if (cellKey === key) {
          return {
            ...column,
            width: interWidth,
            onHeaderCell: () => ({
              minWidth,
              maxWidth,
              defaultWidth,
              width: interWidth,
              cellKey: column[INTERNAL_KEY] || column.key,
              onResize: handleResizableColumns,
            }),
          }
        }
        return column;
      })
    });
  };

  const initialColumns = useMemo(() => {
    return columns?.map((column) => {
      return {
        ...column,
        onHeaderCell: () => ({
          minWidth,
          maxWidth,
          defaultWidth,
          width: column.width,
          cellKey: column[INTERNAL_KEY] || column.key,
          onResize: handleResizableColumns,
        }),
      }
    })
  }, [columns])

  const [resizableColumns, setResizableColumns] = useMergedState<Column[]>(initialColumns, {
    onChange(value) {
      const allWidth = Array.isArray(value) && value?.reduce((pre, cur) => pre + (cur.width || Number(minWidth)), 0) || false;
      setTableWidth(allWidth);
    },
  });

  const components = useMemo(() => {
    return {
      header: {
        cell: ResizableHeaderCell,
      },
    }
  }, []);

  return {
    resizableColumns,
    components,
    tableWidth,
  };
};

export default InternalResizableColumn;
