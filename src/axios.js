import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  // v
  // baseURL: "https://share-more-backend-2.onrender.com/api",
});

export default instance;
