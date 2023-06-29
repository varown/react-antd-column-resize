import { useMemo, useState, useCallback } from 'react';
import { Column, resizeDataType } from '../types';
import { INTERNAL_KEY } from '../constant';

const useColumns = ({
  columns,
  minWidth = 120,
  maxWidth = 2000,
}: resizeDataType<Column>) => {

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
    return resizableColumns?.reduce((sum, column) => sum + calculateWidth(column), 0)
  }, [resizableColumns, calculateWidth]);


  const handleResizableColumns = useCallback((key: string | number, interWidth: number) => {
    setResizableColumns((prev) => prev?.map((column) => updateResizableColumns(column, key, interWidth)));
  }, []);


  const initColumns = useCallback((columns: Column[]): Column[] => {
    return columns?.map((column) => {
      if (typeof column !== 'object') return column;
      const { children } = column;
      if (Array.isArray(children)) {
        column.children = initColumns(children);
      }
      return {
        ...column,
        onHeaderCell: () => ({
          minWidth,
          maxWidth,
          ...'width' in column && { width: column.width },
          cellKey: column[INTERNAL_KEY] || column.key,
          onResize: handleResizableColumns,
        }),
      };
    });
  }, [minWidth, maxWidth, handleResizableColumns])

  const createColumns = (resizableColumns: Column[], initialColumns: Column[]): Column[] => {
    if (resizableColumns === initialColumns || !resizableColumns || !resizableColumns.length) {
      return initialColumns;
    }

    const columnMap = new Map<string | number, number>();

    const traverseColumns = (columns: Column[]) => {
      for (const column of columns) {
        const key = column[INTERNAL_KEY] as string | number | undefined || column.key;

        if (key && column?.width) {
          columnMap.set(key, Number(column?.width));
        }

        if (Array.isArray(column.children)) {
          traverseColumns(column.children);
        }
      }
    };

    traverseColumns(resizableColumns);

    const updateColumn = (column: Column): Column => {
      const key = column[INTERNAL_KEY] as string | number | undefined || column.key;

      if (key && columnMap.has(key)) {
        const width = columnMap.get(key);

        return {
          ...column,
          width,
          onHeaderCell: () => ({
            minWidth,
            maxWidth,
            ...(width && { width }),
            cellKey: key,
            onResize: handleResizableColumns,
          }),
        };
      }

      if (Array.isArray(column.children)) {
        return {
          ...column,
          children: column.children.map(updateColumn),
        };
      }

      return column;
    };
    const updatedColumns: Column[] = initialColumns.map(updateColumn);


    return updatedColumns;
  };

  const initialColumns: Column[] = useMemo(() => {
    const initResizableColumns = initColumns(columns)
    setResizableColumns(createColumns(resizableColumns, initResizableColumns));
    return initResizableColumns;
  }, [columns, initColumns]);


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





  const resetColumns = useCallback(() => {
    setResizableColumns(initialColumns);
  }, [initialColumns]);


  return { resizableColumns, tableWidth, resetColumns };
};

export default useColumns;
