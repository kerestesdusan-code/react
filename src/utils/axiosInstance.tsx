import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
