import React, { useState, useMemo, memo } from 'react';
import { Resizable } from 'react-resizable';
import type { ResizeCallbackData, } from 'react-resizable'
import useMergedState from './hooks/useMergedState';
import { ResizableColumnProps, Column } from './types';
import { INTERNAL_KEY } from './constant';
import './index.scss';

const ResizableHeaderCell: React.FC<{ width: number }> = (props) => {
  const {
    width,
    minWidth,
    maxWidth,
    cellKey,
    onResize: onResizeCallback,
    children,
    onClick,
    rowSpan,
    style,
    colSpan,
    title,
    scope,
    className,
    ...restProps
  } = props as any;

  const [interWidth, setInterWidth] = useMergedState(width, {
    onChange: (value) => {
      console.log('interWidth', value);
    }
  });

  if (!interWidth) {
    return <th {...restProps} />;
  }

  const setBodyStyle = (active: boolean) => {
    document.body.style.userSelect = active ? 'none' : ''
    document.body.style.pointerEvents = active ? 'none' : ''
    document.documentElement.style.cursor = active ? 'col-resize' : ''
  }

  const onResizeStart = (_, data: ResizeCallbackData) => {
    setBodyStyle(true);
    setInterWidth(data?.size?.width);
  };

  const onResize = (_, data: ResizeCallbackData) => {
    const nowWidth = data?.size?.width;
    setInterWidth(nowWidth);

  };

  const onResizeStop = (_, { node }: { node: HTMLElement }) => {
    setBodyStyle(false);
    onResizeCallback && onResizeCallback(cellKey, interWidth);
  };

  return (
    <th
      scope={scope}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={onClick}
      data-arh-enable='true'
      className={`resizable-container ${className}`}
      style={{
        ...style,
        overflow: 'unset',
      }}
    >
      <Resizable
        width={interWidth}
        height={0}
        // minConstraints={[minWidth, 0]}
        // maxConstraints={[maxWidth, 0]}
        className='resizable-box'
        handle={
          <div
            className='resizable-handler'
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
        <div style={{ width: interWidth, height: '100%' }} ></div>
      </Resizable>
      <div {...restProps} className='resizable-title'>
        <span title={title}>{children}</span>
      </div>
    </th>

  );
};

export default ResizableHeaderCell;

