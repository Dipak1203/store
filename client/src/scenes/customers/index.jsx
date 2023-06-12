import {NavLink} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {Container} from 'react-bootstrap'
const Customer = () => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 8,
  });

  return (
    <div className='main__content'>
       <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
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