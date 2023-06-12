import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
const UpdateUsers = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
  });

  const navigate = useNavigate()

  const { id } = useParams();

  const { username, email, phone, role } = input;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:8000/users/edit/${id}`,
      input
    );
    if(res){
        navigate('/users');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/users/get/${id}`);
        console.log(res.data.result[0].username);
        const data = res.data.result[0];
        // const jsonData = res.data;
        // const data = jsonData.result[0].wada || {}; // Add a conditional check for empty data

        setInput(data); // Update the input state with the extracted data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="main__content">
        <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
      <div className="product">
        <form>
          <div className="name">
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="User Name"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="User Email *"
              required
            />
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="user phone*"
              required
            />
            <select name="role" value={role} onChange={handleChange}>
              <option>Please Select the Role</option>
              <option value="super_admin">super_admin</option>
              <option value="users">users</option>
            </select>
            <button type="submit" onClick={handleUpdate}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUsers;
