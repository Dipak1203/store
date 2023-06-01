import {NavLink} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
const Customer = () => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 8,
  });

  return (
    <div className='main__content'>
      <div className='create'>
        <button>
          <NavLink to="/customer/create">
            + CREATE
          </NavLink>
        </button>
      </div>

      <div  style={{ height: 400, width: '100',marginTop:'20px'}}>
      <DataGrid
        {...data}
        slots={{
          toolbar: GridToolbar,
        }}
      />
      </div>
    </div>
  )
}

export default Customer