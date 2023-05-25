
export interface Column {
  key: string;
  width: number;
  dataIndex: string;
  // 其他列属性...
}


export interface ResizableColumnProps {
  columns: Column[];
  minWidth?: string | number;
  maxWidth?: string | number,
}