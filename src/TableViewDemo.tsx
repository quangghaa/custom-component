import { ColumnType } from "./table_view/types"

// Define header view
type Fullname = {
    firstName: string
    lastName: string
}
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
export const columns: ColumnType<UserType>[] = [
    {
        title: "Full name",
        children: [
            {
                title: "First Name",
                dataIndex: "firstName",
                key: "firstName",
                width: "20%",
                sorter: (a, b) => a.firstName!.localeCompare(b.firstName!),
                render: (value: any) => <a href="#" style={{ color: "green" }}>{value}</a>
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

export const dataOld: UserType[] = [
    {
        fullname: { firstName: "Max", lastName: "Verstappen" },
        poles: 22,
        podiums: 80,
        wins: 37,
        careerPoints: 2080.5,
        championships: 2,
    },
    {
        fullname: { firstName: "Lewis", lastName: "Hamilton" },
        poles: 101,
        podiums: 101,
        wins: 100,
        careerPoints: 4050,
        championships: 7,
    },
    {
        fullname: { firstName: "Michael", lastName: "Schumacher" },
        poles: 68,
        podiums: 155,
        wins: 91,
        careerPoints: 1566,
        championships: 7,
    },
    {
        fullname: { firstName: "Juan", lastName: "Manuel Fangio" },
        poles: 29,
        podiums: 35,
        wins: 24,
        careerPoints: 277.64,
        championships: 5,
    },
    {
        fullname: { firstName: "Alain", lastName: "Prost" },
        poles: 33,
        podiums: 106,
        wins: 51,
        careerPoints: 798.5,
        championships: 4,
    },
    {
        fullname: { firstName: "Sebastian", lastName: "Vettel" },
        poles: 57,
        podiums: 122,
        wins: 53,
        careerPoints: 2847,
        championships: 4,
    },
    {
        fullname: { firstName: "Ayrton", lastName: "Senna" },
        poles: 65,
        podiums: 80,
        wins: 41,
        careerPoints: 614,
        championships: 3,
    },
    {
        fullname: { firstName: "Nelson", lastName: "Piquet" },
        poles: 24,
        podiums: 60,
        wins: 23,
        careerPoints: 485.5,
        championships: 3,
    },
    {
        fullname: { firstName: "Jack", lastName: "Brabham" },
        poles: 13,
        podiums: 31,
        wins: 14,
        careerPoints: 261,
        championships: 3,
    },
    {
        fullname: { firstName: "Niki", lastName: "Lauda" },
        poles: 24,
        podiums: 54,
        wins: 25,
        careerPoints: 420.5,
        championships: 3,
    },
    {
        fullname: { firstName: "Jackie", lastName: "Stewart" },
        poles: 17,
        podiums: 43,
        wins: 27,
        careerPoints: 360,
        championships: 3,
    },
    {
        fullname: { firstName: "Alberto", lastName: "Ascari" },
        poles: 14,
        podiums: 17,
        wins: 13,
        careerPoints: 107.64,
        championships: 2,
    },
    {
        fullname: { firstName: "Graham", lastName: "Hill" },
        poles: 13,
        podiums: 36,
        wins: 14,
        careerPoints: 289,
        championships: 2,
    },
    {
        fullname: { firstName: "Mika", lastName: "Häkkinen" },
        poles: 26,
        podiums: 51,
        wins: 20,
        careerPoints: 420,
        championships: 2,
    },
];

export const data: UserType[] = [
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
    },
    {
        firstName: "Juan",
        lastName: "Manuel Fangio",
        poles: 29,
        podiums: 35,
        wins: 24,
        careerPoints: 277.64,
        championships: 5,
    },
    {
        firstName: "Alain",
        lastName: "Prost",
        poles: 33,
        podiums: 106,
        wins: 51,
        careerPoints: 798.5,
        championships: 4,
    },
    {
        firstName: "Sebastian",
        lastName: "Vettel",
        poles: 57,
        podiums: 122,
        wins: 53,
        careerPoints: 2847,
        championships: 4,
    },
    {
        firstName: "Ayrton",
        lastName: "Senna",
        poles: 65,
        podiums: 80,
        wins: 41,
        careerPoints: 614,
        championships: 3,
    },
    {
        firstName: "Nelson",
        lastName: "Piquet",
        poles: 24,
        podiums: 60,
        wins: 23,
        careerPoints: 485.5,
        championships: 3,
    },
    {
        firstName: "Jack",
        lastName: "Brabham",
        poles: 13,
        podiums: 31,
        wins: 14,
        careerPoints: 261,
        championships: 3,
    },
    {
        firstName: "Niki",
        lastName: "Lauda",
        poles: 24,
        podiums: 54,
        wins: 25,
        careerPoints: 420.5,
        championships: 3,
    },
    {
        firstName: "Jackie",
        lastName: "Stewart",
        poles: 17,
        podiums: 43,
        wins: 27,
        careerPoints: 360,
        championships: 3,
    },
    {
        firstName: "Alberto",
        lastName: "Ascari",
        poles: 14,
        podiums: 17,
        wins: 13,
        careerPoints: 107.64,
        championships: 2,
    },
    {
        firstName: "Graham",
        lastName: "Hill",
        poles: 13,
        podiums: 36,
        wins: 14,
        careerPoints: 289,
        championships: 2,
    },
    {
        firstName: "Mika",
        lastName: "Häkkinen",
        poles: 26,
        podiums: 51,
        wins: 20,
        careerPoints: 420,
        championships: 2,
    },
];

