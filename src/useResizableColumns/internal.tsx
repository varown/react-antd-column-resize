import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './index.scss'

const InternalResizableColumn = (props) => {
  const { columns: initialColumns } = props;

  const [columns, setColumns] = useState(initialColumns || []);

  const handleResize = (index, newWidth) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[index] = {
        ...updatedColumns[index],
        width: newWidth,
      };
      return updatedColumns;
    });
  };

  const ResizableHeaderCell = (props) => {
    const { width, onResize, ...restProps } = props;

    if (!width) {
      return <th {...restProps} />;
    }

    return (
      <Resizable
        width={width}
        height={0}
        handle={<div
          className='resizable-handler'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className='resizable-line' />
        </div>}
        draggableOpts={{ enableUserSelectHack: false }}
        onResize={onResize}
      >
        <th {...restProps} />
      </Resizable>
    );
  };

  const resizableColumns = columns.map((column, index) => ({
    ...column,
    onHeaderCell: () => ({
      width: column.width,
      onResize: (event, { size }) => handleResize(index, size.width),
      cell: ResizableHeaderCell,
    }),
  }));

  return {
    columns: resizableColumns,
    ResizableHeaderCell,
  };
};

export default InternalResizableColumn;
