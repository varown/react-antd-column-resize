import { useRef, useMemo, useState, useCallback } from 'react';
import { Column, resizeDataType } from '../types';
import { INTERNAL_KEY } from '../constant';

const useColumns = ({ columns, minWidth = 120, maxWidth = 2000, }: resizeDataType<Column>) => {

  const columnMap = useRef(new Map<string | number, number>()).current;

  const [resizableColumns, setResizableColumns] = useState<Column[]>([]);

  const calculateWidth = useCallback((column: Column): number => {
    const isLeaf = Array.isArray(column?.children);
    let totalWidth = isLeaf ? 0 : Number((column?.width ?? Number(minWidth + 15)));
    if (isLeaf) {
      totalWidth = + (column?.children as [])?.reduce((sum, child) => sum + calculateWidth(child), 0);
    }
    return totalWidth;
  }, [minWidth])

  const tableWidth = useMemo(() => {
    return resizableColumns?.reduce((sum, column) => sum + calculateWidth(column), 34)
  }, [resizableColumns, calculateWidth]);


  const handleResizableColumns = useCallback((key: string | number, interWidth: number) => {
    columnMap.set(key, interWidth);
    setResizableColumns((prev) => prev?.map((column) => updateResizableColumns(column, key, interWidth)));
  }, []);


  const initColumns = useCallback((columns: Column[]): Column[] => {
    return columns?.map((column, index: number) => {
      if (typeof column !== 'object') return column;
      const { children } = column;
      if (Array.isArray(children)) {
        column.children = initColumns(children);
      }
      const deviationWidth: number = index % 2 === 0 ? 1 : -1;
      const width = column?.width ? Number(column?.width) + deviationWidth : column?.width;
      return {
        ...column,
        ...'width' in column && { width },
        onHeaderCell: () => ({
          minWidth,
          maxWidth,
          ...'width' in column && { width: width },
          cellKey: column[INTERNAL_KEY] || column.key,
          onResize: handleResizableColumns,
        }),
      };
    });
  }, [minWidth, maxWidth, handleResizableColumns])

  const updateResizableColumns = useCallback(<T extends Column>(
    column: T,
    key: string | number,
    interWidth: number
  ): T => {
    if (typeof column !== 'object' || key == undefined) return column;
    const cellKey = column[INTERNAL_KEY] || column?.key;
    const isTarget = cellKey === key;
    const width = isTarget ? interWidth : column?.width;
    if (isTarget && width === column.width) return column;
    if (!isTarget && Array.isArray(column.children)) {
      column.children = column.children.map((item) => updateResizableColumns(item, key, interWidth));
    }
    return {
      ...column,
      ...(isTarget && { width }),
      onHeaderCell: () => ({
        minWidth,
        maxWidth,
        width,
        cellKey,
        onResize: handleResizableColumns,
      }),
    };
  }, [minWidth, maxWidth, handleResizableColumns])

  const mergedColumns = (resizableColumns: Column[], initialColumns: Column[]): Column[] => {
    if (resizableColumns === initialColumns || !resizableColumns || !resizableColumns.length) {
      return initialColumns;
    }
    return initialColumns.map((item) => {
      const key = item[INTERNAL_KEY] as string | number | undefined || item.key;
      if (key && columnMap.has(key)) {
        const width = columnMap.get(key)
        return updateResizableColumns(item, key, Number(width))
      }
      return item
    });

  };



  const initialColumns: Column[] = useMemo(() => {
    const initResizableColumns = initColumns(columns)
    setResizableColumns(mergedColumns(resizableColumns, initResizableColumns));
    return initResizableColumns;
  }, [columns, initColumns]);


  const resetColumns = useCallback(() => {
    columnMap.clear();
    setResizableColumns(initialColumns);
  }, [initialColumns]);


  return { resizableColumns, tableWidth, resetColumns };
};

export default useColumns;
