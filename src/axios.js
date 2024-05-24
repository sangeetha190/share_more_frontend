import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:4000/api",
  // vvv
  // baseURL: "https://share-more-backend-2.onrender.com/api",

  // baseURL: "http://localhost:4000/api",
  baseURL: "https://share-more-backend-3.onrender.com/api",
});

export default instance;
