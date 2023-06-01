

// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const Branch = () => {
  const [branch, setBranch] = useState('');
  const [data,setData] = useState([])
  const handleChange = (e) => {
    setBranch(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (branch === "") {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }

    const res = await fetch('http://localhost:8000/branch/create', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({branch})
    });
    
    if (res.ok) {
      alert("नयाँ शखा सिर्जना गरियो");
      setBranch("")
    } else {
      const errorData = await res.json(); // Extract the error message from the response
      alert(`Error: ${errorData.message}`);
    }
  }

  const handleDelete = async(id,wada) =>{
    const confirmed = window.confirm(`पक्का चाहनु हुन्छ ${wada} हताउन `);

    if(confirmed){
      try {
        const res = await axios.delete(`http://localhost:8000/category/delete/${id}`);
        if(res){
          alert(`${wada} हेटयो`);
          window.location = '/wada'
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchData = async() =>{
    const res = await axios.get("http://localhost:8000/branch");

    setData(res.data)

  }
  useEffect(() =>{
    fetchData();
  })
  return (
    <div className='main__content'>
      <h1 className='text-center'> नयाँ शखा थप्नुहोस् </h1>
      <div className='create'>  <input placeholder=' नयाँ शखा थप्नुहोस्' name='branch' value={branch} onChange={handleChange} />
        <button type='submit' onClick={handleClick}>
          थप्नुहोस्
        </button>
      </div>

      <div style={{ height: 400, width: '100', marginTop: '20px' }}>
      <table border="1px">
          <tr className='p-5'>
            <th>ID</th>
            <th>साखा </th>
            <th colSpan="2">Action</th>
          </tr>
          {
            data.map(({ id, branch }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{branch}</td>
                  <td><NavLink to={`/branch/update/${id}`}>Edit</NavLink></td>
                  <td><button onClick={() => handleDelete(id,branch)}>Delete</button></td>
                </tr>

              )
            })
          }

        </table>

      </div>
    </div>
  )
}

export default Branch