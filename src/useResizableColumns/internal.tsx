import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import { ResizableColumnProps, Column } from './types';
import 'react-resizable/css/styles.css';
import './index.scss';



const InternalResizableColumn = (props: ResizableColumnProps) => {
  const { columns: initialColumns } = props;

  const [columns, setColumns] = useState<Column[]>(initialColumns || []);

  const handleResize = (index: number, newWidth: number) => {
    console.log('handleResize', index, newWidth);
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[index] = {
        ...updatedColumns[index],
        width: newWidth,
      };
      return updatedColumns;
    });
  };

  const onResizeStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, { node }: { node: HTMLElement }) => {
    // 拖动开始时的处理逻辑
    console.log('onResizeStart', event, node);
  };

  const onResize = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, { node, size }: { node: HTMLElement; size: { width: number, height: number } }) => {
    // 拖动中的处理逻辑，例如实时更新列宽
    console.log('onResize', event, node, size);
  };

  const onResizeStop = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, { node }: { node: HTMLElement }) => {
    // 拖动结束时的处理逻辑
    console.log('onResizeStop', event, node);
  };

  const ResizableHeaderCell: React.FC<{ width: number }> = (props) => {
    const { width, ...restProps } = props;

    if (!width) {
      return <th {...restProps} />;
    }

    return (
      //@ts-ignore
      <Resizable
        width={width}
        height={0}
        handle={
          <div
            className='resizable-handle'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className='resizable-line' />
          </div>
        }
        draggableOpts={{ enableUserSelectHack: false }}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      >
        <th {...restProps} />
      </Resizable>
    );
  };

  const resizableColumns = columns.map((column, index) => ({
    ...column,
    onHeaderCell: () => ({
      width: column.width,
      onResize: (e: any, { size }: { size: { width: number } }) => handleResize(index, size.width),
      cell: ResizableHeaderCell,
    }),
  }));

  return {
    columns: resizableColumns,
    ResizableHeaderCell,
  };
};

export default InternalResizableColumn;
