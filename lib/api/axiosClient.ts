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
          // admins sign in on their own page; a failed sign-in shouldn't reload the login page
          const { pathname } = window.location;
          const login = pathname.startsWith("/adminpanel") ? "/adminpanel/login" : "/login";
          if (pathname !== login && !pathname.startsWith("/adminpanel/forgot-password")) {
            localStorage.removeItem("token");
            window.location.href = login;
          }
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
