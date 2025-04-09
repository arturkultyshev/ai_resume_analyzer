import axios from "axios";

// axios.js
const api = axios.create({
  baseURL: "http://192.168.31.13:8000/api/",
});


export default api;
