import type { ThHTMLAttributes } from 'react';

type DataIndex = string | number | readonly (string | number)[];
export interface Column {
  key?: string | number | undefined;
  width?: string | number | undefined;
  dataIndex?: DataIndex | undefined;
  children?: Column[] | undefined;
  [key: string]: any;
}

export type resizeDataType<Column> = {
  columns: Column[];
  minWidth?: number;
  maxWidth?: number;
};

export interface ResizableColumnProps<Column> {
  setup: () => resizeDataType<Column>;
  dependencies: any[];
}

export type ResizableHeaderCellProps = {
  width: number;
  minWidth: number;
  maxWidth: number;
  cellKey: string | number;
  onResize: (cellKey: string | number, width: number) => void;
} & ThHTMLAttributes<HTMLTableCellElement>;

export type baseArgument = {
  handleResizableColumns: () => void;
} & Omit<resizeDataType<Column>, 'columns'>;
