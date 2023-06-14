import { useRef, useCallback } from 'react';
export default function useRefFunction(callback) {
  var ref = useRef();
  ref.current = callback;
  return useCallback(function () {
    var _ref$current;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.call.apply(_ref$current, [ref].concat(args));
  }, []);
}