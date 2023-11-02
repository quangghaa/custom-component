import React, { ComponentType, ReactNode } from "react";
import "./style.scss";
import { ItemViewProps } from "./ItemView";

export interface DataType {
    dataIndex: string[]
    data: string[][]
}
const EmptyTableBody = (props: any) => {
    const { colSpan } = props
    return (
        <tr className="blank_row">
            <td colSpan={colSpan}>No data found</td>
        </tr>
    )
}
interface Props {
    headerView: ReactNode
    ItemView: ComponentType<ItemViewProps>
    dataList: DataType
}
const TableView: React.FC<Props> = (props: any) => {
    const { headerView, ItemView, dataList } = props
    const { dataIndex, data } = dataList

    return (
        <div className="table-view">
            <table>
                {headerView}
                <tbody className="table-body">
                    {data.length === 0 &&
                        <EmptyTableBody colSpan={dataIndex.length} />}
                    {data.map((item: any, index: any) => (
                        <ItemView key={index} dataIndex={dataIndex} dataRow={item} />
                    ))}
                </tbody>
                <tfoot className="table-foot">
                    <tr>
                        <td className="" >Total record</td>
                        <td className="" colSpan={dataIndex.length - 1}>{data.length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

    )
}
export default TableView