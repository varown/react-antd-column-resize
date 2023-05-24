import { useRef, useCallback } from 'react';

export default function useRefFunction<T extends Function>(callback: T): T {
  const ref = useRef<any>();
  ref.current = callback;

  return useCallback<T>(
    ((...args: any) => ref.current?.(...args)) as any,
    [],
  );
}

