import { useEffect, useRef } from 'react';
//每当组件重新渲染时，state 的值将保持不变 获取上次的数据
export const usePrevious = <T>(state: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};
