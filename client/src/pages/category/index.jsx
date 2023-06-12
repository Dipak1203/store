import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../style.css";

const Category = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (category === "") {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      if (res.ok) {
        alert("नयाँ वडा सिर्जना गरियो");
        setCategory("");
        window.location.reload(true);
      } else {
        const errorData = await res.json(); // Extract the error message from the response
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/category");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, category) => {
    const confirmed = window.confirm(`पक्का चाहनु हुन्छ ${category} हताउन `);

    if (confirmed) {
      try {
        const res = await axios.delete(`http://localhost:8000/category/delete/${id}`);
        if (res) {
          alert(`${category} हेटयो`);
          window.location = "/category";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Apply search filter to data
  const filteredData = data.filter((item) =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main__content">
      <h1 className="text-center"> नयाँ प्रकार थप्नुहोस् </h1>
      <div className="create">
        <input
          placeholder=" नयाँ प्रकार थप्नुहोस्"
          name="category"
          value={category}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          थप्नुहोस्
        </button>
      </div>

      <div className="search mt-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search"
        />
      </div>

      <div className="table-container">
        <Table striped bordered hover className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>category</th>
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

      {filteredData.length > itemsPerPage && (
        <div className="pagination-container">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
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
