import './App.css'
import { TableView } from '..';
import { columns, data } from './TableViewDemo';
function App() {

  return (
    <div className='wrapper'>
      < h1 > Responsive Tables</h1 >
      <TableView
        columns={columns}
        data={data}
        scroll={{ x: "120%", y: 600 }}
      />
    </div>
  )
}

export default App
