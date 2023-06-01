import type { ThHTMLAttributes } from 'react'
import './index.css'

export interface Column {
  key: string;
  width: number;
  dataIndex: string;
  children?: Column[];
  // 其他列属性...
}


export interface ResizableColumnProps {
  columns: Column[];
  minWidth?: number;
  maxWidth?: number,
  defaultWidth?: number;
}


export type ResizableHeaderCellProps = {
  onResize: (cellKey: string | number, width: number) => void;
  cellKey: string | number;
  triggerRender: number;
  width: number;
  minWidth: number;
  maxWidth: number;
  defaultWidth?: number;
} & ThHTMLAttributes<HTMLTableCellElement>