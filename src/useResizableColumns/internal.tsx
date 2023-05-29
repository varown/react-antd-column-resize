import React, { useState, useMemo, useEffect } from 'react';
import ResizableHeaderCell from './resizableHeaderCell';
import { ResizableColumnProps, Column } from './types';
import useMergedState from './hooks/useMergedState';
import usePrevious from './hooks/usePrevious';
import { isDeepEqualReact } from 'useResizableColumns/utils/isDeepEqualReact';
import { INTERNAL_KEY } from './constant';


const InternalResizableColumn = (props: ResizableColumnProps) => {
  const { columns, minWidth = 80, maxWidth = 1000 } = props;
  const preColumns = usePrevious(columns);

  const handleResizableColumns = (key: string | number, interWidth: number) => {
    setResizableColumns((prev) => {
      return prev.map((column) => {
        const cellKey = column[INTERNAL_KEY] || column.key
        if (cellKey === key) {
          return {
            ...column,
            width: interWidth,
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
          width: column.width,
          cellKey: column[INTERNAL_KEY] || column.key,
          onResize: handleResizableColumns,
        }),
      }
    })
  }, [columns])

  const [resizableColumns, setResizableColumns] = useMergedState<Column[]>(initialColumns, {
    onChange(value) {
      const allWidth = value.reduce((pre, cur) => pre + (cur.width || Number(minWidth)), 0);
      setTableWidth(allWidth);
    },
  });
  const [tableWidth, setTableWidth] = useState<number>(0);
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
