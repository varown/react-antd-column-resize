import { Table } from 'antd';
import React from 'react';
import { useAntdColumnResize } from 'react-antd-column-resize';

type dataType = {
  key: number;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  [string: string]: any;

};


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
    onFilter: (value: string, record: dataType) => record.name.indexOf(value) === 0,
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
        sorter: (a: any, b: any) => a.age - b.age,
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

const data: dataType[] = [];
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
        //@ts-ignore
        scroll={{ x: tableWidth }}
      />
    </>
  );
};

export default App;
