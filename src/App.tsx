import './App.css'
import { TableView } from '..';
import HeaderView from './table_view/HeadView';
import ItemView from './table_view/ItemView';
import { DataType } from './table_view/TableView';
import { ColumnType } from './table_view/types';
function App() {
  const dataIndex = ["name", "poles", "podiums", "wins", "career points", "championships"]
  const data = [
    ["Max Verstappen", "22", "80", "37", "2080.5", "2"],
    ["Lewis Hamilton", "101", "101", "100", "4050", "7"],
    ["Michael Schumacher", "68", "155", "91", "1566", "7"],
    ["Juan Manuel Fangio", "29", "35", "24", "277.64", "5"],
    ["Alain Prost", "33", "106", "51", "798.5", "4"],
    ["Sebastian Vettel", "57", "122", "53", "2847", "4"],
    ["Ayrton Senna", "65", "80", "41", "614", "3"],
    ["Nelson Piquet", "24", "60", "23", "485.5", "3"],
    ["Jack Brabham", "13", "31", "14", "261", "3"],
    ["Niki Lauda", "24", "54", "25", "420.5", "3"],
    ["Jackie Stewart", "17", "43", "27", "360", "3"],
    ["Alberto Ascari", "14", "17", "13", "107.64", "2"],
    ["Graham Hill", "13", "36", "14", "289", "2"],
    ["Mika Häkkinen", "26", "51", "20", "420", "2"],
  ];
  const dataList: DataType = {
    dataIndex: dataIndex,
    data: data
  }

  // Define header view
  interface UserType {
    name: string
    age: number
  }
  const columns: ColumnType<UserType>[] = [
    {
      title: "NameA",
      dataIndex: "name",
      key: "name",
      // width: 300,
    },
    {
      title: "Poles",
      dataIndex: "poles",
      key: "poles",
      // width: 200,
    },
    // {
    //   title: "Podiums",
    //   dataIndex: "podiums",
    //   key: "podiums",
    //   width: 200,
    // },
    // {
    //   title: "Wins",
    //   dataIndex: "wins",
    //   key: "wins",
    //   width: 200,
    // },
    // {
    //   title: "Career points",
    //   dataIndex: "careerPoints",
    //   key: "careerPoints",
    //   width: 300,
    // },
    // {
    //   title: "Championships",
    //   dataIndex: "championships",
    //   key: "championships",
    //   width: 300,
    // },
  ]

  const DemoHeaderView = () => (
    <HeaderView columns={columns} />
  )

  return (
    <div className='wrapper'>
      < h1 > Responsive Tables</h1 >
      <TableView
        headerView={<DemoHeaderView />}
        ItemView={ItemView}
        dataList={dataList}
      />
    </div>
  )
}

export default App
