import React from "react";
import "./item_view_style.scss";

export interface ItemViewProps {
    dataIndex: string[]
    dataRow: string[]
}
const ItemViewV2: React.FC<ItemViewProps> = (props) => {
    const { dataIndex, dataRow } = props
    return <tr className="item-view-row">
        {dataRow.map((item, index) => (
            <td data-cell={dataIndex[index]} key={index}>{item}</td>
        ))}
    </tr>
}
export default ItemViewV2