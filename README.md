# 🛍️ E-Commerce Web App (Spring Boot + React)

A **full-stack e-commerce application** built using **Spring Boot (Java)** for the backend and **React.js** for the frontend.  
It enables users to browse, search, and add products to a shopping cart, while allowing admins to manage products (add, update, delete) with image uploads — all powered by an **H2 in-memory database** for lightweight persistence.

---

## Live Demo

- **Frontend:** [https://ecomm-spring-xt1x.onrender.com](https://ecomm-spring-xt1x.onrender.com)  
- **Backend (API):** [https://ecomm-backend-spring.onrender.com/api](https://ecomm-backend-spring.onrender.com/api)

---

## 🧠 Features

### 🖥️ Frontend (React)
- Built using **React Router** for smooth client-side navigation.
- **Dynamic product listing** from backend API.
- **Search products** by name, brand, or category (real-time API calls).
- **Filter products** by category (Laptops, Accessories, Electronics, Fashion, Smartphones).
- **Shopping Cart**:
  - Add, remove, and modify quantity.
  - Checkout updates stock quantity automatically.
- **Admin product management**:
  - Add product (with image upload).
  - Edit or delete existing products.
- Clean, responsive, and user-friendly UI built with Bootstrap.

### ⚙️ Backend (Spring Boot)
- RESTful API using **Spring Boot 3**.
- **CRUD operations** for products.
- **H2 Database** for fast and lightweight data storage.
- **Image upload** handled via `MultipartFile` and stored as binary (`byte[]`) in the database.
- **Custom search API** using Spring Data JPA and JPQL.
- CORS enabled for cross-origin access from frontend hosted on Render.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Axios, Bootstrap |
| **Backend** | Spring Boot 3, Spring Data JPA, Hibernate |
| **Database** | H2 In-Memory Database |
| **Build Tools** | Maven (backend), npm (frontend) |
| **Hosting** | Render (Frontend + Backend) |

---

## 📂 Project Structure

ecomm-app/  
├── backend/  
│   ├── src/main/java/com/anirudh/ecom_proj/  
│   │   ├── controller/  
│   │   │   └── ProductController.java  
│   │   ├── service/  
│   │   │   └── ProductService.java  
│   │   ├── repo/  
│   │   │   └── ProductRepo.java  
│   │   └── model/  
│   │       └── Product.java  
│   └── application.properties  
│  
└── frontend/  
    ├── src/  
    │   ├── components/  
    │   │   ├── Navbar.jsx  
    │   │   ├── Home.jsx  
    │   │   ├── Product.jsx  
    │   │   ├── AddProduct.jsx  
    │   │   ├── UpdateProduct.jsx  
    │   │   └── Cart.jsx  
    │   ├── Context/  
    │   │   └── Context.jsx  
    │   ├── axios.js  
    │   └── App.jsx  
    ├── public/  
    │   └── static.json  
    └── package.json  

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/products` | Fetch all products |
| `GET` | `/api/product/{id}` | Fetch product by ID |
| `GET` | `/api/product/{id}/image` | Fetch product image |
| `POST` | `/api/product` | Add a new product (with image upload) |
| `PUT` | `/api/product/{id}` | Update an existing product |
| `DELETE` | `/api/product/{id}` | Delete a product |
| `GET` | `/api/products/search?keyword=...` | Search products by name, description, brand, or category |

---

## 🧰 Setup Instructions

### 

```bash
git clone https://github.com/yourusername/ecomm-app.git
cd ecomm-app

## Backend Setup (Spring Boot)
```bash
cd ecom-proj
mvn clean install
mvn spring-boot:run

## Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev

