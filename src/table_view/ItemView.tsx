import React, { ReactNode } from "react";
import "./item_view_style.scss";
import { ColumnType } from "./types";
import { hasChildren } from "./common";

interface Props {
    columns: ColumnType<any>[]
    row: object
    index: any
}
const ItemView: React.FC<Props> = (props) => {
    const { columns, row, index } = props
    const onRowClick = (item: any) => {
        window.alert(`${item}`)
    }

    const renderCell = (col: ColumnType<any>, row: any, rowIndex: number, remainingCellList: ReactNode[] = []) => {
        const cellList: ReactNode[] = remainingCellList
        if (!hasChildren(col)) {
            if (col.dataIndex) {
                cellList.push(<td
                    data-cell={col.dataIndex}
                    className={`col-${col.dataIndex}`}
                    key={col.key || col.dataIndex}
                >
                    {/* {row[col.dataIndex]} */}
                    {col.render ?
                        col.render(row[col.dataIndex], row, rowIndex)
                        :
                        row[col.dataIndex]
                    }
                </td>)
            }
        } else {
            const children = col.children!
            children.forEach((child) => {
                return renderCell(child, row, rowIndex, cellList)
            })
        }
        return cellList
    }

    return <tr key={index} className="item-view-row">
        {columns.map((col) => {
            const cellList = renderCell(col, row, index, [])
            return cellList
        })}
    </tr>
}
export default ItemView