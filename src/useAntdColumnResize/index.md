---
title: useAntdColumnResize
toc: content
demo:
  cols: 1
---

<code  src="./demo/basic.tsx" >基本使用</code>
<code  src="./demo/trends.tsx" >动态添加</code>
<code  src="./demo/children.tsx" >含有 children</code>
<code  src="./demo/row-selection.tsx">可选择</code>
<code  src="./demo/proBasic.tsx" >ProTable 基本使用</code>
<code  src="./demo/proChildren.tsx" >ProTable 含有 children</code>

### useAntdColumnResize API

useAntdColumnResize(setup: () => `resizeDataType<Column>`, dependencies: any[])

| 参数         | 说明           | 类型                           | 默认值 |
| ------------ | -------------- | ------------------------------ | ------ |
| setup        | 获取列配置函数 | `() => resizeDataType<Column>` | -      |
| dependencies | 更新依赖项     | `any[]`                        | -      |

### resizeDataType setup 返回数据类型

| 参数     | 说明     | 类型                        | 默认值 |
| -------- | -------- | --------------------------- | ------ |
| columns  | 列配置   | object[] antd table columns | -      |
| minWidth | 最小宽度 | number                      | 120    |
| maxWidth | 最大宽度 | number                      | 2000   |

### 返回数据

| 参数             | 说明            | 类型                        | 默认值 |
| ---------------- | --------------- | --------------------------- | ------ |
| resizableColumns | 可拖动列配置    | object[] antd table columns | -      |
| components       | antd table 组件 | object                      | -      |
| tableWidth       | 表格宽度        | number                      | -      |
| resetColumns     | 重置列          | function                    | -      |

### 注意事项

1. `columns` 设置每项 `width` 时，默认该项是可拖动项,并且请确保含有唯一标识(`dataIndex或者key`)。
2. `columns` 至少需要一项不设置 `width`，否则会拖动异常，`minWidth` 默认是未设置项宽度的最小宽度。
   原因：当 `columns` 每项设置的宽度之和小于表格宽度时，会造成拖动异常，所以需要至少一项不设置宽度，让其自适应。
3. `minWidth`、`maxWidth` 代表可拖动的距离，建议 `minWidth`等于 `columns` 设置的最小宽度项，最大宽度同理应大于`columns` 设置的最大宽度项。
4. 请不要欺骗`useAntdColumnResize`，`dependencies` 依赖项请按需添加，否则会造成无限循环。
