import { useEffect, useRef } from 'react';
//每当组件重新渲染时，state 的值将保持不变 获取上次的数据
var usePrevious = function usePrevious(state) {
  var ref = useRef();
  useEffect(function () {
    ref.current = state;
  });
  return ref.current;
};
export default usePrevious;