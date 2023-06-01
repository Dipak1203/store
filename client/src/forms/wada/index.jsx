import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";

const WadaUpdate = () => {
  const [data, setData] = useState("");
  const [updateWada, setUpdateWada] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/wada/get/${id}`);
      const jsonData = res.data;
      setData(JSON.stringify(jsonData, null, 2));
      const updateWada = jsonData.result[0].wada; // Extract the "wada" value from the JSON object
      setUpdateWada(updateWada); // Update inputValue with the extracted "wada" value
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
      const res = await axios.put(`http://localhost:8000/wada/edit/${id}`, {
        updateWada: updateWada,
      });
      if(res){
        // alert("Updated success");
        navigate('/wada')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__content">
      <input
        type="text"
        name="updateWada"
        value={updateWada}
        onChange={(e) => setUpdateWada(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default WadaUpdate;
