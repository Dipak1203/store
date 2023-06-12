import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import '../style.css';
const Category = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (category === "") {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }

    const res = await fetch("http://localhost:8000/category/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    if (res.ok) {
      alert("नयाँ श्रेणी सिर्जना गरियो");
      setCategory("");
      window.location.reload(true)
    } else {
      const errorData = await res.json(); // Extract the error message from the response
      alert(`Error: ${errorData.message}`);
    }
  };
  const handleDelete = async (id, wada) => {
    const confirmed = window.confirm(`पक्का चाहनु हुन्छ ${wada} हताउन `);

    if (confirmed) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/category/delete/${id}`
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


    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/category");

    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="main__content">
      <h1 className="text-center"> नयाँ श्रेणी थप्नुहोस् </h1>
      <div className="create">
        {" "}
        <input
          placeholder=" नयाँ श्रेणी थप्नुहोस्"
          name="category"
          value={category}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          थप्नुहोस्
        </button>
      </div>

      <div style={{ height: 400, width: "40%", marginTop: "20px" }}>
        <Table striped bordered hover style={{marginLeft:"60%"}} className='p-5'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
          {currentItems.map(({ id, category }, index) => {
              const num = indexOfFirstItem + index + 1;
              return (
                <tr key={id}>
                  <td>{num}</td>
                  <td>{category}</td>
                  <td>
                    <NavLink to={`/category/update/${id}`}>
                      <button className="edit-button">Edit</button>
                    </NavLink>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(id, category)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {data.length > itemsPerPage && (
        <div className="pagination-container">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Category;
