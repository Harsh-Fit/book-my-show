import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    // Submit only if all input fields are set.. .
    if (!company || !name || !price || !category) {
      setError(true);
      return false;
    }
    // Further Code will run only if all input fields are set..
    console.log("Product Info -", company, name, price, category);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Product Added Successfully !!!");
    }
    console.log(result);

    setCompany("");
    setName("");
    setPrice("");
    setCategory("");
  };

  return (
    <div className="inputContainer">
      <h1>ADD PRODUCT</h1>
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
        <Button variant="primary" onClick={addProduct}>
          Add Product
        </Button>
      </form>
    </div>
  );
}

export default AddMovie;
