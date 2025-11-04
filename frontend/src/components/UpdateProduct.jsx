import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../axios"; 
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/product/${id}`);
        setProduct(res.data);

        // fetch existing image
        const imageRes = await API.get(`/product/${id}/image`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(imageRes.data);
        setExistingImage(imageUrl);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // append product JSON
      formData.append(
        "product",
        new Blob([JSON.stringify(product)], { type: "application/json" })
      );

      // append image only if user selected one
      if (image) {
        formData.append("imageFile", image);
      }

      console.log("Submitting product update:", product);

      await API.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err.response || err);
      alert("Failed to update product. Check console for details.");
    }
  };

  return (
    <div className="update-container">
      <h2>Update Product</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        {/* ---------- BASIC INFO ---------- */}
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name || ""}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-row">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand || ""}
            onChange={handleChange}
            placeholder="Enter brand"
            required
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={product.description || ""}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="form-row">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price || ""}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-row">
          <label>Category</label>
          <select
            name="category"
            value={product.category || ""}
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

        <div className="form-row">
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity || ""}
            onChange={handleChange}
            placeholder="Enter stock quantity"
          />
        </div>

        {/* ---------- IMAGE SECTION ---------- */}
        <div className="form-row">
          <label>Image</label>
          {existingImage && !image && (
            <img src={existingImage} alt="Current" className="preview-image" />
          )}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="preview-image"
            />
          )}
          <input type="file" onChange={handleImageChange} />
        </div>

        {/* ---------- PRODUCT AVAILABILITY ---------- */}
        <div className="form-row checkbox-row">
          <label>
            <input
              type="checkbox"
              name="productAvailable"
              checked={product.productAvailable || false}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  productAvailable: e.target.checked,
                }))
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
