import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global API errors here
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        if (typeof window !== "undefined") {
        }
      }

      if (status === 403) {
        console.error("Forbidden! You don't have access to this resource.");
      }
    }
    return Promise.reject(error);
  },
);
export default axiosClient;
