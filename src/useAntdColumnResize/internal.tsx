import { useMemo } from 'react';
import useColumns from './hooks/useColumns';
import ResizableHeaderCell from './resizableHeaderCell';
import { Column, resizeDataType } from './types';

const InternalResizableColumn = (
  dataFunc: () => resizeDataType<Column>,
  dependencies: any[],
) => {
  const propsData = useMemo<resizeDataType<Column>>(() => {
    return dataFunc?.() ?? {};
  }, dependencies);
  const { resizableColumns, tableWidth, resetColumns } = useColumns(propsData);
  const components = useMemo(() => {
    return {
      header: {
        cell: ResizableHeaderCell,
      },
    };
  }, [propsData]);

  return { resizableColumns, components, tableWidth, resetColumns };
};

export default InternalResizableColumn;
