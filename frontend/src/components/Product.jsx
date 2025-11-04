import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import API from "../axios"; // ✅ use shared API instance
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // Fetch product + image
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await API.get(`/product/${id}/image`, {
          responseType: "blob",
        });
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Delete product
  const deleteProduct = async () => {
    try {
      await API.delete(`/product/${id}`);
      removeFromCart(id);
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => navigate(`/product/update/${id}`);

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="containers">
      <img
        className="left-column-img"
        src={imageUrl}
        alt={product.imageName}
      />

      <div className="right-column">
        <div className="product-description">
          <span>{product.category}</span>
          <h1>{product.name}</h1>
          <h5>{product.brand}</h5>
          <p>{product.description}</p>
        </div>

        <div className="product-price">
          <span>{"$" + product.price}</span>
          <button
            className={`cart-btn ${
              !product.productAvailable ? "disabled-btn" : ""
            }`}
            onClick={handleAddToCart}
            disabled={!product.productAvailable}
          >
            {product.productAvailable ? "Add to cart" : "Out of Stock"}
          </button>

          <h6>
            Stock Available:{" "}
            <i style={{ color: "green", fontWeight: "bold" }}>
              {product.stockQuantity}
            </i>
          </h6>

          <div className="release-date">
            <h6>Product listed on:</h6>
            <i>{new Date(product.releaseDate).toLocaleDateString()}</i>
          </div>
        </div>

     
        <div className="update-button">
          <button className="btn btn-primary" type="button" onClick={handleEditClick}>
            Update
          </button>
          <button className="btn btn-danger" type="button" onClick={deleteProduct}>
            Delete
          </button>
        </div>  
      </div>
    </div>
  );
};

export default Product;
