import React, { useState, memo } from 'react';
import { Resizable } from 'react-resizable';
import { ResizableHeaderCellProps } from './types';
import useMergedState from './hooks/useMergedState';
import type { ResizeCallbackData, } from 'react-resizable'
import 'react-resizable/css/styles.css';
import './index.scss';
const ResizableHeaderCell: React.FC<ResizableHeaderCellProps> = (props) => {
  const {
    width,
    minWidth,
    maxWidth,
    defaultWidth,
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

  const [isDragging, setIsDragging] = useState(false);
  const [dragWidth, setDragWidth] = useState(-5);
  const [interWidth, setInterWidth] = useMergedState(width, {
    onChange: (value) => {
      setDragWidth(width - value - 5)
    }
  });
  if (!interWidth || Number.isNaN(Number(width))) {
    delete style?.width;
    return <th
      {...restProps}
      onClick={onClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={className}
      style={{
        ...style,
        minWidth: defaultWidth,
      }}
    >
      <span title={title}>{children}</span>
    </th>
  };
  const setBodyStyle = (active: boolean) => {
    document.body.style.userSelect = active ? 'none' : ''
    document.body.style.pointerEvents = active ? 'none' : ''
    document.documentElement.style.cursor = active ? 'col-resize' : ''
  }

  const onResizeStart = (_: any, data: ResizeCallbackData) => {
    setBodyStyle(true);
    setIsDragging(true)
    const startWidth = data?.size?.width;
    setInterWidth(startWidth);
  };

  const onResize = (_: any, data: ResizeCallbackData) => {
    const nowWidth = data?.size?.width;
    setInterWidth(nowWidth);
  };

  const onResizeStop = () => {
    setBodyStyle(false);
    setIsDragging(false)
    onResizeCallback && onResizeCallback(cellKey, interWidth);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
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
            onClick={handleClick}
            style={{ right: isDragging ? dragWidth : -5 }}
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
      <div
        {...restProps}
        style={{
          width: Number(interWidth - 32),
          height: '100%'
        }}
        className='resizable-title'
      >
        <span title={title}>{children}</span>
      </div>
    </th>
  );
};

export default memo(ResizableHeaderCell);
