---
title: useAntdColumnResize
toc: content
demo:
  cols: 1
---

<code  src="./demo/basic.tsx" >基本使用</code>
<code  src="./demo/children.tsx" >含有 children</code>
<code src="./demo/row-selection.tsx">可选择</code>
<code  src="./demo/proBasic.tsx" >ProTable 基本使用</code>
<code  src="./demo/proChildren.tsx" >ProTable 含有 children</code>

### API

| 参数         | 说明     | 类型                        | 默认值 |
| ------------ | -------- | --------------------------- | ------ |
| columns      | 列配置   | object[] antd table columns | -      |
| minWidth     | 最小宽度 | number                      | 120    |
| maxWidth     | 最大宽度 | number                      | 2000   |
| defaultWidth | 默认宽度 | number                      | 120    |

### 返回数据

| 参数             | 说明            | 类型                        | 默认值 |
| ---------------- | --------------- | --------------------------- | ------ |
| resizableColumns | 可拖动列配置    | object[] antd table columns | -      |
| components       | antd table 组件 | object                      | -      |
| tableWidth       | 表格宽度        | number                      | -      |
| resetColumns     | 重置列          | function                    | -      |

### 注意事项

1、columns 设置每项 width 时，默认该项是可拖动项。
2、columns 至少需要一项不设置 width，否则无法拖动，defaultWidth 会默认是未设置项的最小宽度。
原因：当 columns 每项设置的宽度之和小于 table 宽度时，会造成拖动异常，所以需要至少一项不设置宽度，让其自适应。
3、minWidth、maxWidth 代表可拖动的距离，建议 minWidth 小于或者等于 columns 设置的最小宽度项。
