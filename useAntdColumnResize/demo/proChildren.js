import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import { useAntdColumnResize } from "../..";
var columns = [{
  title: 'NameNameNameName',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',
  filters: [{
    text: 'Joe',
    value: 'Joe'
  }, {
    text: 'John',
    value: 'John'
  }],
  onFilter: function onFilter(value, record) {
    return record.name.indexOf(value) === 0;
  }
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress',
    width: 200,
    align: 'center'
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
    align: 'center',
    ellipsis: true
  }]
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 150,
    sorter: function sorter(a, b) {
      return a.age - b.age;
    }
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: 150
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: 100
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: 100
      }]
    }]
  }]
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: 120,
  fixed: 'right'
}];
var data = [];
for (var i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M'
  });
}
var App = function App() {
  var _useAntdColumnResize = useAntdColumnResize({
      columns: columns
    }),
    resizableColumns = _useAntdColumnResize.resizableColumns,
    components = _useAntdColumnResize.components,
    tableWidth = _useAntdColumnResize.tableWidth;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProTable
  //@ts-ignore
  , {
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