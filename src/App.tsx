import { Key, ReactNode, useEffect, useState } from 'react';
import './App.css'
import TableView, { HeaderView } from './table_view'
import { DataType, TableParams } from './table_view/types';
import qs from "qs"
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleView = (record: any) => {
    console.log(">> view: ", record)
  }
  const handleEdit = (record: any) => {
    console.log(">> edit: ", record)
  }
  const handleDelete = (record: any) => {
    console.log(">> delete: ", record)
  }
  const headerView: HeaderView[] = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      enableSort: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '20%',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      enableSearch: true,
    },
    {
      title: 'Action',
      dataIndex: '#',
      width: 200,
      fixed: 'right',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <a onClick={() => handleView(record)}><EyeOutlined /></a>
          <a onClick={() => handleEdit(record)}><EditOutlined /></a>
          <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ]

  return (
    <div className='container'>
      <TableView
        headerView={headerView}
        dataList={data}
        loading={loading}
        tableParams={tableParams} // for paging, sorting and filtering
        setTableParams={setTableParams}
      />
    </div>
  )
}

export default App
