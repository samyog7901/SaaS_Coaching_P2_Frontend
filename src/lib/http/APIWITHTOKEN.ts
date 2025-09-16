import axios from "axios";

const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add interceptor to dynamically attach token
APIWITHTOKEN.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default APIWITHTOKEN;
