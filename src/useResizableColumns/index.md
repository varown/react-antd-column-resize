```jsx
import React from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import { useResizableColumns } from 'useResizableColumns';

const App = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
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
  ];

  const data = [
    {
      key: '1',
      name: 'John Doe',
      age: 32,
      address: '123 Street, City',
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 28,
      address: '456 Road, Town',
    },
  ];

  const { columns: resizableColumns, ResizableHeaderCell } =
    useResizableColumns({ columns });

  const components = {
    header: {
      cell: ResizableHeaderCell,
    },
  };

  return (
    <div className="app">
      <Table
        columns={resizableColumns}
        dataSource={data}
        components={components}
        bordered
      />
    </div>
  );
};

export default App;
```
