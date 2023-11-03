# Flexible React Table Component

This project provide a simple flexible table component

Requirement:

-   Nodejs >= 18
-   Vite + SWC project

## Example of use:

Use with built in HeaderView and ItemView component:

-   Import `HeaderView` and `ItemView` components

```js
import HeaderView from "./table_view/HeadView";
import ItemView from "./table_view/ItemView";
```

-   Define `dataList` object of type `DataType` from `table_view`:

```js
const dataIndex = ["name", "poles", "podiums", "wins", "career points", "championships"];
const data = [
    ["Max Verstappen", "22", "80", "37", "2080.5", "2"],
    ["Lewis Hamilton", "101", "101", "100", "4050", "7"],
    ["Michael Schumacher", "68", "155", "91", "1566", "7"],
    ["Juan Manuel Fangio", "29", "35", "24", "277.64", "5"],
];
const dataList: DataType = {
    dataIndex: dataIndex,
    data: data,
};
```

-   Using `TableView`:

```js
<TableView headerView={<HeaderView />} ItemView={ItemView} dataList={dataList} />
```

Use with custom HeaderView and ItemView component:

-   Define your `HeaderView` component:

```js
interface Props {}
const HeaderView: React.FC<Props> = (props) => {
    return (
        <>
            <thead className="table-head">
                <tr>
                    <th>Name</th>
                    <th>Poles</th>
                    <th>Podiums</th>
                    <th>Wins</th>
                    <th>Career points</th>
                    <th>Championships</th>
                </tr>
            </thead>
        </>
    );
};
export default HeaderView;
```

-   Define `ItemView` component:

*   Import `ItemViewProps` from `table_view` component

```js
import { ItemViewProps } from ".";
```

-   Create `ItemView` component:

```js
const ItemView: React.FC<ItemViewProps> = (props) => {
    const { dataIndex, dataRow } = props;
    const onRowClick = (item: any) => {
        window.alert(`${item}`);
    };
    return (
        <tr className="item-view-row" onClick={() => onRowClick(dataRow)}>
            {dataRow.map((item, index) => (
                <td data-cell={dataIndex[index]} className={`col-${dataIndex[index]}`} key={index}>
                    {item}
                </td>
            ))}
        </tr>
    );
};
export default ItemView;
```

-   Create `dataList` object data:

```js
const dataIndex = ["name", "poles", "podiums", "wins", "career points", "championships"];
const data = [
    ["Max Verstappen", "22", "80", "37", "2080.5", "2"],
    ["Lewis Hamilton", "101", "101", "100", "4050", "7"],
    ["Michael Schumacher", "68", "155", "91", "1566", "7"],
    ["Juan Manuel Fangio", "29", "35", "24", "277.64", "5"],
];
const dataList: DataType = {
    dataIndex: dataIndex,
    data: data,
};
```

-   Using `TableView` component:

```js
<TableView headerView={<HeaderView />} ItemView={ItemView} dataList={dataList} />
```

