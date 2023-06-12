import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
const BranchUpdate = () => {
  const [data, setData] = useState("");
  const [updateBranch, setUpdateBranch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/branch/get/${id}`);
      const jsonData = res.data;
      setData(JSON.stringify(jsonData, null, 2));
      const updateBranch = jsonData.result[0].wada; // Extract the "wada" value from the JSON object
      setUpdateBranch(updateBranch); // Update inputValue with the extracted "wada" value
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/branch/edit/${id}`, {
        updateBranch: updateBranch,
      });
      if (res) {
        // alert("Updated success");
        navigate("/branch");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__content">
        <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
      <input
        type="text"
        name="updateBranch"
        value={updateBranch}
        onChange={(e) => setUpdateBranch(e.target.value)}
      />
      <div className="d-flex justify-content-center mt-4 gap-5">
        <button onClick={handleUpdate}>Update</button>
        <NavLink to="/branch">
          <button>Back</button>
        </NavLink>
      </div>
    </div>
  );
};

export default BranchUpdate;
