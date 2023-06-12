import { NavLink } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styled.css';
import { Container } from 'react-bootstrap';
const Users = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/users/data`);
      if (res.data && res.data.result) {
        setData(res.data.result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data)
  const handleDelete = async(id) =>{
    const confirmed = window.confirm(`पक्का चाहनु हुन्छ  हताउन `);

    if(confirmed){
      try {
        const res = await axios.delete(`http://localhost:8000/users/delete/${id}`);
        if(res){
          alert(`हेटयो`);
          window.location.reload(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Role', width: 90 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <NavLink to={`/users/edit/${params.id}`}>Edit</NavLink>
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
      <h2 className='text-center mt-4'>प्रयोगकर्ताहरू थप्नुहोस्</h2>
      <div className="create">
        <button>
          <NavLink to="/users/create">+ CREATE</NavLink>
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

export default Users;
