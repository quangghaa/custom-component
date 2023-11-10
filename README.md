# Flexible React Table Component

This project provide a simple flexible table component

Requirement:

-   Nodejs >= 18
-   Vite + SWC project

## Table Features:

Support:

-   Mobile responsive
-   Scroll 2 dimensions
-   Columns with children
-   Custom render cell
-   Sort and Filter option

## Table Properties:

`columns: ColumnType<any>[]`: Column list, define column title, dataIndex, width height and sort + filter option
`data: any[]`: Data list user define  
`scroll: {x: number | string, y: number}`: Scroll x and y axies, (px and %)

## Example of use:

Use with built in HeaderView and ItemView component:

-   Define `data` object

```js
interface UserType {
    fullname?: Fullname
    firstName?: string,
    lastName?: string,
    poles: number
    podiums: number,
    wins: number,
    careerPoints: number,
    championships: number
}
const data: UserType[] = [
    {
        firstName: "Max",
        lastName: "Verstappen",
        poles: 22,
        podiums: 80,
        wins: 37,
        careerPoints: 2080.5,
        championships: 2,
    },
    {
        firstName: "Lewis",
        lastName: "Hamilton",
        poles: 101,
        podiums: 101,
        wins: 100,
        careerPoints: 4050,
        championships: 7,
    },
    {
        firstName: "Michael",
        lastName: "Schumacher",
        poles: 68,
        podiums: 155,
        wins: 91,
        careerPoints: 1566,
        championships: 7,
    }
]

```

-   Define `columns`

```js
const columns: ColumnType<UserType>[] = [
    {
        title: "Full name",
        children: [
            {
                title: "First Name",
                dataIndex: "firstName",
                key: "firstName",
                width: "20%",
                sorter: (a, b) => a.firstName!.localeCompare(b.firstName!),
                render: (value: any) => <a href="#" style={{ color: "green" }}>{value}</a>,
                filters: [{ text: "Alain", value: "alain" }, { text: "Max", value: "max" }],
                onFilter: (value, record) => record.firstName ? record.firstName.toLowerCase().includes(value.toLowerCase()) : false
            },
            {
                title: "Last Name",
                dataIndex: "lastName",
                key: "lastName",
                width: "20%",
            },
        ]
    },
    {
        title: "Object",
        dataIndex: "fullName",
        key: "fullName",
        render: (value: any, record: any, index: number) => <a href="#">{record.firstName}/{record.lastName}/{typeof value}</a>
    },
    {
        title: "Poles",
        dataIndex: "poles",
        key: "poles",
    },
    {
        title: "Podiums",
        dataIndex: "podiums",
        key: "podiums",
    },
    {
        title: "Wins",
        dataIndex: "wins",
        key: "wins",
    },
    {
        title: "Career points",
        dataIndex: "careerPoints",
        key: "careerPoints",
    },
    {
        title: "Championships",
        dataIndex: "championships",
        key: "championships",
    },
]
```

-   Using `TableView`:

```js
<TableView columns={columns} data={data} scroll={{ x: "120%", y: 600 }} />
```
