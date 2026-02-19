import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URI}/api`
});

export default API;
