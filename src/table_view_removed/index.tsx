import { Button, Input, InputRef, Space, Table, Typography } from "antd";
import qs from "qs";
import React, { Key, ReactNode, useEffect, useRef, useState } from "react";
import { DataType, TableParams } from "./types";
import type { ColumnType, TablePaginationConfig } from 'antd/es/table';
import type { ColumnFilterItem, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

export interface HeaderView {
    title: string
    dataIndex: string
    width?: string | number
    fixed?: "left" | "right"
    enableSort?: boolean
    filters?: ColumnFilterItem[]
    enableSearch?: boolean
    render?: (value: any, record: any) => ReactNode


    // sorter?: (a: any, b: any) => number
    // filters?: FilterItem[]
    // onFilter?: (value: boolean | Key, record: any) => boolean

}
interface Props {
    headerView: HeaderView[]
    dataList: any[]
    loading: boolean
    tableParams: TableParams
    setTableParams: (params: TableParams) => void
}
type DataIndex = keyof DataType
const { Text } = Typography
const TableView: React.FC<Props> = (props) => {
    const { headerView, dataList, loading, tableParams, setTableParams } = props

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

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
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
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
    const buildColumns = (headerView: HeaderView[]) => {
        const handleSort = (a: any, b: any) => {
            if (typeof a === "number") return a - b
            if (typeof a === "string") return a.localeCompare(b)
            if (typeof a === "object") return 0 // not supported yet
            return 0
        }


        if (!headerView) return undefined
        const columns = headerView.map(item => {
            const temp = { ...item } as any
            if (item.enableSort) temp.sort = handleSort
            if (item.filters && item.filters.length !== 0) {
                const dataIndex = item.dataIndex
                const handleFilter = (value: boolean | Key, record: any) => {
                    if (typeof value === "boolean") return false
                    return record[dataIndex].indexOf(value.toString()) === 0
                }
                temp.onFilter = handleFilter
            }
            return temp
        })
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.first.localeCompare(b.name.last),
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
            onFilter: (value: boolean | Key, record) => typeof value !== "boolean" ? record.gender.indexOf(value.toString()) === 0 : false,
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
        setTableParams({ ...tableParams, pagination })
        // setTableParams({
        //     pagination,
        //     filters,
        //     ...sorter,
        // });

        // // `dataSource` is useless since `pageSize` changed
        // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        //     setData([]);
        // }
    };
    return <>
        <Table
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={dataList}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            summary={(pageData) => {
                return <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                        <Text strong>Total records:</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={2}>
                        <Text strong>200</Text>
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            }}
        />
    </>
}
export default TableView