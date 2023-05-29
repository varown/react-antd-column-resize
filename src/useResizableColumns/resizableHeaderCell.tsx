import React, { useState, useMemo, memo } from 'react';
import { Resizable } from 'react-resizable';
import type { ResizeCallbackData, } from 'react-resizable'
import useMergedState from './hooks/useMergedState';
import { ResizableColumnProps, Column, ResizableHeaderCellProps } from './types';
import { INTERNAL_KEY } from './constant';
import 'react-resizable/css/styles.css';
import './index.scss';

const ResizableHeaderCell: React.FC<ResizableHeaderCellProps> = (props) => {
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
  } = props as ResizableHeaderCellProps;

  const [interWidth, setInterWidth] = useMergedState(width, {
    onChange: (value) => {
      console.log('interWidth', value);
    }
  });


  if (!interWidth || Number.isNaN(Number(width))) {
    return <th
      {...restProps}
      style={{
        ...style,
        minWidth,
      }}
      className={`no-resizable-container ${className}`}
      onClick={onClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
      scope={scope}
    >
      <span title={title}>{children}</span>
    </th>
  }

  const setBodyStyle = (active: boolean) => {
    document.body.style.userSelect = active ? 'none' : ''
    document.body.style.pointerEvents = active ? 'none' : ''
    document.documentElement.style.cursor = active ? 'col-resize' : ''
  }

  const onResizeStart = (_: any, data: ResizeCallbackData) => {
    setBodyStyle(true);
    setInterWidth(data?.size?.width);
  };

  const onResize = (_: any, data: ResizeCallbackData) => {
    const nowWidth = data?.size?.width;
    setInterWidth(nowWidth);

  };

  const onResizeStop = (_: any, { node }: { node: HTMLElement }) => {
    setBodyStyle(false);
    onResizeCallback && onResizeCallback(cellKey, interWidth);
  };

  return (
    <th
      scope={scope}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={onClick}
      className={`resizable-container ${className}`}
      style={{
        ...style,
        overflow: 'unset',
        width: interWidth,
      }}
    >
      <Resizable
        width={interWidth}
        height={0}
        className='resizable-box'
        minConstraints={[minWidth, 50]}
        maxConstraints={[maxWidth, 50]}
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
      <div style={{ width: Number(interWidth - 36), height: '100%' }}  {...restProps} className='resizable-title'>
        <span title={title}>{children}</span>
      </div>
    </th>
  );
};

export default ResizableHeaderCell;

