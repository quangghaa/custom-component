import React, { useRef } from "react";
import "./header_view_style.scss";
import { ColumnType, SortOrder } from "./types";
import SortIcon from "../component/sort_icon/SortIcon";
import FilterIcon from "../component/filter_icon/FilterIcon";
import { hasChildren } from "./common";

interface Props {
    columns: ColumnType<any>[]
    handleSort: (direction: SortOrder, sorter: (a: any, b: any) => number) => void
}
const HeaderView: React.FC<Props> = (props) => {
    const { columns, handleSort } = props
    const sortClicked = useRef(0)

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

    function renderHeaderView(columns: ColumnType<any>[]) {
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
                        onClick={col.sorter ? (e) => onSort(e, col.sorter!) : undefined}
                    >
                        <div className="content">
                            <div className="content__title">
                                {col.title}
                            </div>
                            {!hasChildren(col) &&
                                <div className="content__icons">
                                    {col.sorter && <SortIcon sortOrder={(sortClicked.current === 0) ? null : (sortClicked.current === 1 ? "ascending" : "descending")} />}
                                    {col.filters && <FilterIcon />}
                                </div>
                            }

                        </div>
                    </th>
                ))}
            </tr>

        ))
    }

    function onSort(e: any, sorter: (a: any, b: any) => number) {
        e.stopPropagation()
        sortClicked.current = sortClicked.current < 2 ? sortClicked.current + 1 : 0
        switch (sortClicked.current) {
            case 0:
                console.log(">> direction: null")
                handleSort(null, sorter)
                break
            case 1:
                console.log(">> direction: ascending")
                handleSort("ascending", sorter)
                break
            case 2:
                console.log(">> direction: descending")
                handleSort("descending", sorter)
                break
            default:
                break
        }

    }

    return <>
        <thead className="table-head">
            {renderHeaderView(columns)}
        </thead >
    </>
}
export default HeaderView