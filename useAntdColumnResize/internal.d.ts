/// <reference types="react" />
import { ResizableColumnProps, Column } from './types';
declare const InternalResizableColumn: ({ columns: propsColumns, minWidth, maxWidth, defaultWidth }: ResizableColumnProps<Column>) => {
    resizableColumns: Column[];
    components: {
        header: {
            cell: import("react").MemoExoticComponent<(props: import("./types").ResizableHeaderCellProps) => JSX.Element>;
        };
    };
    tableWidth: number | false;
    resetColumns: () => void;
};
export default InternalResizableColumn;
