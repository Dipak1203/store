import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";

const Wada = () => {
  const [data, setData] = useState([]);
  const [wada, setWada] = useState("");
  const handleChange = (e) => {
    setWada(e.target.value);
    setUpdateWada(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (wada === "") {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }

    const res = await fetch("http://localhost:8000/wada/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wada }),
    });

    if (res.ok) {
      alert("नयाँ वडा सिर्जना गरियो");
      setWada("");
      window.location.reload(true)
    } else {
      const errorData = await res.json(); // Extract the error message from the response
      alert(`Error: ${errorData.message}`);
    }
  };

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/wada");
    setData(res.data);
  };

  // for delete

  const handleDelete = async (id, wada) => {
    const confirmed = window.confirm(`पक्का चाहनु हुन्छ ${wada} हताउन `);

    if (confirmed) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/wada/delete/${id}`
        );
        if (res) {
          alert(`${wada} हेटयो`);
          window.location = "/wada";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main__content">
      <h1 className="text-center"> नयाँ वडा थप्नुहोस् </h1>
      <div className="create">
        <input
          placeholder=" नयाँ श्रेणी थप्नुहोस्"
          name="category"
          value={wada}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          थप्नुहोस्
        </button>
      </div>

      <div style={{ height: 400, width: "40%", marginTop: "20px" }}>
        <Table
          striped
          bordered
          hover
          style={{ marginLeft: "60%" }}
          className="p-5"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Wada</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, wada }, index) => {
              const num = index + 1;
              return (
                <tr key={id}>
                  <td>{num}</td>
                  <td>{wada}</td>
                  <td>
                    <NavLink to={`/wada/update/${id}`}>
                      <button>Edit</button>
                    </NavLink>
                  </td>
                  <td>
                  <button onClick={() => handleDelete(id, wada)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Wada;
