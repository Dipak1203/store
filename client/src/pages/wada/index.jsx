
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Wada = () => {
  const [data, setData] = useState([])
  const [wada, setWada] = useState('');
  const [updateWada, setUpdateWada] = useState('');
  const [editMode] = useState(false);
  const handleChange = (e) => {
    setWada(e.target.value);
    setUpdateWada(e.target.value)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (wada === "") {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }

    const res = await fetch('http://localhost:8000/wada/create', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wada })
    });

    if (res.ok) {
      alert("नयाँ वडा सिर्जना गरियो");
      setWada("")
    } else {
      const errorData = await res.json(); // Extract the error message from the response
      alert(`Error: ${errorData.message}`);
    }
  }

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/wada");
    setData(res.data)
  }



  // for delete 

  const handleDelete = async(id,wada) =>{
    const confirmed = window.confirm(`पक्का चाहनु हुन्छ ${wada} हताउन `);

    if(confirmed){
      try {
        const res = await axios.delete(`http://localhost:8000/wada/delete/${id}`);
        if(res){
          alert(`${wada} हेटयो`);
          window.location = '/wada'
        }
      } catch (error) {
        console.log(error)
      }
    }
  }



  const updateData = async(id) =>{
    const res = await axios.put(`http://localhost:8000/wada/edit/${id}`);
    if(res){
      alert("udpated")
      setUpdateWada("")
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='main__content'>
      <h1 className='text-center'> नयाँ वडा थप्नुहोस् </h1>
      <div className='create' style={{display:'flex',flexDirection:'column'}}> 
       <div>
       <input placeholder=' नयाँ वडा थप्नुहोस्' name='wada' value={wada} onChange={handleChange} />
        <button type='submit' onClick={handleClick}>
          थप्नुहोस्
        </button>
       </div>
        {
          editMode ? (
            <div style={{display:'flex'}}>
            <input type='text' name='updateWada' value={updateWada} onChange={handleChange}/>
            <button type='submit' onClick={updateData}>अपडेट गर्नुहोस्</button>
            </div>
          ): (<></>)
        }
      </div>

      <div style={{ height: 400, width: '100', marginTop: '20px' }}>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Wada</th>
          <th colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody>
          {
            data.map(({ id, wada },index) => {
              const num = index+ 1;
              return (
                <tr key={id}>
                  <td>{num}</td>
                  <td>{wada}</td>
                  <td><NavLink to={`/wada/update/${id}`}><button>Edit</button></NavLink></td>
                  <td><button onClick={() => handleDelete(id,wada)}>Delete</button></td>
                </tr>

              )
            })
          }
      </tbody>
      </Table>

      </div>
    </div>
  )
}

export default Wada