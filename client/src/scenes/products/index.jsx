import { NavLink, useParams } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styled.css';
import { Container } from 'react-bootstrap';
const Product = () => {
  const [data, setData] = useState([]);

  const {id} = useParams();
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/product');
      if (res.data && res.data.result) {
        setData(res.data.result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDelete = async(id) =>{
      const res = await axios.delete(`http://localhost:8000/product/delete/${id}`);
      if(res){
        alert("Deleted data");
        window.location.reload(true)
      }
  }

  useEffect(() => {
    fetchData();
  }, [id]);


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'details', headerName: 'Details', width: 90 },
    { field: 'sku', headerName: 'Symbol', width: 90 },
    { field: 'status', headerName: 'Status', width: 90 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <NavLink to={`/product/edit/${params.id}`}>Edit</NavLink>
          <button onClick={() => handleDelete(params.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className="main__content">
       <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
      <h3 className='text-center mt-4'>उत्पादन थप्नुहोस्</h3>
      <div className="create">
        <button>
          <NavLink to="/product/create">+ CREATE</NavLink>
        </button>
        <button>
          <NavLink to="/product/create">EXPORT</NavLink>
        </button>
      </div>

      <div style={{ height: 400, width: '50%', margin: '0 auto', marginTop: '20px' }}>
        <DataGrid
          columns={columns}
          rows={data}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default Product;
