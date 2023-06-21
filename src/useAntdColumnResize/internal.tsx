import { useState, useMemo, useCallback } from 'react';
import { INTERNAL_KEY } from './constant';
import useMergedState from './hooks/useMergedState';
import ResizableHeaderCell from './resizableHeaderCell';
import { ResizableColumnProps, Column } from './types';

const InternalResizableColumn = (props: ResizableColumnProps<Column>) => {

  const { columns: propsColumns, minWidth = 120, maxWidth = 2000, defaultWidth = 120 } = props;


  const countTotalWidth = useCallback((columns: Column[]): number => {
    if (!Array.isArray(columns)) return 0;
    const calculateWidth = (column: Column): number => {
      const children = column?.children;
      const isLeaf = !Array.isArray(children);
      const childrenWidth = Array.isArray(children) ? countTotalWidth(children) : 0;
      const columnWidth = column?.width ?? Number(defaultWidth);
      const curWidth = isLeaf ? columnWidth : 0;
      if (isNaN(Number(curWidth))) {
        console.error(`Invalid column width: ${curWidth}`);
        return childrenWidth;
      }
      return childrenWidth + Number(curWidth);
    }
    return columns?.reduce((pre, cur) => pre + calculateWidth(cur), 0);
  }, [defaultWidth]);



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
  const initialColumns: Column[] = useMemo(() => processColumns(propsColumns), [propsColumns]);
  const [cachedResizableColumns] = useMergedState<Column[]>(initialColumns, {});
  const [resizableColumns, setResizableColumns] = useState(cachedResizableColumns);
  
  const tableWidth = useMemo(() => countTotalWidth(resizableColumns), [resizableColumns]);

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


  if (propsColumns.every((column) => 'width' in column)) {
    console.warn('All columns have a width property, so the column will not be resizable');
    return {
      resizableColumns: propsColumns,
      components: {},
      tableWidth: false,
      resetColumns: () => { },
    };
  };


  return {
    resizableColumns,
    components,
    tableWidth,
    resetColumns
  };
};

export default InternalResizableColumn;
