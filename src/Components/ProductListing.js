import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let data = await result.json();
    console.log("Product List -", data);
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
      alert("Product will be deleted permanently !!!");
    }
  };

  const update = (id) => {
    navigate(`/update/${id}`);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-table">
      <h1>PRODUCT LIST</h1>
      <br />
      <input
        className="searchbox"
        type="search"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <table>
        <tbody>
          <tr>
            <td>Sr.No</td>
            <td>Brand</td>
            <td>Product</td>
            <td>Category</td>
            <td>Price</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
          {products.length > 0 ? (
            products.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.company}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <Button onClick={() => update(item._id)}>Update</Button>
                </td>
                <td>
                  <Button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                <h1>NO RESULT FOUND</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListing;
