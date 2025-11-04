import axios from "axios";

const API = axios.create({
  baseURL: "https://ecomm-backend-spring.onrender.com/api",
});
delete API.defaults.headers.common["Authorization"];
export default API;
