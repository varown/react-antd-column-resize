function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useState, useMemo, useCallback } from 'react';
import { INTERNAL_KEY } from "./constant";
import useMergedState from "./hooks/useMergedState";
import ResizableHeaderCell from "./resizableHeaderCell";
// 问题梳理 现在是  props propsColumns 在不变化的情况当 外面页面重新渲染的时候 会导致 重新渲染 这样会无限循环
// 

var InternalResizableColumn = function InternalResizableColumn(_ref) {
  var propsColumns = _ref.columns,
    _ref$minWidth = _ref.minWidth,
    minWidth = _ref$minWidth === void 0 ? 120 : _ref$minWidth,
    _ref$maxWidth = _ref.maxWidth,
    maxWidth = _ref$maxWidth === void 0 ? 2000 : _ref$maxWidth,
    _ref$defaultWidth = _ref.defaultWidth,
    defaultWidth = _ref$defaultWidth === void 0 ? 120 : _ref$defaultWidth;
  var countTotalWidth = useCallback(function (columns) {
    if (!Array.isArray(columns)) return 0;
    return columns === null || columns === void 0 ? void 0 : columns.reduce(function (pre, cur) {
      var _cur$width;
      var isLeaf = !Array.isArray(cur.children);
      var childrenWidth = Array.isArray(cur.children) ? countTotalWidth(cur.children) : 0;
      var columnWidth = (_cur$width = cur === null || cur === void 0 ? void 0 : cur.width) !== null && _cur$width !== void 0 ? _cur$width : Number(defaultWidth);
      var curWidth = isLeaf ? columnWidth : 0;
      if (isNaN(Number(curWidth))) {
        console.error("Invalid column width: ".concat(curWidth));
        return pre + childrenWidth;
      }
      return pre + childrenWidth + Number(curWidth);
    }, 0);
  }, [defaultWidth]);
  var _useState = useState(function () {
      return countTotalWidth(propsColumns) || false;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    tableWidth = _useState2[0],
    setTableWidth = _useState2[1];
  var handleResizableColumns = useCallback(function (key, interWidth) {
    setResizableColumns(function (prev) {
      return prev === null || prev === void 0 ? void 0 : prev.map(function (column) {
        return updateResizableColumns(column, key, interWidth);
      });
    });
  }, []);
  function updateResizableColumns(column, key, interWidth) {
    var cellKey = column[INTERNAL_KEY] || column.key;
    if (cellKey !== key && Array.isArray(column.children)) {
      column.children = column.children.map(function (item) {
        return updateResizableColumns(item, key, interWidth);
      });
    }
    var width = cellKey !== key ? column === null || column === void 0 ? void 0 : column.width : interWidth;
    if (width === column.width) return column;
    return _objectSpread(_objectSpread(_objectSpread({}, column), cellKey === key && {
      width: interWidth
    }), {}, {
      onHeaderCell: function onHeaderCell() {
        return {
          minWidth: minWidth,
          maxWidth: maxWidth,
          defaultWidth: defaultWidth,
          width: width,
          cellKey: column[INTERNAL_KEY] || column.key,
          onResize: handleResizableColumns
        };
      }
    });
  }
  function processColumns(columns) {
    return columns === null || columns === void 0 ? void 0 : columns.map(function (column) {
      if (_typeof(column) !== 'object') return column;
      var children = column.children;
      if (Array.isArray(children)) {
        column.children = processColumns(children);
      }
      return _objectSpread(_objectSpread({}, column), {}, {
        onHeaderCell: function onHeaderCell() {
          return _objectSpread(_objectSpread({
            minWidth: minWidth,
            maxWidth: maxWidth,
            defaultWidth: defaultWidth
          }, 'width' in column && {
            width: column.width
          }), {}, {
            cellKey: column[INTERNAL_KEY] || column.key,
            onResize: handleResizableColumns
          });
        }
      });
    });
  }
  var initialColumns = useMemo(function () {
    var initHandleColumns = processColumns(propsColumns);
    return initHandleColumns;
  }, [propsColumns]);
  var _useMergedState = useMergedState(initialColumns, {
      onChange: function onChange(value) {
        var allWidth = countTotalWidth(value);
        setTableWidth(allWidth);
      }
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    resizableColumns = _useMergedState2[0],
    setResizableColumns = _useMergedState2[1];
  var resetColumns = useCallback(function () {
    setResizableColumns(initialColumns);
  }, [initialColumns]);
  var components = useMemo(function () {
    return {
      header: {
        cell: ResizableHeaderCell
      }
    };
  }, []);
  return {
    resizableColumns: resizableColumns,
    components: components,
    tableWidth: tableWidth,
    resetColumns: resetColumns
  };
};
export default InternalResizableColumn;