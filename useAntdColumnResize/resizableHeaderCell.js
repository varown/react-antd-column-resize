function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["width", "minWidth", "maxWidth", "defaultWidth", "cellKey", "onResize", "children", "onClick", "rowSpan", "style", "colSpan", "title", "scope", "className"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { memo, useEffect, useState } from 'react';
import useMergedState from "./hooks/useMergedState";
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import "./style/global.scss";
import "./style/index.scss";
var ResizableHeaderCell = function ResizableHeaderCell(props) {
  var _ref = props,
    width = _ref.width,
    minWidth = _ref.minWidth,
    maxWidth = _ref.maxWidth,
    defaultWidth = _ref.defaultWidth,
    cellKey = _ref.cellKey,
    onResizeCallback = _ref.onResize,
    children = _ref.children,
    onClick = _ref.onClick,
    rowSpan = _ref.rowSpan,
    style = _ref.style,
    colSpan = _ref.colSpan,
    title = _ref.title,
    scope = _ref.scope,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);

  // 先使用useMergedState
  var _useMergedState = useMergedState(width),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    interWidth = _useMergedState2[0],
    setInterWidth = _useMergedState2[1];
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isResizing = _useState2[0],
    setIsResizing = _useState2[1];
  useEffect(function () {
    setInterWidth(width);
  }, [width]);
  if (!interWidth || Number.isNaN(Number(width))) {
    style === null || style === void 0 ? true : delete style.width;
    return /*#__PURE__*/React.createElement("th", _extends({}, restProps, {
      onClick: onClick,
      rowSpan: rowSpan,
      colSpan: colSpan,
      className: className,
      style: _objectSpread(_objectSpread({}, style), {}, {
        minWidth: defaultWidth
      })
    }), /*#__PURE__*/React.createElement("span", {
      title: title
    }, children));
  }
  var toggleColumnResizeStyles = function toggleColumnResizeStyles(active) {
    try {
      var _document$body, _document$documentEle;
      var bodyStyle = (_document$body = document.body) === null || _document$body === void 0 ? void 0 : _document$body.style;
      var htmlStyle = (_document$documentEle = document.documentElement) === null || _document$documentEle === void 0 ? void 0 : _document$documentEle.style;
      if (bodyStyle && htmlStyle) {
        bodyStyle.userSelect = active ? 'none' : '';
        bodyStyle.pointerEvents = active ? 'none' : '';
        htmlStyle.cursor = active ? 'col-resize' : '';
      }
    } catch (error) {
      console.error('An error occurred while toggling column resize styles:', error);
    }
  };
  var onResizeStart = function onResizeStart(_, data) {
    var _data$size;
    var startWidth = data === null || data === void 0 ? void 0 : (_data$size = data.size) === null || _data$size === void 0 ? void 0 : _data$size.width;
    toggleColumnResizeStyles(true);
    setIsResizing(true);
    setInterWidth(startWidth);
  };
  var onResize = function onResize(_, data) {
    var _data$size2;
    var nowWidth = data === null || data === void 0 ? void 0 : (_data$size2 = data.size) === null || _data$size2 === void 0 ? void 0 : _data$size2.width;
    setInterWidth(nowWidth);
  };
  var onResizeStop = function onResizeStop() {
    toggleColumnResizeStyles(false);
    setIsResizing(false);
    if (interWidth === width) return;
    onResizeCallback === null || onResizeCallback === void 0 ? void 0 : onResizeCallback(cellKey, interWidth);
  };
  var handleClick = function handleClick(e) {
    e.stopPropagation();
  };
  return /*#__PURE__*/React.createElement("th", {
    scope: scope,
    colSpan: colSpan,
    rowSpan: rowSpan,
    onClick: onClick,
    className: "resizable-container ".concat(className),
    style: _objectSpread(_objectSpread({}, style), {}, {
      overflow: 'unset'
    })
  }, /*#__PURE__*/React.createElement(Resizable, {
    width: interWidth,
    height: 0,
    className: "resizable-box",
    minConstraints: [minWidth, 50],
    maxConstraints: [maxWidth, 50],
    handle: /*#__PURE__*/React.createElement("div", {
      className: "resizable-handler",
      onClick: handleClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "resizable-line"
    })),
    draggableOpts: {
      enableUserSelectHack: false
    },
    onResize: onResize,
    onResizeStart: onResizeStart,
    onResizeStop: onResizeStop
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: isResizing ? interWidth : '100%',
      height: '100%'
    }
  })), /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: "resizable-title"
  }), children));
};
export default /*#__PURE__*/memo(ResizableHeaderCell);