import type { ThHTMLAttributes } from 'react'
import './index.css'

export interface Column {
  key: string;
  width: number;
  dataIndex: string;
  // 其他列属性...
}


export interface ResizableColumnProps {
  columns: Column[];
  minWidth?: number;
  maxWidth?: number,
}


export type ResizableHeaderCellProps = {
  onResize: (cellKey: string | number, width: number) => void;
  cellKey: string | number;
  triggerRender: number;
  width: number;
  minWidth: number;
  maxWidth: number;
} & ThHTMLAttributes<HTMLTableCellElement>