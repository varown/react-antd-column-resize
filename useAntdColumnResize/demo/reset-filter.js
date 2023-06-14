function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState } from 'react';
import { Button, Space, Table } from 'antd';
import { useAntdColumnResize } from "../..";
var data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sydney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park'
}];
var App = function App() {
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    filteredInfo = _useState2[0],
    setFilteredInfo = _useState2[1];
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    sortedInfo = _useState4[0],
    setSortedInfo = _useState4[1];
  var handleChange = function handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  var clearFilters = function clearFilters() {
    setFilteredInfo({});
  };
  var clearAll = function clearAll() {
    setFilteredInfo({});
    setSortedInfo({});
  };
  var setAgeSort = function setAgeSort() {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age'
    });
  };
  var columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filters: [{
      text: 'Joe',
      value: 'Joe'
    }, {
      text: 'Jim',
      value: 'Jim'
    }],
    filteredValue: filteredInfo.name || null,
    onFilter: function onFilter(value, record) {
      return record.name.includes(value);
    },
    sorter: function sorter(a, b) {
      return a.name.length - b.name.length;
    },
    sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
    ellipsis: true,
    width: 120
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: function sorter(a, b) {
      console.log(a.age, b.age);
      return a.age - b.age;
    },
    sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
    ellipsis: true,
    width: 120
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    filters: [{
      text: 'London',
      value: 'London'
    }, {
      text: 'New York',
      value: 'New York'
    }],
    filteredValue: filteredInfo.address || null,
    onFilter: function onFilter(value, record) {
      return record.address.includes(value);
    },
    sorter: function sorter(a, b) {
      return a.address.length - b.address.length;
    },
    sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
    ellipsis: true
  }];
  var _useAntdColumnResize = useAntdColumnResize({
      columns: columns
    }),
    resizableColumns = _useAntdColumnResize.resizableColumns,
    components = _useAntdColumnResize.components,
    tableWidth = _useAntdColumnResize.tableWidth;
  console.log('resizableColumns', resizableColumns);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Space, {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: setAgeSort
  }, "Sort age"), /*#__PURE__*/React.createElement(Button, {
    onClick: clearFilters
  }, "Clear filters"), /*#__PURE__*/React.createElement(Button, {
    onClick: clearAll
  }, "Clear filters and sorters")), /*#__PURE__*/React.createElement(Table, {
    columns: resizableColumns,
    components: components
    // @ts-ignore
    ,
    scroll: {
      x: tableWidth
    },
    dataSource: data,
    onChange: handleChange
  }));
};
export default App;