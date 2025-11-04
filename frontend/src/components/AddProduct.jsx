import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    try {
      const res = await axios.post(
        "http://localhost:8080/api/product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product added successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Add Product</h2>
      <form className="addproduct-form" onSubmit={submitHandler}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Enter brand"
            value={product.brand}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Product description"
            value={product.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="form-row">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphone">Headphone</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>

        <div className="form-row">
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Available stock"
            value={product.stockQuantity}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label>Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={product.releaseDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label>Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        <div className="form-row checkbox-row">
          <label>
            <input
              type="checkbox"
              name="productAvailable"
              checked={product.productAvailable}
              onChange={(e) =>
                setProduct({ ...product, productAvailable: e.target.checked })
              }
            />
            Product Available
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
