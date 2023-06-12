import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
const CategoryUpdate = () => {
  const [data, setData] = useState("");
  const [updateCategory, setUpdatCategory] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/category/get/${id}`);
      const jsonData = res.data;
      setData(JSON.stringify(jsonData, null, 2));
      const category = jsonData.result[0].wada; // Extract the "wada" value from the JSON object
      setUpdatCategory(category); // Update inputValue with the extracted "wada" value
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:8000/category/edit/${id}`, {
        updateCategory: updateCategory,
      });
      if(res){
        // alert("Updated success");
        navigate('/category')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__content">
      <input
        type="text"
        name="updateCategory"
        value={updateCategory}
        onChange={(e) => setUpdatCategory(e.target.value)}
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

export default CategoryUpdate;
