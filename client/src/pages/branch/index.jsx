import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../style.css";
import { Container } from "react-bootstrap";

const Branch = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [branch, setBranch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (branch === "") {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/branch/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branch }),
      });

      if (res.ok) {
        alert("नयाँ branch सिर्जना गरियो");
        setBranch("");
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
      const res = await axios.get("http://localhost:8000/branch");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, branch) => {
    const confirmed = window.confirm(`पक्का चाहनु हुन्छ ${branch} हताउन `);

    if (confirmed) {
      try {
        const res = await axios.delete(`http://localhost:8000/branch/delete/${id}`);
        if (res) {
          alert(`${branch} हेटयो`);
          window.location = "/branch";
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
    item.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main__content">
       <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
      <h1 className="text-center"> नयाँ प्रकार थप्नुहोस् </h1>
      <div className="create">
        <input
          placeholder=" नयाँ प्रकार थप्नुहोस्"
          name="branch"
          value={branch}
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
        <Table striped bordered hover className="branch-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>branch</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(({ id, branch }, index) => {
              const num = indexOfFirstItem + index + 1;
              return (
                <tr key={id}>
                  <td>{num}</td>
                  <td>{branch}</td>
                  <td>
                    <NavLink to={`/branch/update/${id}`}>
                      <button className="edit-button">Edit</button>
                    </NavLink>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(id, branch)}>
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

export default Branch;
