import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";

const BranchUpdate = () => {
  const [data, setData] = useState("");
  const [updateBranch, setUpdateBranch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()

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
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:8000/branch/edit/${id}`, {
        updateBranch: updateBranch,
      });
      if(res){
        // alert("Updated success");
        navigate('/branch')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__content">
      <input
        type="text"
        name="updateBranch"
        value={updateBranch}
        onChange={(e) => setUpdateBranch(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default BranchUpdate;
