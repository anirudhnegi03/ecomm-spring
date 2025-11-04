import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axios";
import "./Navbar.css";

function Navbar({ onSelectCategory }) {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (value) => {
    setInput(value);
    if (value.trim().length < 1) {
      setSearchResults([]);
      setNoResults(false);
      setShowSearchResults(false);
      return;
    }

    setShowSearchResults(true);
    try {
      const res = await API.get(`/products/search?keyword=${value}`);
      setSearchResults(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    navigate("/"); // ✅ ensures user is taken back to Home so filter applies
  };

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <nav className="navbar">
      <div className="nav-section nav-left">
        <Link to="/">Home</Link>
        <Link to="/add_product">Add Product</Link>

        <div className="dropdown">
          <button className="dropbtn">Categories ▾</button>
          <div className="dropdown-content">
            {categories.map((c) => (
              <button key={c} onClick={() => handleCategorySelect(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <Link to="/cart">Cart</Link>
      </div>

      <div className="nav-section nav-center">
        <h1 className="logo">E-COMM</h1>
      </div>

      <div className="nav-section nav-right">
        <input
          type="text"
          placeholder="Search products..."
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {showSearchResults && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="result-item">
                  {p.name}
                </Link>
              ))
            ) : (
              noResults && <p className="no-results">No product found</p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
