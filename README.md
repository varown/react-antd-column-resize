<h1 align="center">欢迎使用 react-antd-column-resize</h1>

> 中文文档 | [English](README_EN.md) [![NPM version](https://img.shields.io/npm/v/react-antd-column-resize.svg?style=flat)](https://npmjs.org/package/react-antd-column-resize) [![NPM downloads](http://img.shields.io/npm/dm/react-antd-column-resize.svg?style=flat)](https://npmjs.org/package/react-antd-column-resize)

## 简介

react-antd-column-resize 是一个基于 react hooks 开发的 antd 表格(table)列宽拖动组件，
支持 antd4、antd5 和 ant-design/pro-components 以及所有基于 antd 开发的 table 组件。
其核心 hooks`useAntdColumnResize`，可以自定义拖动的最小宽度、最大宽度和默认宽度方便快捷。

## 安装

```bash
npm install --save react-antd-column-resize

# or use yarn

yarn add react-antd-column-resize

```

## 使用

```jsx
import { Table } from 'antd';
import React from 'react';
import { useAntdColumnResize } from 'react-antd-column-resize';

const App = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align: 'center',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
      fixed: 'right',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Doe',
      age: 32,
      address: '123 Street, City',
      phone: '1588553336',
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 28,
      address: '456 Road, Town',
      phone: '1588553336',
    },
  ];

  const { resizableColumns, components, tableWidth } = useAntdColumnResize({
    columns,
  });

  return (
    <div className="app">
      <Table
        columns={resizableColumns}
        dataSource={data}
        components={components}
        bordered
        scroll={{ x: tableWidth }}
      />
    </div>
  );
};

export default App;
```

## useAntdColumnResize API

| 参数         | 说明     | 类型                        | 默认值 |
| ------------ | -------- | --------------------------- | ------ |
| columns      | 列配置   | object[] antd table columns | -      |
| minWidth     | 最小宽度 | number                      | 120    |
| maxWidth     | 最大宽度 | number                      | 2000   |
| defaultWidth | 默认宽度 | number                      | 120    |

## 注意事项

1. `columns` 设置每项 `width` 时，默认该项是可拖动项。
2. `columns` 至少需要一项不设置 `width`，否则无法拖动，`defaultWidth` 会默认是未设置项的最小宽度。
   原因：当 `columns` 每项设置的宽度之和小于表格宽度时，会造成拖动异常，所以需要至少一项不设置宽度，让其自适应。
3. `minWidth`、`maxWidth` 代表可拖动的距离，建议 `minWidth` 小于或等于 `columns` 设置的最小宽度项。

### 贡献

欢迎贡献代码、提出问题或者改进建议。请查阅贡献指南了解更多详情。