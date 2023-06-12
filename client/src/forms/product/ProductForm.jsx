import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
const ProductForm = () => {
  const [wada, setWada] = useState([]);
  const [branch, setBranch] = useState([]);
  const [category, setCategory] = useState([]);

  const [input, setInput] = useState({
    name: "",
    price: "",
    symbolNumber: "",
    details: "",
    wadaID: "",
    branchID: "",
    categoryID: "",
    status: "",
  });
  const wadaAPI = "http://localhost:8000/wada";
  const categoryAPI = "http://localhost:8000/category";
  const branchAPI = "http://localhost:8000/branch";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  // Submit

  const handleClick = async (e) => {
    e.preventDefault();

    const {
      name,
      branchID,
      categoryID,
      details,
      price,
      status,
      wadaID,
      symbolNumber,
    } = input;

    if (
      name === "" ||
      branchID === "" ||
      categoryID === "" ||
      details === "" ||
      price === "" ||
      status === "" ||
      wadaID === "" ||
      symbolNumber === ""
    ) {
      alert("कृपया फारम भर्नुहोस्");
      return;
    }
    const res = await axios.post("http://localhost:8000/product/create", input);
    if (res) {
      alert("सर समान सुरछित राखियो ");
      setInput({
        name: "",
        price: "",
        symbolNumber: "",
        details: "",
        wadaID: "",
        branchID: "",
        categoryID: "",
        status: "",
      });
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
  useEffect(() => {
    fetchData(wadaAPI, categoryAPI, branchAPI);
  }, []);
  // console.log(wada)
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
              name="symbolNumber"
              value={input.symbolNumber}
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

            <button type="submit" onClick={handleClick}>
              पेश गर्नुहोस
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
