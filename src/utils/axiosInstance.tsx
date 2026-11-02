import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
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

    const status = err?.response?.status;
    const errorMessage = err?.response?.data?.error;

    const tokenIsInvalid =
      status === 401 &&
      [
        "Invalid or expired token",
        "Missing Authorization header",
        "Invalid Authorization format",
      ].includes(errorMessage);

    if (tokenIsInvalid) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth:logout"));
    }

    return Promise.reject(err);
  }
);


export default axiosInstance;
