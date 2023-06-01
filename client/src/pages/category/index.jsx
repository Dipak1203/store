

import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useEffect } from 'react';
import axios from 'axios'
import {NavLink} from 'react-router-dom'
const Category = () => {
  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 100,
  //   maxColumns: 8,
  // });


  const [category, setCategory] = useState('');
  const [data, setData] = useState([])
  const handleChange = (e) => {
    setCategory(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (category === "") {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }

    const res = await fetch('http://localhost:8000/category/create', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({category})
    });
    
    if (res.ok) {
      alert("नयाँ श्रेणी सिर्जना गरियो");
      setCategory("")
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
  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/category");

    setData(res.data)

  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='main__content'>
      <h1 className='text-center'> नयाँ श्रेणी थप्नुहोस् </h1>
      <div className='create'>  <input placeholder=' नयाँ श्रेणी थप्नुहोस्' name='category' value={category} onChange={handleChange} />
        <button type='submit' onClick={handleClick}>
          थप्नुहोस्
        </button>
      </div>

      <div style={{ height: 400, width: '100', marginTop: '20px' }}>
      <table>
          <tr className='p-5'>
            <th>ID</th>
            <th>प्रकार </th>
            <th colSpan="2">Action</th>
          </tr>
      {
            data.map(({ id, category },index) => {
              const series = index+1
              return (
                <tr key={id}>
                  <td>{series}</td>
                  <td>{category}</td>
                  <td><NavLink to={`/category/update/${id}`}>Edit</NavLink></td>
                  <td><button onClick={() => handleDelete(id,category)}>Delete</button></td>
                </tr>

              )
            })
          }
        </table>
      </div>
    </div>
  )
}

export default Category