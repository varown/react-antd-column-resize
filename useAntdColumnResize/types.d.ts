import type { ThHTMLAttributes } from 'react';
declare type DataIndex = string | number | readonly (string | number)[];
export interface Column {
    key?: string | number | undefined;
    width?: string | number | undefined;
    dataIndex?: DataIndex | undefined;
    children?: Column[] | undefined;
}
export interface ResizableColumnProps<Column> {
    columns: Column[];
    minWidth?: number;
    maxWidth?: number;
    defaultWidth?: number;
}
export declare type ResizableHeaderCellProps = {
    width: number;
    minWidth: number;
    maxWidth: number;
    defaultWidth: number;
    cellKey: string | number;
    onResize: (cellKey: string | number, width: number) => void;
} & ThHTMLAttributes<HTMLTableCellElement>;
export {};
