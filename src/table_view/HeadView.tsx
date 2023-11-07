import React, { ReactNode } from "react";
import "./header_view_style.scss";
import { ColumnType } from "./types";
import SortIcon from "../component/sort_icon/SortIcon";
import FilterIcon from "../component/filter_icon/FilterIcon";

interface Props {
    columns: ColumnType<any>[]
}
const HeaderView: React.FC<Props> = (props) => {
    const { columns } = props

    function getMaxDepth<T>(columns: ColumnType<T>[]): number {
        let maxDepth = 1; // Initialize with the minimum depth, which is 1 for the root columns.

        for (const column of columns) {
            if (column.children) {
                const childDepth = 1 + getMaxDepth(column.children);
                if (childDepth > maxDepth) {
                    maxDepth = childDepth;
                }
            }
        }

        return maxDepth;
    }
    function getChildrenLevel<T>(level: number, col: ColumnType<T>): ColumnType<T>[] {
        if (level === 0) {
            return [col];
        }

        if (col.children) {
            return col.children.flatMap(child => getChildrenLevel(level - 1, child));
        }

        return [];
    }
    function getColAndRowSpan<T>(col: ColumnType<T>, level: number = 0, maxDepth: number = 1): { colSpan: number; rowSpan: number } {
        let colSpan = 1;
        let rowSpan = 1;
        if (hasChildren(col)) {
            colSpan = col.children!.reduce((sum, child) => sum + getColAndRowSpan(child, level + 1, maxDepth).colSpan, 0);
        } else {
            rowSpan = maxDepth - level
        }
        return { colSpan, rowSpan };
    }

    function hasChildren<T>(col: ColumnType<T>): boolean {
        return !(col.children === undefined || (Array.isArray(col.children) && col.children.length === 0))
    }

    function renderTableView(columns: ColumnType<any>[]) {
        const maxDepth = getMaxDepth(columns)
        const textAlignCenterCls = "text-center "
        const sorterCls = "sorter-cell "
        const result = []

        for (let i = 0; i < maxDepth; i++) {
            let rows = []
            for (let j = 0; j < columns.length; j++) {
                const col = columns[j]
                const children = getChildrenLevel(i, col)
                rows.push(...children)
            }
            result.push(rows)
        }

        return result.map((row, index) => (
            <tr key={`row-${index}`}>
                {row.map((col, colIndex) => (
                    <th
                        className={
                            `
                            ${hasChildren(col) ? textAlignCenterCls : ""}
                            ${col.sorter ? sorterCls : ""} 
                            `
                        }
                        key={col.key || `th-${colIndex}`}
                        {...getColAndRowSpan(col, index, maxDepth)}
                        style={col.width ? { width: col.width } : {}}
                    >
                        <div className="content">
                            <div className="content__title">
                                {col.title}
                            </div>
                            {!hasChildren(col) &&
                                <div className="content__icons">
                                    {col.sorter && <SortIcon />}
                                    {col.filters && <FilterIcon />}
                                </div>
                            }

                        </div>
                    </th>
                ))}
            </tr>

        ))
    }

    return <>
        <thead className="table-head">
            {renderTableView(columns)}
        </thead >
    </>
}
export default HeaderView