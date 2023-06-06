import { Table } from 'antd';
import React from 'react';
import { useAntdColumnResize } from 'react-antd-column-resize';
const columns = [
  {
    title: 'NameNameNameName',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
        align: 'center',
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
        align: 'center',
        ellipsis: true,
      },
    ],
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 120,
    fixed: 'right',
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

const App = () => {
  const { resizableColumns, components, tableWidth } = useAntdColumnResize({
    columns,
  });
  return (
    <>
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        bordered
        scroll={{ x: tableWidth }}
      />
    </>
  );
};

export default App;
