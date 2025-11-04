// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar({ onSelectCategory }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Fetch products dynamically for search
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
      const res = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${value}`
      );
      setSearchResults(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
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
    // src/components/Navbar.jsx
    <nav className="navbar">
      <div className="nav-section nav-left">
        <a href="/">Home</a>
        <a href="/add_product">Add Product</a>

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

        <a href="/cart">Cart</a>
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
            {searchResults.length > 0
              ? searchResults.map((p) => (
                  <a
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="result-item"
                  >
                    {p.name}
                  </a>
                ))
              : noResults && <p className="no-results">No product found</p>}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
