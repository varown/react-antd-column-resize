import { Button, Divider, Table } from 'antd';
import React from 'react';
import { useAntdColumnResize } from "../..";
var App = function App() {
  var columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    align: 'center'
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 300
  }, {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone'
    //fixed: 'right',
  }];

  var data = [{
    key: '1',
    name: 'John Doe',
    age: 32,
    address: '123 Street, City',
    phone: '1588553336'
  }, {
    key: '2',
    name: 'Jane Smith',
    age: 28,
    address: '456 Road, Town',
    phone: '1588553336'
  }];
  var _useAntdColumnResize = useAntdColumnResize({
      columns: columns
    }),
    resizableColumns = _useAntdColumnResize.resizableColumns,
    components = _useAntdColumnResize.components,
    tableWidth = _useAntdColumnResize.tableWidth,
    resetColumns = _useAntdColumnResize.resetColumns;
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: resetColumns
  }, "\u91CD\u7F6EColumns"), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Table, {
    columns: resizableColumns,
    dataSource: data,
    components: components,
    bordered: true
    //@ts-ignore
    ,
    scroll: {
      x: tableWidth || false
    }
  }));
};
export default App;