import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
const UpdateProduct = () => {
  const [wada, setWada] = useState([]);
  const [branch, setBranch] = useState([]);
  const [category, setCategory] = useState([]);

  const { id } = useParams();
  const [input, setInput] = useState({
    name: "",
    price: "",
    sku: "",
    details: "",
    wadaID: "",
    branchID: "",
    categoryID: "",
    status: "",
  });

  const navigate = useNavigate();

  const wadaAPI = "http://localhost:8000/wada";
  const categoryAPI = "http://localhost:8000/category";
  const branchAPI = "http://localhost:8000/branch";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  // Submit

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      `http://localhost:8000/product/edit/${id}`,
      input
    );
    if (res) {
      alert("सर समान उप्डेट");
      navigate("/product");
    }
  };

  const fetchData = async (wadaAPI, categoryAPI, branchAPI) => {
    const resWada = await axios.get(wadaAPI);
    const resCategory = await axios.get(categoryAPI);
    const resBranch = await axios.get(branchAPI);

    setWada(resWada.data);
    setCategory(resCategory.data);
    setBranch(resBranch.data);
  };

  const fetchSingleData = async () => {
    const res = await axios.get(`http://localhost:8000/product/get/${id}`);
    const data = res.data.result[0];
    setInput(data);
  };

  useEffect(() => {
    fetchData(wadaAPI, categoryAPI, branchAPI);
    fetchSingleData();
  }, []);
  return (
    <div className="main__content">
      <div className="product">
        <form>
          <div className="name">
            <div className="name2">
              <input
                type="text"
                placeholder="सर समानको नाम......*"
                name="name"
                value={input.name}
                onChange={handleChange}
              />

              <input
                type="number"
                placeholder="सर समानको मुल्य........ *"
                name="price"
                value={input.price}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              placeholder="सन्केत नम्बर ....."
              name="sku"
              value={input.sku}
              onChange={handleChange}
            />
            <textarea
              placeholder="समान को विवरण........."
              rows="3"
              cols="5"
              className="p-3 mb-3"
              name="details"
              value={input.details}
              onChange={handleChange}
            ></textarea>
            <select
              className="mt-2"
              name="wadaID"
              value={input.wadaID}
              onChange={handleChange}
            >
              <option value="disable">वडा छान्नुहोस्</option>
              {wada.map(({ id, wada }) => {
                return (
                  <option value={id} key={id}>
                    {wada}
                  </option>
                );
              })}
            </select>
            <select
              className="mt-2"
              name="branchID"
              value={input.branchID}
              onChange={handleChange}
            >
              <option value="disable">शखा छान्नुहोस्</option>
              {branch.map(({ id, branch }) => {
                return (
                  <option value={id} key={id}>
                    {branch}
                  </option>
                );
              })}
            </select>
            <select
              className="mt-2"
              name="categoryID"
              value={input.categoryID}
              onChange={handleChange}
            >
              <option value="disable"> समान को प्रकार छान्नुहोस्</option>
              {category.map(({ id, category }) => {
                return (
                  <option value={id} key={id}>
                    {category}
                  </option>
                );
              })}
            </select>

            <div className="name2">
              स्थिति{" "}
              <input
                type="radio"
                name="status"
                value="save"
                checked={input.status === "save"}
                onChange={handleChange}
              />
              <label>सेव </label>
              <input
                type="radio"
                name="status"
                value="draft"
                checked={input.status === "draft"}
                onChange={handleChange}
              />
              <label>द्राफ्त </label>
            </div>

            <div className="d-flex justify-content-center mt-4 gap-5">
              <button onClick={handleUpdate}> पेश गर्नुहोस</button>
              <NavLink to="/product">
                <button>Back</button>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
