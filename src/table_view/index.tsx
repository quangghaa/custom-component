import { Button, Input, InputRef, Space, Table } from "antd";
import qs from "qs";
import React, { useEffect, useRef, useState } from "react";
import { DataType, TableParams } from "./types";
import type { ColumnType, TablePaginationConfig } from 'antd/es/table';
import type { ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

interface Props {

}
type DataIndex = keyof DataType
const TableView: React.FC<Props> = (props) => {
    const getRandomuserParams = (params: TableParams) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
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

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleView = (record: any) => {
        console.log(">> view: ", record)
    }
    const handleEdit = (record: any) => {
        console.log(">> edit: ", record)
    }
    const handleDelete = (record: any) => {
        console.log(">> delete: ", record)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            width: '20%',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
            ],
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: 'Action',
            dataIndex: '#',
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    <a onClick={() => handleView(record)}><EyeOutlined /></a>
                    <a onClick={() => handleEdit(record)}><EditOutlined /></a>
                    <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
                </Space>
            ),
            width: 200,
            fixed: 'right',
        },
    ];

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: any,
        sorter: any,
    ) => {
        console.log(">> ", pagination)
        console.log(">> ", filters, typeof filters)
        console.log(">> ", sorter, typeof sorter)
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return <>
        <Table
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    </>
}
export default TableView