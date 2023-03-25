import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    // console.log(params);
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    // console.warn(result);
    setCompany(result.company);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
  };

  const updateProduct = async () => {
    // console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        price,
        category,
        company,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    if (result) {
      alert("Product Updated Successfully !!!");
    }
    console.log(result);

    setCompany("");
    setName("");
    setPrice("");
    setCategory("");

    navigate("/");
  };

  return (
    <div className="inputContainer">
      <h1>UPDATE PRODUCT</h1>
      <form>
        <label>
          <h6>Company / Brand : </h6>
        </label>{" "}
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        {error && !company && (
          <span className="invalid">Enter valid company name</span>
        )}
        <br />
        <label>
          <h6>Product Name : </h6>
        </label>{" "}
        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {error && !name && <span className="invalid">Enter valid name</span>}
        <br />
        <label>
          <h6>Product Price : </h6>
        </label>{" "}
        <input
          type="text"
          placeholder="Enter Product Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        {error && !price && <span className="invalid">Enter valid price</span>}
        <br />
        <label>
          <h6>Product Category : </h6>
        </label>{" "}
        <input
          type="text"
          placeholder="Enter Product Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        {error && !category && (
          <span className="invalid">Enter valid category</span>
        )}
        <br />
        <Button variant="primary" onClick={updateProduct}>
          Update Product
        </Button>
      </form>
    </div>
  );
}

export default UpdateProduct;
