import React, { memo, useEffect } from 'react';
import type { ResizeCallbackData } from 'react-resizable'
import { ResizableHeaderCellProps } from './types';
import useMergedState from './hooks/useMergedState';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './style/index.scss';
import './style/global.scss';


const ResizableHeaderCell = (props: ResizableHeaderCellProps): JSX.Element => {
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


  // 先使用useMergedState
  const [interWidth, setInterWidth] = useMergedState(width);

  useEffect(() => {
    setInterWidth(width);
  }, [width]);

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


  const toggleColumnResizeStyles = (active: boolean) => {
    try {
      const bodyStyle = document.body?.style;
      const htmlStyle = document.documentElement?.style;

      if (bodyStyle && htmlStyle) {
        bodyStyle.userSelect = active ? 'none' : '';
        bodyStyle.pointerEvents = active ? 'none' : '';
        htmlStyle.cursor = active ? 'col-resize' : '';
      }
    } catch (error) {
      console.error('An error occurred while toggling column resize styles:', error);
    }
  };


  const onResizeStart = (_: any, data: ResizeCallbackData) => {
    toggleColumnResizeStyles(true);
    const startWidth = data?.size?.width;
    setInterWidth(startWidth);
  };

  const onResize = (_: any, data: ResizeCallbackData) => {
    const nowWidth = data?.size?.width;
    setInterWidth(nowWidth);
  };

  const onResizeStop = () => {
    toggleColumnResizeStyles(false);
    if (interWidth === width) return;
    onResizeCallback?.(cellKey, interWidth);
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
        className='resizable-title'
      >
        {children}
      </div>
    </th>
  );
};

export default memo(ResizableHeaderCell);
