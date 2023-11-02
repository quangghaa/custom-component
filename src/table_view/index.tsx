import React, { ComponentType, ReactNode } from "react";
import "./style.scss";
import { ItemViewProps } from "./ItemView";

export interface DataType {
    dataIndex: string[]
    data: string[][]
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
                <caption>The last 14 world F1 champions</caption>
                {headerView}
                <tbody className="table-body">
                    {data.map((item: any, index: any) => (
                        <ItemView key={index} dataIndex={dataIndex} dataRow={item} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}
export default TableView