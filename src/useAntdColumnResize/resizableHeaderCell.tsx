import React, { memo, useEffect, useState} from 'react';
import type { ResizeCallbackData } from 'react-resizable';
import useMergedState from './hooks/useMergedState';
import { ResizableHeaderCellProps } from './types';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './style/global.scss';
import './style/index.scss';


const ResizableHeaderCell = (props: ResizableHeaderCellProps): JSX.Element => {
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

  // 先使用useMergedState
  const [interWidth, setInterWidth] = useMergedState(width);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    setInterWidth(width);
  }, [width]);

  if (!interWidth || Number.isNaN(Number(width))) {
    delete style?.width;
    return (
      <th
        {...restProps}
        onClick={onClick}
        rowSpan={rowSpan}
        colSpan={colSpan}
        className={className}
        style={{
          ...style,
          minWidth,
        }}
      >
        <span title={title}>{children}</span>
      </th>
    );
  }

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
      console.error(
        'An error occurred while toggling column resize styles:',
        error,
      );
    }
  };
  const diffWidth = (width: number): number => {
    let viceWidth = width;
    if (viceWidth >= maxWidth) viceWidth = maxWidth;
    if (viceWidth <= minWidth) viceWidth = minWidth;
    return viceWidth;
  }

  const onResizeStart = (_: any, data: ResizeCallbackData) => {
    const startWidth = diffWidth(data?.size?.width);
    toggleColumnResizeStyles(true);
    setIsResizing(true);
    setInterWidth(startWidth);
  };

  const onResize = (_: any, data: ResizeCallbackData) => {
    const nowWidth = diffWidth(data?.size?.width);
    setInterWidth(nowWidth);
  };

  const onResizeStop = () => {
    toggleColumnResizeStyles(false);
    setIsResizing(false);
    if (interWidth === width) return;
    const nowWidth = diffWidth(interWidth);
    nowWidth !== interWidth && setInterWidth(nowWidth);
    onResizeCallback?.(cellKey, nowWidth);
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
        className="resizable-box"
        minConstraints={[minWidth, 50]}
        maxConstraints={[maxWidth, 50]}
        handle={
          <div className="resizable-handler" >
            <div className="resizable-line" />
          </div>
        }
        draggableOpts={{ enableUserSelectHack: false }}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      >
        <div
          style={{
            height: '100%',
            width: isResizing ? interWidth : '100%',
            minWidth: `${interWidth} !important`
          }}
        ></div>
      </Resizable>
      <div {...restProps} className="resizable-title">
        {children}
      </div>
    </th>
  );
};

export default memo(ResizableHeaderCell);


