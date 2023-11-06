import React from "react";
import "./header_view_style.scss";
import { ColumnType } from "./types";

interface Props {
    columns: ColumnType<any>[]
}
const HeaderView: React.FC<Props> = (props) => {
    const { columns } = props
    return <>
        <thead className="table-head">
            <tr>
                {/* <th>Name</th>
                <th>Poles</th>
                <th>Podiums</th>
                <th>Wins</th>
                <th>Career points</th>
                <th>Championships</th> */}
                {
                    columns.map(col => (
                        <th
                            key={col.key || col.dataIndex}
                            style={col.width ? { width: col.width + "px" } : {}}
                        >
                            {col.title}
                        </th>
                    ))
                }
            </tr>
        </thead >
    </>
}
export default HeaderView