import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3001/api",
  timeout: 20000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (process.env.NODE_ENV === "development") {
      console.error("AXIOS ERROR:", {
        url: err?.config?.url,
        method: err?.config?.method,
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });
    }
    return Promise.reject(err);
  }
);


export default axiosInstance;
