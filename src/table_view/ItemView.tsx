import React from "react";
import "./item_view_style.scss";
import { ItemViewProps } from ".";

const ItemView: React.FC<ItemViewProps> = (props) => {
    const { dataIndex, dataRow } = props
    const onRowClick = (item: any) => {
        window.alert(`${item}`)
    }
    return <tr className="item-view-row" onClick={() => onRowClick(dataRow)}>
        {dataRow.map((item, index) => (
            <td data-cell={dataIndex[index]} className={`col-${dataIndex[index]}`} key={index}>{item}</td>
        ))}
    </tr>
}
export default ItemView