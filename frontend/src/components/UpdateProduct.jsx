import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios"; // Use your configured axios instance
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  // Fetch product data from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/product/${id}`);
        setProduct(res.data);

        // Fetch image separately
        const imageRes = await axios.get(`/product/${id}/image`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(imageRes.data);
        setImagePreview(imageUrl);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Only append new image if user selected one
    if (image) {
      formData.append("imageFile", image);
    }

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    try {
      const res = await axios.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="update-container">
      <h2>Update Product</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        {/* Brand */}
        <div className="form-row">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Enter brand"
          />
        </div>

        {/* Description */}
        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        {/* Price */}
        <div className="form-row">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        {/* Category */}
        <div className="form-row">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
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

        {/* Stock Quantity */}
        <div className="form-row">
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Image Upload */}
        <div className="form-row">
          <label>Image</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="preview-image"
            />
          )}
          <input type="file" onChange={handleImageChange} />
        </div>

        {/* Availability */}
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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
