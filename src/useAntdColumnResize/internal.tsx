import { useState, useMemo, useCallback } from 'react';
import { INTERNAL_KEY } from './constant';
import useMergedState from './hooks/useMergedState';
import ResizableHeaderCell from './resizableHeaderCell';
import { ResizableColumnProps, Column } from './types';

const InternalResizableColumn = ({
  columns,
  minWidth = 120,
  maxWidth = 2000,
  defaultWidth = 120
}: ResizableColumnProps<Column>) => {

  const countTotalWidth = useCallback((columns: Column[]): number => {
    if (!Array.isArray(columns)) return 0;
    return columns?.reduce((pre, cur) => {
      const isLeaf = !Array.isArray(cur.children);
      const childrenWidth = Array.isArray(cur.children) ? countTotalWidth(cur.children) : 0;
      const columnWidth = cur?.width ?? Number(defaultWidth);
      const curWidth = isLeaf ? columnWidth : 0;
      if (isNaN(Number(curWidth))) {
        console.error(`Invalid column width: ${curWidth}`);
        return pre + childrenWidth;
      }
      return pre + childrenWidth + Number(curWidth);
    }, 0);
  }, [defaultWidth]);

  const [tableWidth, setTableWidth] = useState<number | false>(() => countTotalWidth(columns) || false);

  const handleResizableColumns = useCallback((key: string | number, interWidth: number) => {
    setResizableColumns((prev) => {
      return prev?.map((column) => {
        return updateResizableColumns(column, key, interWidth);
      });
    });
  }, []);

  function updateResizableColumns<T extends Column>(
    column: T,
    key: string | number,
    interWidth: number
  ): T {
    const cellKey = column[INTERNAL_KEY] || column.key;
    if (cellKey !== key && Array.isArray(column.children)) {
      column.children = column.children.map((item) => updateResizableColumns(item, key, interWidth));
    }
    const width = cellKey !== key ? column?.width : interWidth;
    if (width === column.width) return column;
    return {
      ...column,
      ...(cellKey === key && { width: interWidth }),
      onHeaderCell: () => ({
        minWidth,
        maxWidth,
        defaultWidth,
        width: width,
        cellKey: column[INTERNAL_KEY] || column.key,
        onResize: handleResizableColumns,
      }),
    };
  }


  function processColumns(columns: Column[]): Column[] {
    return columns?.map((column) => {
      if (typeof column !== 'object') return column;
      const { children } = column;
      if (Array.isArray(children)) {
        column.children = processColumns(children);
      }
      return {
        ...column,
        onHeaderCell: () => ({
          minWidth,
          maxWidth,
          defaultWidth,
          ...'width' in column && { width: column.width },
          cellKey: column[INTERNAL_KEY] || column.key,
          onResize: handleResizableColumns,
        }),
      };
    });
  }

  const initialColumns: Column[] = useMemo(() => {
    return processColumns(columns);
  }, [columns]);

  const [resizableColumns, setResizableColumns] = useMergedState<Column[]>(initialColumns, {
    onChange(value) {
      const allWidth = countTotalWidth(value);
      setTableWidth(allWidth);
    },
  });

  const resetColumns = useCallback(() => {
    setResizableColumns(initialColumns);
  }, [initialColumns]);

  const components = useMemo(() => {
    return {
      header: {
        cell: ResizableHeaderCell,
      },
    };
  }, []);

  return {
    resizableColumns,
    components,
    tableWidth,
    resetColumns
  };
};

export default InternalResizableColumn;
