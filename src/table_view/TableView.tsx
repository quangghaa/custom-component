import React, { useState } from "react";
import "./table_view_style.scss";
import { ColumnType, SortOrder } from "./types";
import HeaderView from "./HeadView";
import ItemView from "./ItemView";
import { hasChildren } from "./common"

const EmptyTableBody = (props: any) => {
    const { colSpan } = props
    return (
        <tr className="blank_row">
            <td colSpan={colSpan}>No data found</td>
        </tr>
    )
}

type ScrollType = { x: number | string, y: number }
interface Props {
    columns: ColumnType<any>[]
    data: any[]
    scroll?: ScrollType
}
export const TableView: React.FC<Props> = (props: any) => {
    const { columns, data, scroll } = props
    const [dataView, setDataView] = useState<any[]>(data)

    const tableSizeCls: any = { x: "100%", y: "auto" } // default width and height
    if (scroll) {
        const { x, y } = scroll
        if (typeof x === "number") tableSizeCls.x = x + "px"
        if (typeof x === "string") tableSizeCls.x = x
        if (typeof y === "number") tableSizeCls.y = y + "px"
    }

    function getTotalColumns(columns: ColumnType<any>[], remainingSum: number = 0) {
        let sum = remainingSum
        columns.forEach(col => {
            if (!hasChildren(col)) {
                sum++
            } else {
                sum += getTotalColumns(col.children!, 0)
            }
        })
        return sum
    }

    function handleSort(direction: SortOrder, sorter: (a: any, b: any) => number) {
        if (direction === null) {
            setDataView(data)
        } else {
            const temp = [...dataView]
            const result = direction === "ascending" ? temp.sort(sorter) : temp.sort(sorter).reverse()
            setDataView(result)
        }
    }

    function handleFilter(selectedValues: string[], onFilter?: (value: any, record: any) => boolean, sorter?: (a: any, b: any) => number) {
        if (!onFilter) return
        let filterList: any[] = []
        if (selectedValues.length === 0) {
            filterList = data
        } else {
            for (const selectedValue of selectedValues) {
                for (const item of data) {
                    if (onFilter(selectedValue, item)) filterList.push(item)
                }
            }
        }

        setDataView(filterList)
    }

    return (
        <div className="table-view" style={{ maxHeight: tableSizeCls.y }}>
            <table style={{ width: tableSizeCls.x }}>
                <HeaderView
                    columns={columns}
                    handleSort={handleSort}
                    handleFilter={handleFilter}
                />
                <tbody className="table-body">
                    {dataView.length === 0 &&
                        <EmptyTableBody colSpan={columns.length} />}
                    {dataView.map((row: any, index: any) => (
                        <ItemView
                            columns={columns}
                            row={row}
                            key={index}
                            index={index}
                        />
                    ))}
                </tbody>
                <tfoot className="table-foot">
                    <tr>
                        <td className="" >Total record</td>
                        <td className="" colSpan={getTotalColumns(columns) - 1}>{data.length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

    )
}