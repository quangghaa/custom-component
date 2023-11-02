import React from "react";
import "./header_view_style.scss";

interface Props {

}
const HeaderView: React.FC<Props> = (props) => {
    return <thead className="table-head">
        <tr>
            <th>Name</th>
            <th>Poles</th>
            <th>Podiums</th>
            <th>Wins</th>
            <th>Career points</th>
            <th>Championships</th>
        </tr>
    </thead>
}
export default HeaderView